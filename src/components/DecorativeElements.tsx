import React from "react";

/**
 * High-craft vector decorative ornaments for the printed-card aesthetic:
 * - Fan-shaped decorative crest
 * - Mirrored corner ornaments (mirrored with inner <g> transform as required)
 * - Divider flourishes
 * - Wax seal with organic poured edge & SVG specular light
 * - Delicate butterfly
 * - Lotus lantern
 */

export const CrestSVG: React.FC<{ className?: string; size?: number }> = ({
  className = "",
  size = 56,
}) => {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="crestFoil" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cf9f45" />
          <stop offset="30%" stopColor="#fae7b4" />
          <stop offset="50%" stopColor="#deb260" />
          <stop offset="70%" stopColor="#fff8e2" />
          <stop offset="100%" stopColor="#ad7b29" />
        </linearGradient>
      </defs>
      {/* Central Fan Petal */}
      <path
        d="M60 8 C60 8, 64 26, 60 48 C56 26, 60 8, 60 8 Z"
        fill="url(#crestFoil)"
      />
      {/* Flanking Petals Left & Right */}
      <path
        d="M60 48 C54 32, 45 22, 38 18 C46 29, 52 40, 60 48 Z"
        fill="url(#crestFoil)"
      />
      <path
        d="M60 48 C66 32, 75 22, 82 18 C74 29, 68 40, 60 48 Z"
        fill="url(#crestFoil)"
      />
      {/* Outer Leaf Wings */}
      <path
        d="M60 48 C50 36, 32 30, 20 28 C30 38, 44 46, 60 48 Z"
        fill="url(#crestFoil)"
      />
      <path
        d="M60 48 C70 36, 88 30, 100 28 C90 38, 76 46, 60 48 Z"
        fill="url(#crestFoil)"
      />
      {/* Base Curls & Pedestal */}
      <path
        d="M42 58 C46 52, 54 50, 60 50 C66 50, 74 52, 78 58 C72 63, 66 64, 60 64 C54 64, 48 63, 42 58 Z"
        fill="url(#crestFoil)"
      />
      {/* Scroll Filigree Base */}
      <path
        d="M30 64 C38 60, 48 68, 60 67 C72 68, 82 60, 90 64 C82 72, 70 73, 60 72 C50 73, 38 72, 30 64 Z"
        stroke="url(#crestFoil)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Crown Finial Pearl */}
      <circle cx="60" cy="5" r="3" fill="url(#crestFoil)" />
      <circle cx="38" cy="17" r="1.8" fill="url(#crestFoil)" />
      <circle cx="82" cy="17" r="1.8" fill="url(#crestFoil)" />
      <circle cx="19" cy="27" r="1.5" fill="url(#crestFoil)" />
      <circle cx="101" cy="27" r="1.5" fill="url(#crestFoil)" />
    </svg>
  );
};

/**
 * Corner element with inner group transform to prevent GSAP undoing the flip
 */
export const CornerOrnamentSVG: React.FC<{
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  className?: string;
}> = ({ position, size = 64, className = "" }) => {
  // Mirror via internal <g> transform rather than CSS
  let transformGroup = "";
  if (position === "top-right") {
    transformGroup = "translate(100, 0) scale(-1, 1)";
  } else if (position === "bottom-left") {
    transformGroup = "translate(0, 100) scale(1, -1)";
  } else if (position === "bottom-right") {
    transformGroup = "translate(100, 100) scale(-1, -1)";
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient
          id={`cornerFoil-${position}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#cf9f45" />
          <stop offset="40%" stopColor="#fae7b4" />
          <stop offset="70%" stopColor="#deb260" />
          <stop offset="100%" stopColor="#ad7b29" />
        </linearGradient>
      </defs>
      <g transform={transformGroup}>
        {/* Corner outer border lines */}
        <path
          d="M4 35 L4 4 L35 4"
          stroke={`url(#cornerFoil-${position})`}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M8 25 L8 8 L25 8"
          stroke={`url(#cornerFoil-${position})`}
          strokeWidth="0.75"
          strokeDasharray="2 2"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Curled leaf scrolls */}
        <path
          d="M6 6 C16 16, 26 12, 34 22 C26 26, 18 20, 6 6 Z"
          fill={`url(#cornerFoil-${position})`}
          opacity="0.9"
        />
        <path
          d="M10 10 C18 26, 14 36, 24 44 C28 36, 22 28, 10 10 Z"
          fill={`url(#cornerFoil-${position})`}
          opacity="0.8"
        />
        <path
          d="M16 16 Q30 30, 48 32 C40 38, 30 34, 20 24"
          stroke={`url(#cornerFoil-${position})`}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Little decorative node */}
        <circle cx="34" cy="22" r="2" fill={`url(#cornerFoil-${position})`} />
        <circle cx="24" cy="44" r="1.5" fill={`url(#cornerFoil-${position})`} />
        <circle cx="4" cy="4" r="2.5" fill={`url(#cornerFoil-${position})`} />
      </g>
    </svg>
  );
};

