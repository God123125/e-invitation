/**
 * Authentic Vector SVG Generators
 * Matching https://raksmey-pheakdey.vercel.app
 */

export const cd = (e: number) => Math.round(e * 1e4) / 1e4;
export const Iu = (e: number) => Math.round(e * 100) / 100;

// Scalloped Flap clip-path
export function ld(e = 9, t = 0.028) {
  let n = "M0 0 L1 0 ";
  const r = (r: number, i: number, a: number, o: number) => {
    const s = Math.hypot(a - r, o - i);
    const c = -(o - i) / s;
    const l = (a - r) / s;
    for (let s = 0; s < e; s++) {
      const u = r + ((a - r) * s) / e;
      const d = i + ((o - i) * s) / e;
      const f = r + ((a - r) * (s + 1)) / e;
      const p = i + ((o - i) * (s + 1)) / e;
      n += `Q${cd((u + f) / 2 + c * t)} ${cd((d + p) / 2 + l * t)} ${cd(f)} ${cd(p)} `;
    }
  };
  r(1, 0, 0.5, 1);
  r(0.5, 1, 0, 0);
  return n + "Z";
}

// Scalloped Flap Foil path
export function ud() {
  return ld(9, 0.028).replace(/-?\d*\.?\d+/g, (e) =>
    String(cd(parseFloat(e) * 100)),
  );
}

// Organic Uneven Poured Wax Perimeter
export function dd(e: number, t: number, n: number, r = 3) {
  let i = "";
  for (let a = 0; a <= 64; a++) {
    const o = (a / 64) * Math.PI * 2;
    const s =
      n *
      (1 +
        0.035 * Math.sin(o * 7 + r) +
        0.025 * Math.sin(o * 13 + r * 2) +
        0.02 * Math.cos(o * 4 + r));
    i += `${a ? "L" : "M"}${cd(e + Math.cos(o) * s)} ${cd(t + Math.sin(o) * s)} `;
  }
  return i + "Z";
}

// Authentic Wax Seal with SVG Specular Lighting
export function fd() {
  return `<svg viewBox="0 0 140 140" aria-hidden="true">
  <defs>
    <radialGradient id="wax" cx="38%" cy="32%" r="75%">
      <stop offset="0%" stop-color="#e7c97a"/>
      <stop offset=".45%" stop-color="#b98c35"/>
      <stop offset="1%" stop-color="#6e4c14"/>
    </radialGradient>
    <filter id="wax-lit" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="b"/>
      <feSpecularLighting in="b" surfaceScale="5" specularConstant=".9" specularExponent="22" lighting-color="#fff6dc" result="s">
        <fePointLight x="20" y="-10" z="90"/>
      </feSpecularLighting>
      <feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>
      <feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k1="0" k2="1" k3=".75" k4="0"/>
    </filter>
    <filter id="wax-press" x="-30%" y="-30%" width="160%" height="160%">
      <feOffset dx="-1.2" dy="-1.2" in="SourceAlpha" result="hi"/>
      <feFlood flood-color="#3b2706" flood-opacity=".75"/>
      <feComposite in2="hi" operator="in" result="dark"/>
      <feOffset dx="1.2" dy="1.4" in="SourceAlpha" result="lo"/>
      <feFlood flood-color="#fff3cf" flood-opacity=".7"/>
      <feComposite in2="lo" operator="in" result="light"/>
      <feMerge>
        <feMergeNode in="light"/>
        <feMergeNode in="dark"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <path d="${dd(70, 72, 60, 5)}" fill="#000" opacity=".35" transform="translate(2 5)" style="filter:blur(3px)"/>
  <g filter="url(#wax-lit)">
    <path d="${dd(70, 70, 60, 5)}" fill="url(#wax)"/>
    <circle cx="70" cy="70" r="44" fill="#a97d2c"/>
  </g>
  <g filter="url(#wax-press)" transform="translate(70 70) scale(.38)">
    ${td()}
  </g>
  <circle cx="70" cy="70" r="44" fill="none" stroke="#fff3cf" stroke-opacity=".3" stroke-width="1.2"/>
</svg>`;
}

