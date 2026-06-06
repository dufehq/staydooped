/**
 * Generate a listing image via Gemini, convert to WebP, upload to Supabase.
 *
 * Usage:
 *   npm run gen:image -- --slug <slug> --prompt "<prompt-text>"
 *
 * Pipeline:
 *   1. POST to Gemini gemini-2.5-flash-image with the prompt.
 *   2. Decode base64 PNG from the response.
 *   3. sharp resize+convert → 1920×1072 WebP @ quality 82 (matches AGENTS.md).
 *   4. Upload to Supabase Storage `listings` bucket as `<slug>.webp` (upsert).
 *
 * Env (loaded via --env-file=.env.local in the npm script):
 *   GEMINI_API_KEY               — get one at https://aistudio.google.com/apikey
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY    — bypasses RLS; required for the upload
 *
 * The Claude session that runs this script is expected to multimodal-Read the
 * uploaded WebP afterwards and verify subject/no-text/no-artifacts per the
 * "Image rules" section of the experience-pipeline skill. Retry with a refined
 * prompt up to 2× before falling back to the user.
 */
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!GEMINI_API_KEY || !SUPABASE_URL || !SERVICE_ROLE) {
  console.error(
    "Missing env vars. Required: GEMINI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, " +
      "SUPABASE_SERVICE_ROLE_KEY. Use `npm run gen:image` so .env.local is loaded.",
  );
  process.exit(1);
}

const args = process.argv.slice(2);
function getFlag(name: string): string | undefined {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : undefined;
}

const slug = getFlag("slug");
const prompt = getFlag("prompt");

if (!slug || !prompt) {
  console.error(
    'Usage: npm run gen:image -- --slug <slug> --prompt "<prompt-text>"',
  );
  process.exit(1);
}

const MODEL = "gemini-2.5-flash-image";
// v1beta is required: responseModalities + responseFormat aren't in the v1 schema yet.
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

type GeminiPart = {
  text?: string;
  inlineData?: { mimeType?: string; data: string };
};

async function generate() {
  console.log(`[gen-image] ${slug} — calling ${MODEL}`);
  const t0 = Date.now();

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": GEMINI_API_KEY!,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[gen-image] Gemini ${res.status}: ${body.slice(0, 800)}`);
    process.exit(1);
  }

  const json = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: GeminiPart[] } }>;
  };

  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const imgPart = parts.find((p) => p.inlineData?.data);
  if (!imgPart?.inlineData?.data) {
    console.error(
      `[gen-image] no image in response. Raw parts: ${JSON.stringify(parts).slice(0, 400)}`,
    );
    process.exit(1);
  }

  const pngBuf = Buffer.from(imgPart.inlineData.data, "base64");
  console.log(
    `[gen-image] Gemini ok — ${(pngBuf.length / 1024).toFixed(0)} KB PNG in ${Date.now() - t0} ms`,
  );

  const webpBuf = await sharp(pngBuf)
    .resize(1920, 1072, { fit: "cover", position: "center" })
    .webp({ quality: 82, effort: 5 })
    .toBuffer();
  console.log(
    `[gen-image] sharp → ${(webpBuf.length / 1024).toFixed(0)} KB WebP (1920×1072 q82)`,
  );

  const supabase = createClient(SUPABASE_URL!, SERVICE_ROLE!, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.storage
    .from("listings")
    .upload(`${slug}.webp`, webpBuf, {
      contentType: "image/webp",
      upsert: true,
      cacheControl: "31536000",
    });

  if (error) {
    console.error(`[gen-image] upload failed: ${error.message}`);
    process.exit(1);
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/listings/${slug}.webp`;
  console.log(`[gen-image] uploaded → ${publicUrl}`);
  console.log(
    `[gen-image] next: multimodal-Read it and verify (subject / no-text / no-artifacts)`,
  );
}

generate().catch((e) => {
  console.error("[gen-image] crashed:", e);
  process.exit(1);
});