export const DividerOrnamentSVG: React.FC<{
  className?: string;
  width?: number;
}> = ({ className = "", width = 240 }) => {
  return (
    <svg
      width={width}
      height={24}
      viewBox="0 0 240 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 mx-auto ${className}`}
    >
      <defs>
        <linearGradient id="divFoil" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cf9f45" stopOpacity="0" />
          <stop offset="25%" stopColor="#cf9f45" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#fae7b4" />
          <stop offset="75%" stopColor="#cf9f45" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cf9f45" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Tapered lines */}
      <line
        x1="10"
        y1="12"
        x2="100"
        y2="12"
        stroke="url(#divFoil)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="140"
        y1="12"
        x2="230"
        y2="12"
        stroke="url(#divFoil)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Center Motif */}
      <path
        d="M120 4 C116 8, 112 11, 108 12 C112 13, 116 16, 120 20 C124 16, 128 13, 132 12 C128 11, 124 8, 120 4 Z"
        fill="url(#divFoil)"
      />
      <circle cx="103" cy="12" r="1.8" fill="url(#divFoil)" />
      <circle cx="137" cy="12" r="1.8" fill="url(#divFoil)" />
      <circle cx="95" cy="12" r="1.2" fill="url(#divFoil)" />
      <circle cx="145" cy="12" r="1.2" fill="url(#divFoil)" />
    </svg>
  );
};

export const ButterflySVG: React.FC<{ className?: string; size?: number }> = ({
  className = "",
  size = 28,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
    >
      <defs>
        <linearGradient id="bfFoil" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c26f" />
          <stop offset="45%" stopColor="#fff2cb" />
          <stop offset="100%" stopColor="#b47e24" />
        </linearGradient>
      </defs>
      {/* Left upper wing */}
      <path
        d="M30 30 C22 18, 8 10, 4 20 C0 30, 14 36, 30 32 Z"
        fill="url(#bfFoil)"
        opacity="0.9"
      />
      {/* Right upper wing */}
      <path
        d="M30 30 C38 18, 52 10, 56 20 C60 30, 46 36, 30 32 Z"
        fill="url(#bfFoil)"
        opacity="0.9"
      />
      {/* Left lower wing */}
      <path
        d="M30 32 C20 36, 10 44, 16 52 C22 56, 28 44, 30 34 Z"
        fill="url(#bfFoil)"
        opacity="0.8"
      />
      {/* Right lower wing */}
      <path
        d="M30 32 C40 36, 50 44, 44 52 C38 56, 32 44, 30 34 Z"
        fill="url(#bfFoil)"
        opacity="0.8"
      />
      {/* Body & Antennae */}
      <ellipse cx="30" cy="32" rx="2" ry="7" fill="url(#bfFoil)" />
      <path
        d="M29 25 Q24 16, 21 15"
        stroke="url(#bfFoil)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M31 25 Q36 16, 39 15"
        stroke="url(#bfFoil)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20.5" cy="14.5" r="1" fill="url(#bfFoil)" />
      <circle cx="39.5" cy="14.5" r="1" fill="url(#bfFoil)" />
    </svg>
  );
};

/**
 * Wax seal with natural poured uneven perimeter, SVG specular lighting and debossed crest
 */