export const Ju = `M0 0 C-10 -16 -14 -36 -6 -54 C0 -68 12 -77 21 -85 C27 -90 35 -87 34 -79 C33 -73 26 -73 26 -78 C21 -71 14 -64 15 -54 C16 -42 24 -38 23 -27 C22 -14 12 -6 0 0 Z`;
export const Yu = `M0 -6 C-3 -20 -2 -36 4 -50`;
export const Xu = `M0 0 C8 -2 14 -9 13 -17 C12 -24 4 -27 -1 -23 C-5 -19 -3 -13 2 -13 C5 -13 6 -17 4 -18`;

export const Zu = (e: string, t = "") => `<g transform="${t}">${e}</g>`;
export const Qu = (e: string, t = "") =>
  Zu(
    `<path class="kb-fill ${t}" d="${Ju}"/><path class="kb-line" d="${Yu}"/>`,
    e,
  );
export const $u = (e: string) =>
  Zu(
    `<path class="kb-fill" d="${Ju}" transform="scale(-1 1)"/><path class="kb-line" d="${Yu}" transform="scale(-1 1)"/>`,
    e,
  );
export const ed = (e: string) =>
  `<path class="kb-line kb-curl" d="${Xu}" transform="${e}"/>`;

// Crest Vector Paths
export function td() {
  return [
    Qu(`translate(0 -14) scale(1.25)`),
    Qu(`translate(-10 -12) rotate(-24) scale(1.0)`),
    $u(`translate(10 -12) rotate(24) scale(1.0)`),
    Qu(`translate(-22 -8) rotate(-52) scale(.82)`),
    $u(`translate(22 -8) rotate(52) scale(.82)`),
    Qu(`translate(-34 -2) rotate(-78) scale(.62)`),
    $u(`translate(34 -2) rotate(78) scale(.62)`),
    ed(`translate(-58 4) scale(1.3)`),
    ed(`translate(58 4) scale(-1.3 1.3)`),
    `<path class="kb-line" d="M-92 6 C-60 10 -30 -2 0 -2 C30 -2 60 10 92 6"/>`,
    `<path class="kb-fill" d="M-14 -2 C-10 -12 10 -12 14 -2 C8 0 -8 0 -14 -2 Z"/>`,
    `<circle class="kb-fill" cx="0" cy="-118" r="3"/>`,
  ].join("");
}

export const nd = (e = "") =>
  `<svg class="kbach-crest ${e}" viewBox="-110 -135 220 150" aria-hidden="true">${td()}</svg>`;

export function rd() {
  return [
    `<path class="kb-line" d="M6 6 H150 M6 6 V150"/>`,
    `<path class="kb-line" d="M14 14 H110 M14 14 V110"/>`,
    Qu(`translate(22 22) rotate(135) scale(.9)`),
    Qu(`translate(40 16) rotate(100) scale(.55)`),
    Qu(`translate(16 40) rotate(170) scale(.55) scale(-1 1)`),
    ed(`translate(62 24) scale(1.1)`),
    ed(`translate(24 62) rotate(90) scale(1.1 -1.1)`),
    Qu(`translate(92 22) rotate(90) scale(.42)`),
    Qu(`translate(22 92) rotate(180) scale(.42) scale(-1 1)`),
    `<circle class="kb-fill" cx="122" cy="14" r="2.4"/>`,
    `<circle class="kb-fill" cx="14" cy="122" r="2.4"/>`,
  ].join("");
}

const id: Record<string, string> = {
  tl: "",
  tr: "translate(160 0) scale(-1 1)",
  bl: "translate(0 160) scale(1 -1)",
  br: "translate(160 160) scale(-1 -1)",
};

export const ad = (e = "tl") =>
  `<svg class="kbach-corner kb-${e}" viewBox="0 0 160 160" aria-hidden="true"><g transform="${id[e] || ""}"><g class="kb-sway">${rd()}</g></g></svg>`;

