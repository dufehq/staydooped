// Chiang Mai dusk scene for the hero: Thapae Gate, Doi Suthep with the golden
// chedi of Wat Phra That, a friendly elephant lifting a lantern, and drifting
// Yi Peng sky lanterns. Lanterns drift via the CSS `.sl-lantern` animation in
// globals.css (disabled under prefers-reduced-motion), so this stays a Server
// Component with deterministic markup — no client JS, no hydration mismatch.

const LANTERNS = [
  { x: 60, y: 120, s: 1.15, dur: 12, delay: -1 },
  { x: 120, y: 70, s: 0.85, dur: 10, delay: -5 },
  { x: 180, y: 150, s: 1.0, dur: 13, delay: -8 },
  { x: 150, y: 95, s: 0.7, dur: 9, delay: -3 },
  { x: 230, y: 60, s: 0.9, dur: 14, delay: -11 },
  { x: 250, y: 130, s: 1.1, dur: 11, delay: -6 },
  { x: 300, y: 100, s: 0.75, dur: 10, delay: -2 },
  { x: 330, y: 160, s: 1.0, dur: 13, delay: -9 },
  { x: 390, y: 120, s: 0.85, dur: 12, delay: -4 },
  { x: 410, y: 180, s: 1.05, dur: 15, delay: -7 },
  { x: 90, y: 185, s: 0.95, dur: 11, delay: -10 },
  { x: 200, y: 200, s: 0.8, dur: 10, delay: -1 },
  { x: 355, y: 210, s: 0.9, dur: 14, delay: -12 },
  { x: 275, y: 185, s: 0.7, dur: 9, delay: -6 },
];

export function HeroScene() {
  return (
    <svg
      viewBox="0 0 440 360"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Thapae Gate and Doi Suthep at dusk with an elephant and floating Yi Peng lanterns"
      className="block h-full w-full"
    >
      <defs>
        <linearGradient id="sl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#241a44" />
          <stop offset="0.45" stopColor="#5e2f63" />
          <stop offset="0.72" stopColor="#b8532f" />
          <stop offset="1" stopColor="#e8853a" />
        </linearGradient>
        <radialGradient id="sl-moon" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe9b8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe9b8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sl-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd27a" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sl-gate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7c3a26" />
          <stop offset="1" stopColor="#5a271a" />
        </linearGradient>
      </defs>

      <rect width="440" height="360" fill="url(#sl-sky)" />

      {/* moon */}
      <circle cx="348" cy="78" r="60" fill="url(#sl-moon)" />
      <circle cx="348" cy="78" r="26" fill="#ffeec2" />

      {/* Doi Suthep, with the golden chedi of Wat Phra That on the summit */}
      <path
        d="M-10 360 L-10 252 Q40 224 92 194 Q126 170 150 146 Q182 178 218 210 Q264 250 304 286 L304 360 Z"
        fill="#342349"
      />
      <path
        d="M150 146 Q182 178 218 210 L206 214 Q176 184 150 160 Z"
        fill="#4a3566"
        opacity="0.55"
      />
      <circle cx="150" cy="139" r="10" fill="url(#sl-glow)" />
      <path d="M150 130 L154.5 147 L145.5 147 Z" fill="#f3c86a" />
      <rect x="147" y="147" width="6" height="3" rx="1" fill="#e3a94e" />
      <circle cx="150" cy="129" r="1.7" fill="#fff1c0" />

      {/* distant hills */}
      <path
        d="M0 232 Q90 196 180 224 Q300 258 440 214 L440 360 L0 360 Z"
        fill="#4a2f5a"
        opacity="0.65"
      />
      <path
        d="M0 258 Q120 232 240 256 Q350 278 440 250 L440 360 L0 360 Z"
        fill="#3b2742"
        opacity="0.8"
      />

      {/* Yi Peng lanterns */}
      <g>
        {LANTERNS.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) scale(${l.s})`}>
            <g
              className="sl-lantern"
              style={{ animationDuration: `${l.dur}s`, animationDelay: `${l.delay}s` }}
            >
              <circle r="14" fill="url(#sl-glow)" />
              <path
                d="M-5 -6 Q-5 -11 0 -11 Q5 -11 5 -6 L4 4 Q4 6 2 6 L-2 6 Q-4 6 -4 4 Z"
                fill="#ffd57e"
              />
              <ellipse cx="0" cy="-3" rx="3" ry="4.5" fill="#fff3c8" opacity="0.9" />
              <rect x="-2" y="6" width="4" height="1.6" fill="#e0843a" />
              <circle cx="0" cy="4.6" r="1.4" fill="#fff2b0" />
            </g>
          </g>
        ))}
      </g>

      {/* Thapae Gate */}
      <g>
        <rect x="150" y="196" width="26" height="86" fill="url(#sl-gate)" />
        <rect x="300" y="196" width="26" height="86" fill="url(#sl-gate)" />
        <rect x="176" y="210" width="124" height="72" fill="url(#sl-gate)" />
        <g fill="#7c3a26">
          <rect x="150" y="188" width="8" height="10" />
          <rect x="164" y="188" width="8" height="10" />
          <rect x="302" y="188" width="8" height="10" />
          <rect x="316" y="188" width="8" height="10" />
          <rect x="182" y="202" width="9" height="9" />
          <rect x="198" y="202" width="9" height="9" />
          <rect x="214" y="202" width="9" height="9" />
          <rect x="230" y="202" width="9" height="9" />
          <rect x="246" y="202" width="9" height="9" />
          <rect x="262" y="202" width="9" height="9" />
          <rect x="278" y="202" width="9" height="9" />
        </g>
        <path d="M214 282 L214 246 Q238 224 262 246 L262 282 Z" fill="#2a1420" />
        <rect x="230" y="256" width="16" height="22" rx="3" fill="#f0a94e" opacity="0.5" />
      </g>

      {/* elephant, trunk raised toward a lantern */}
      <g>
        <g fill="#2e1d14">
          <rect x="82" y="262" width="15" height="26" rx="7" />
          <rect x="102" y="264" width="15" height="24" rx="7" />
          <rect x="122" y="262" width="15" height="26" rx="7" />
          <rect x="140" y="264" width="13" height="24" rx="7" />
        </g>
        <path
          d="M76 250 q-7 6 -4 15"
          stroke="#2e1d14"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="74" y="232" width="78" height="46" rx="23" fill="#2e1d14" />
        <ellipse cx="151" cy="250" rx="23" ry="22" fill="#2e1d14" />
        <path
          d="M157 244 Q183 242 192 229 Q197 223 192 220 Q186 217 183 224 Q179 233 164 239 Q158 242 155 251 Z"
          fill="#2e1d14"
        />
        <ellipse cx="139" cy="248" rx="13" ry="16" fill="#241610" />
        <circle cx="158" cy="245" r="2.4" fill="#f6d388" />
        <circle cx="197" cy="213" r="13" fill="url(#sl-glow)" />
        <path
          d="M192 209 Q192 205 197 205 Q202 205 202 209 L201 217 Q201 219 199 219 L195 219 Q193 219 193 217 Z"
          fill="#ffd480"
        />
        <rect x="195" y="219" width="4" height="1.6" fill="#e0843a" />
      </g>

      {/* ground */}
      <rect x="0" y="290" width="440" height="70" fill="#1d1226" />
    </svg>
  );
}