export const WaxSealSVG: React.FC<{
  size?: number;
  className?: string;
  onClick?: () => void;
}> = ({ size = 78, className = "", onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-full cursor-pointer select-none transition-transform active:scale-95 duration-200 wax-seal-shadow ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-md"
      >
        <defs>
          <radialGradient id="waxBase" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffea9f" />
            <stop offset="35%" stopColor="#deb05a" />
            <stop offset="70%" stopColor="#ad7820" />
            <stop offset="95%" stopColor="#7a4f0b" />
            <stop offset="100%" stopColor="#573503" />
          </radialGradient>
          <linearGradient id="sealShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#ffd87d" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
          </linearGradient>
          <filter
            id="specularGlow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feSpecularLighting
              in="blur"
              surfaceScale="4"
              specularConstant="1.2"
              specularExponent="20"
              lightingColor="#fff7d6"
              result="specular"
            >
              <fePointLight x="30" y="25" z="80" />
            </feSpecularLighting>
            <feComposite
              in="specular"
              in2="SourceAlpha"
              operator="in"
              result="specularCut"
            />
            <feComposite in="SourceGraphic" in2="specularCut" operator="over" />
          </filter>
        </defs>

        {/* Organic, hand-poured uneven circumference */}
        <path
          d="M 50 3
             C 63 2, 76 6, 84 16
             C 92 25, 96 38, 97 50
             C 98 64, 91 76, 82 86
             C 72 95, 59 97, 47 96
             C 33 95, 20 90, 12 79
             C 3 67, 3 53, 5 39
             C 7 24, 18 11, 31 5
             C 37 2, 44 4, 50 3 Z"
          fill="url(#waxBase)"
          filter="url(#specularGlow)"
        />

        {/* Outer rim ridge ring */}
        <circle
          cx="50"
          cy="50"
          r="39"
          stroke="#5d3907"
          strokeWidth="2.5"
          opacity="0.4"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="38"
          stroke="#ffebaf"
          strokeWidth="1.2"
          opacity="0.6"
          fill="none"
        />

        {/* Inner impressed circle */}
        <circle cx="50" cy="50" r="32" fill="#9e6d19" />
        <circle
          cx="50"
          cy="50"
          r="32"
          stroke="#573604"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />

        {/* Pressed crest motif inside the seal */}
        <g transform="translate(18, 20) scale(0.64)">
          <path
            d="M50 15 C50 15, 53 28, 50 42 C47 28, 50 15, 50 15 Z"
            fill="#ffebaa"
            opacity="0.85"
          />
          <path
            d="M50 42 C44 30, 36 22, 30 18 C37 27, 43 36, 50 42 Z"
            fill="#ffd980"
            opacity="0.75"
          />
          <path
            d="M50 42 C56 30, 64 22, 70 18 C63 27, 57 36, 50 42 Z"
            fill="#ffd980"
            opacity="0.75"
          />
          {/* Base flourish in seal */}
          <path
            d="M32 50 C40 45, 60 45, 68 50 C60 55, 40 55, 32 50 Z"
            fill="#ffecb0"
            opacity="0.9"
          />
          <circle cx="50" cy="12" r="3.5" fill="#ffecb0" />
          <circle cx="50" cy="60" r="2.5" fill="#ffecb0" />
        </g>

        {/* Specular highlights overlay */}
        <ellipse
          cx="36"
          cy="28"
          rx="14"
          ry="7"
          fill="url(#sealShine)"
          transform="rotate(-30 36 28)"
        />
      </svg>
    </div>
  );
};

export const LotusLanternSVG: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 64, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <radialGradient id="lotusGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="40%" stopColor="#ffb347" />
          <stop offset="80%" stopColor="#d96b27" />
          <stop offset="100%" stopColor="#872b0c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lotusPetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffe6cc" />
          <stop offset="50%" stopColor="#d87a58" />
          <stop offset="100%" stopColor="#8d2b1f" />
        </linearGradient>
      </defs>
      {/* Water reflection glow */}
      <ellipse
        cx="50"
        cy="80"
        rx="36"
        ry="10"
        fill="url(#lotusGlow)"
        opacity="0.65"
      />

      {/* Outer lotus petals */}
      <path
        d="M50 72 C30 72, 10 65, 14 50 C18 40, 36 60, 50 72 Z"
        fill="url(#lotusPetal)"
        opacity="0.85"
      />
      <path
        d="M50 72 C70 72, 90 65, 86 50 C82 40, 64 60, 50 72 Z"
        fill="url(#lotusPetal)"
        opacity="0.85"
      />

      {/* Middle petals */}
      <path
        d="M50 72 C35 70, 22 55, 26 42 C32 35, 42 54, 50 72 Z"
        fill="url(#lotusPetal)"
      />
      <path
        d="M50 72 C65 70, 78 55, 74 42 C68 35, 58 54, 50 72 Z"
        fill="url(#lotusPetal)"
      />

      {/* Center petals */}
      <path
        d="M50 70 C42 66, 36 50, 42 36 C47 45, 49 58, 50 70 Z"
        fill="#ffcca8"
      />
      <path
        d="M50 70 C58 66, 64 50, 58 36 C53 45, 51 58, 50 70 Z"
        fill="#ffcca8"
      />

      {/* Candle base */}
      <ellipse cx="50" cy="58" rx="8" ry="3" fill="#ffe99c" />

      {/* Animated Candle Flame */}
      <g
        className="animate-candle origin-bottom"
        style={{ transformOrigin: "50px 54px" }}
      >
        <path
          d="M50 32 C54 42, 55 48, 50 54 C45 48, 46 42, 50 32 Z"
          fill="url(#lotusGlow)"
        />
        <circle cx="50" cy="46" r="3" fill="#ffffff" />
      </g>
    </svg>
  );
};