export const od = (e = "") =>
  `<svg class="kbach-divider ${e}" viewBox="-160 -40 320 50" aria-hidden="true">
  <path class="kb-line" d="M-150 0 H-40 M40 0 H150"/>
  ${ed(`translate(-40 0) scale(-.9 .9)`)}
  ${ed(`translate(40 0) scale(.9)`)}
  ${Qu(`translate(0 2) scale(.5)`)}
  ${Qu(`translate(-6 2) rotate(-40) scale(.36)`)}
  ${$u(`translate(6 2) rotate(40) scale(.36)`)}
  <circle class="kb-fill" cx="-154" cy="0" r="2.2"/>
  <circle class="kb-fill" cx="154" cy="0" r="2.2"/>
</svg>`;

export const Lu = `
  <path d="M51 38 C58 14 82 1 94 10 C103 18 92 33 75 39 C66 42 57 41 51 40 Z" fill="url(#g-foil)" fill-opacity=".9"/>
  <path d="M51 42 C62 44 80 50 81 62 C82 74 66 76 59 66 C54 59 51 51 51 42 Z" fill="url(#g-foil)" fill-opacity=".75"/>
  <path d="M53 39 C64 30 76 20 90 13 M56 39 C68 36 80 33 92 24 M54 44 C62 52 70 58 78 64 M53 46 C57 56 61 64 66 70" fill="none" stroke="#5a4113" stroke-width=".8" stroke-opacity=".55"/>
  <circle cx="86" cy="15" r="1.6" fill="#fff6d8" opacity=".8"/>
  <circle cx="90" cy="22" r="1.1" fill="#fff6d8" opacity=".7"/>
`;

export const Ru = (e = "") =>
  `<svg class="butterfly ${e}" viewBox="0 0 100 80" aria-hidden="true">
  <g class="wing-l"><g transform="translate(100 0) scale(-1 1)">${Lu}</g></g>
  <g class="wing-r">${Lu}</g>
  <ellipse cx="50" cy="44" rx="2.4" ry="13" fill="url(#g-foil)"/>
  <path d="M49 32 C46 22 42 16 37 12 M51 32 C54 22 58 16 63 12" fill="none" stroke="url(#g-foil)" stroke-width="1"/>
  <circle cx="37" cy="12" r="1.4" fill="url(#g-foil)"/>
  <circle cx="63" cy="12" r="1.4" fill="url(#g-foil)"/>
</svg>`;

export const zu = `M0 0 C6 -7 16 -7 23 0 C16 7 6 7 0 0 Z`;
export const Bu = [
  [40, 9, -8],
  [78, 8, 14],
  [118, 12, -20],
  [160, 24, 18],
  [205, 26, -10],
  [236, 20, 22],
  [9, 40, 98],
  [8, 78, 76],
  [12, 118, 110],
  [24, 160, 72],
  [26, 205, 100],
  [150, 40, 50],
  [170, 44, -30],
  [40, 150, 40],
  [44, 170, 120],
];

export const Vu = (e = "") =>
  `<svg class="vine ${e}" viewBox="0 0 260 260" aria-hidden="true" fill="none">
  <g stroke="currentColor" stroke-width="1.1" stroke-linecap="round" fill="none">
    <path class="draw" d="M4 4 C60 10 110 6 150 22 S220 30 252 18"/>
    <path class="draw" d="M4 4 C10 60 6 110 22 150 S30 220 18 252"/>
    <path class="draw" d="M68 10 C78 30 100 34 108 22 C112 14 102 8 96 16"/>
    <path class="draw" d="M10 68 C30 78 34 100 22 108 C14 112 8 102 16 96"/>
    <path class="draw" d="M128 15 C138 40 158 46 176 40"/>
    <path class="draw" d="M15 128 C40 138 46 158 40 176"/>
    <path class="draw" d="M196 28 C204 46 222 50 230 40 C234 34 228 28 222 32"/>
  </g>
  <g class="leaves" fill="currentColor" fill-opacity=".85">
    ${Bu.map(([e, t, n]) => `<path class="leaf" d="${zu}" transform="translate(${e} ${t}) rotate(${n})"/>`).join("")}
  </g>
  <g class="blooms" fill="currentColor">
    ${[
      [108, 22],
      [22, 108],
      [176, 40],
      [40, 176],
      [252, 18],
    ]
      .map(
        ([e, t]) => `
      <g class="bloom" transform="translate(${e} ${t})">
        ${[0, 72, 144, 216, 288].map((e) => `<ellipse rx="2.2" ry="4.4" transform="rotate(${e}) translate(0 -4.5)" fill-opacity=".9"/>`).join("")}
        <circle r="1.6" fill="#fff6d8"/>
      </g>`,
      )
      .join("")}
  </g>
</svg>`;

