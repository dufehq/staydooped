"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

// Persisted across visits once the guest opts out.
const DISMISS_KEY = "sl_arrival_dismissed";
// Per-session guard so it shows at most once per visit.
const SEEN_KEY = "sl_arrival_seen";

const AID = "121431";
const LINKS = {
  esim: `https://www.klook.com/en-US/search/?query=thailand+esim&aid=${AID}`,
  transfer: `https://www.klook.com/en-US/search/?query=chiang+mai+airport+transfer&aid=${AID}`,
};

export function ArrivalPopup() {
  const t = useTranslations("ArrivalPopup");
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return;
      if (sessionStorage.getItem(SEEN_KEY) === "1") return;
    } catch {
      return;
    }
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      setOpen(true);
      requestAnimationFrame(() => setShown(true));
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setShown(false);
    window.setTimeout(() => setOpen(false), 200);
  }

  function dismissForever() {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    close();
  }

  if (!open) return null;

  const items = [
    {
      key: "esim",
      emoji: "📶",
      title: t("esimTitle"),
      desc: t("esimDesc"),
      cta: t("esimCta"),
      href: LINKS.esim,
    },
    {
      key: "transfer",
      emoji: "🚐",
      title: t("transferTitle"),
      desc: t("transferDesc"),
      cta: t("transferCta"),
      href: LINKS.transfer,
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-end justify-center transition-opacity duration-200 md:items-center ${
        shown ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="arrival-popup-title"
    >
      <button
        type="button"
        aria-label={t("close")}
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-night/60 backdrop-blur-sm"
      />
      <div
        className={`relative z-10 w-full max-w-[420px] rounded-t-3xl bg-paper p-5 shadow-card transition-transform duration-200 md:m-4 md:rounded-card md:p-6 ${
          shown ? "translate-y-0" : "translate-y-6"
        }`}
      >
        <button
          type="button"
          aria-label={t("close")}
          onClick={close}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-pill text-muted transition-colors hover:bg-sand/60 hover:text-ink"
        >
          <span aria-hidden className="text-lg leading-none">
            ×
          </span>
        </button>

        <h2
          id="arrival-popup-title"
          className="pr-8 font-serif text-2xl font-semibold tracking-tight text-ink md:text-[26px]"
        >
          {t("title")}
        </h2>
        <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>

        <div className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-3 rounded-2xl border border-border bg-sand/30 px-4 py-3"
            >
              <span className="text-2xl">{item.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {item.desc}
                </p>
              </div>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="shrink-0 rounded-pill bg-night px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-ink"
              >
                {item.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-3 text-center text-[10px] leading-relaxed text-muted/80">
          {t("footnote")}
        </p>

        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={dismissForever}
            className="text-xs text-muted underline underline-offset-2 transition-colors hover:text-ink"
          >
            {t("dontShowAgain")}
          </button>
        </div>
      </div>
    </div>
  );
}