export const Hu = (e = "") =>
  `<svg class="${e}" viewBox="0 0 120 120" fill="none" aria-hidden="true">
  <g stroke="url(#g-foil)" stroke-width="1.4" stroke-linejoin="round">
    <path class="draw" d="M60 18 C73 38 73 70 60 90 C47 70 47 38 60 18 Z"/>
    <path class="draw" d="M60 90 C40 82 26 62 28 38 C42 46 54 62 60 90 Z"/>
    <path class="draw" d="M60 90 C80 82 94 62 92 38 C78 46 66 62 60 90 Z"/>
    <path class="draw" d="M60 92 C34 94 14 80 8 62 C26 61 46 71 60 92 Z"/>
    <path class="draw" d="M60 92 C86 94 106 80 112 62 C94 61 74 71 60 92 Z"/>
    <path class="draw" d="M18 104 Q60 94 102 104"/>
    <path class="draw" d="M34 112 Q60 106 86 112"/>
  </g>
</svg>`;

export function Uu(e = 9, t = 11, n = 0.018) {
  const r: string[] = [];
  const i = (
    e: number,
    t: number,
    i: number,
    a: number,
    o: number,
    s: number,
    c: number,
  ) => {
    for (let l = 0; l < o; l++) {
      const u = e + ((i - e) * l) / o;
      const d = t + ((a - t) * l) / o;
      const f = e + ((i - e) * (l + 1)) / o;
      const p = t + ((a - t) * (l + 1)) / o;
      const m = (u + f) / 2 + s * n;
      const h = (d + p) / 2 + c * n;
      r.push(
        `Q${Iu(m * 1e3) / 1e3} ${Iu(h * 1e3) / 1e3} ${Iu(f * 1e3) / 1e3} ${Iu(p * 1e3) / 1e3}`,
      );
    }
  };
  const a = n;
  i(a, a, 1 - a, a, e, 0, -1);
  i(1 - a, a, 1 - a, 1 - a, t, 1, 0);
  i(1 - a, 1 - a, a, 1 - a, e, 0, 1);
  i(a, 1 - a, a, a, t, -1, 0);
  return `M${a} ${a} ${r.join(" ")} Z`;
}

export const Wu = () =>
  `<svg class="venue__pin" viewBox="0 0 40 52" fill="none" aria-hidden="true">
  <path d="M20 50 C20 50 4 31 4 19 A16 16 0 0 1 36 19 C36 31 20 50 20 50 Z" stroke="url(#g-foil)" stroke-width="1.4"/>
  <path d="M20 9 C24 14 24 22 20 27 C16 22 16 14 20 9 Z" fill="url(#g-foil)"/>
</svg>`;

export const Gu: Record<string, string> = {
  procession: `<path d="M3 15h18M5 15l1.5 4h11L19 15M8 15c0-3 1.8-5 4-5s4 2 4 5M12 10V7M10 7.5c1-1.2 3-1.2 4 0"/>`,
  ring: `<circle cx="6.5" cy="17" r="2.7"/><circle cx="17.5" cy="17" r="2.7"/><path d="M8.5 15 18 4M15.5 15 6 4"/>`,
  monk: `<path d="M12 3c2.5 2.6 4 5.4 4 8.5A4 4 0 0 1 8 11.5C8 8.4 9.5 5.6 12 3ZM12 15.5V21M8.5 21h7"/>`,
  tray: `<path d="M4 14h16M6 14c0 3 2.7 5 6 5s6-2 6-5M9 14c0-2.5 1.3-4 3-4s3 1.5 3 4M12 10V6.5M10.5 5.5 12 4l1.5 1.5"/>`,
  candle: `<path d="M9.5 10h5v10h-5zM12 7.5c1.4-1.3 1.4-3 0-4.5-1.4 1.5-1.4 3.2 0 4.5ZM7 20h10"/>`,
  flower: `<path d="M12 12c-1-3 0-6 0-8 0 2 1 5 0 8Zm0 0c3-1 6 0 8 0-2 0-5 1-8 0Zm0 0c1 3 0 6 0 8 0-2-1-5 0-8Zm0 0c-3 1-6 0-8 0 2 0 5-1 8 0Z"/><circle cx="12" cy="12" r="1.6"/>`,
  thread: `<path d="M4 12c3-4 5 4 8 0s5 4 8 0M7 8.5c2 1.2 3 3.5 3 3.5M17 15.5c-2-1.2-3-3.5-3-3.5"/>`,
  dinner: `<path d="M4 12h16a8 7 0 0 1-16 0ZM9 19.5h6M16 4l-4 6M19 5l-5 5"/>`,
};

export const Ku = (e: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Gu[e] || Gu.flower}</svg>`;

export const qu = () =>
  `<svg viewBox="0 0 70 70" aria-hidden="true">
  <defs>
    <radialGradient id="kflame" cx=".5" cy=".7" r=".6">
      <stop offset="0" stop-color="#fff6d8"/>
      <stop offset=".5" stop-color="#ffb65c"/>
      <stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="35" cy="22" r="16" fill="url(#kflame)" opacity=".5"/>
  <path d="M8 50 Q35 64 62 50 L58 44 Q35 54 12 44 Z" fill="#4f5a26" stroke="url(#g-foil)" stroke-width=".8"/>
  <path d="M35 46 C28 40 26 32 30 26 C33 32 34 38 35 46 Z M35 46 C42 40 44 32 40 26 C37 32 36 38 35 46 Z M35 46 C24 46 18 40 18 34 C26 36 31 40 35 46 Z M35 46 C46 46 52 40 52 34 C44 36 39 40 35 46 Z" fill="#c72c6a" stroke="#f3a6c3" stroke-width=".5"/>
  <rect x="33.6" y="22" width="2.8" height="14" rx="1" fill="#f5efdd"/>
  <path d="M35 13 C37.5 16 37.5 19 35 21.5 C32.5 19 32.5 16 35 13 Z" fill="url(#kflame)"/>
</svg>`;

// The Signature Couple Monogram Logo Lockup Function (Moulpali gold foil, swash, heart, butterfly, crest)
export function sd({
  groom = "ម៉ារ៉ាឌី",
  bride = "សុជាតា",
  cls = "",
  crest = true,
}: {
  groom?: string;
  bride?: string;
  cls?: string;
  crest?: boolean;
} = {}) {
  return `<div class="lockup ${cls}" role="img" aria-label="${groom} & ${bride}">
  <svg class="lk-orn" viewBox="0 0 600 470" aria-hidden="true">
    ${r ? `<g class="lk-crest" transform="translate(260 46) scale(.4)">${td()}</g>` : ``}
    <path class="lk-swash" d="M 45 220 C 120 232, 170 230, 205 242 C 228 250, 235 285, 212 288 C 190 290, 188 260, 214 260 C 228 260, 236 268, 240 274"/>
    <path class="lk-swash lk-swash2" d="M 298 348 C 365 368, 450 368, 515 342"/>
    <path class="lk-heart" d="M 240 285 C 240 285, 229 277, 229 270 C 229 266, 232 263, 236 263 C 238 263, 239.5 264.5, 240 266 C 240.5 264.5, 242 263, 244 263 C 248 263, 251 266, 251 270 C 251 277, 240 285, 240 285 Z"/>
  </svg>
  <span class="lk-name lk-groom" aria-hidden="true">${groom}</span>
  <span class="lk-name lk-bride" aria-hidden="true">${bride}</span>
  <div class="lk-butterfly" aria-hidden="true">${Ru("is-resting")}</div>
</div>`;
}
