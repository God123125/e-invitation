import React from "react";
import { motion } from "motion/react";
import { CrestSVG, ButterflySVG } from "./DecorativeElements";

interface NameLogoProps {
  size?: "xs" | "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
  theme?: "gold-on-dark" | "gold-on-light";
  showCrest?: boolean;
}

/**
 * Couple's Signature Monogram Logo (ឡូហ្គោឈ្មោះ)
 * - Groom: "ម៉ារ៉ាឌី" (Marady) top-left in Moulpali gold foil
 * - Bride: "សុជាតា" (Socheata) bottom-right in Moulpali gold foil
 * - Flourish curve joining them, small gold heart, butterfly, decorative crest on top.
 * - Layered HTML text with extra vertical padding to ensure Khmer subscripts and vowels never get clipped.
 */
export const NameLogo: React.FC<NameLogoProps> = ({
  size = "md",
  animated = false,
  className = "",
  theme = "gold-on-dark",
  showCrest = true,
}) => {
  // Dimension scales
  const scales = {
    xs: {
      container: "w-[140px] h-[58px]",
      groomText: "text-sm",
      brideText: "text-sm",
      crestSize: 24,
      butterflySize: 16,
      heartSize: 8,
      svgWidth: 140,
      svgHeight: 36,
    },
    sm: {
      container: "w-[190px] h-[78px]",
      groomText: "text-base sm:text-lg",
      brideText: "text-base sm:text-lg",
      crestSize: 32,
      butterflySize: 20,
      heartSize: 10,
      svgWidth: 190,
      svgHeight: 46,
    },
    md: {
      container: "w-[250px] sm:w-[280px] h-[100px] sm:h-[110px]",
      groomText: "text-xl sm:text-2xl",
      brideText: "text-xl sm:text-2xl",
      crestSize: 42,
      butterflySize: 26,
      heartSize: 13,
      svgWidth: 280,
      svgHeight: 64,
    },
    lg: {
      container: "w-[300px] sm:w-[350px] h-[130px] sm:h-[145px]",
      groomText: "text-2xl sm:text-3xl",
      brideText: "text-2xl sm:text-3xl",
      crestSize: 52,
      butterflySize: 32,
      heartSize: 16,
      svgWidth: 350,
      svgHeight: 76,
    },
  }[size];

  return (
    <div
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      {/* Top Small Decorative Crest */}
      {showCrest && (
        <motion.div
          initial={animated ? { opacity: 0, y: -8, scale: 0.9 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-0.5"
        >
          <CrestSVG size={scales.crestSize} />
        </motion.div>
      )}

      {/* Main Flourish Lockup with Layered HTML Khmer Text */}
      <div className={`relative ${scales.container}`}>
        {/* SVG Connecting Flourish & Heart Path in Background */}
        <svg
          viewBox={`0 0 ${scales.svgWidth} ${scales.svgHeight}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="logoFoilLine"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#cf9f45" />
              <stop offset="35%" stopColor="#fae7b4" />
              <stop offset="65%" stopColor="#deb260" />
              <stop offset="100%" stopColor="#b47e24" />
            </linearGradient>
          </defs>

          {/* S-curve joining Groom and Bride */}
          <motion.path
            d={`M ${scales.svgWidth * 0.32} ${scales.svgHeight * 0.35} 
               C ${scales.svgWidth * 0.46} ${scales.svgHeight * 0.22}, 
                 ${scales.svgWidth * 0.52} ${scales.svgHeight * 0.78}, 
                 ${scales.svgWidth * 0.68} ${scales.svgHeight * 0.65}`}
            stroke="url(#logoFoilLine)"
            strokeWidth={size === "xs" ? 1 : 1.5}
            strokeLinecap="round"
            fill="none"
            initial={animated ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          />

          {/* Secondary delicate parallel flourish */}
          <path
            d={`M ${scales.svgWidth * 0.36} ${scales.svgHeight * 0.42} 
               Q ${scales.svgWidth * 0.5} ${scales.svgHeight * 0.52}, 
                 ${scales.svgWidth * 0.64} ${scales.svgHeight * 0.58}`}
            stroke="url(#logoFoilLine)"
            strokeWidth={0.75}
            strokeDasharray="2 3"
            opacity="0.6"
            fill="none"
          />
        </svg>

        {/* Groom's Short Name: Top-Left (HTML Text for correct Khmer shaping) */}
        <motion.div
          initial={animated ? { opacity: 0, x: -16 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1 top-0 z-10"
        >
          <span
            className={`font-moulpali ${scales.groomText} g-foil-text leading-tight tracking-normal block drop-shadow-sm`}
            style={{
              paddingTop: "0.35em",
              paddingBottom: "0.25em",
              paddingLeft: "0.1em",
              paddingRight: "0.1em",
            }}
          >
            ម៉ារ៉ាឌី
          </span>
        </motion.div>

        {/* Center Heart Emblem */}
        <motion.div
          initial={animated ? { scale: 0, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.7,
            type: "spring",
            bounce: 0.4,
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <div
            className="rounded-full bg-gradient-to-tr from-[#cf9f45] via-[#fae7b4] to-[#ad7b29] p-1 shadow-sm flex items-center justify-center"
            style={{
              width: scales.heartSize * 2,
              height: scales.heartSize * 2,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full fill-[#352515]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </motion.div>

        {/* Butterfly flying in above Bride */}
        <motion.div
          initial={animated ? { opacity: 0, scale: 0.6, x: 14, y: 10 } : false}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-0 top-1 z-10 pointer-events-none"
        >
          <ButterflySVG size={scales.butterflySize} />
        </motion.div>

        {/* Bride's Short Name: Bottom-Right (HTML Text) */}
        <motion.div
          initial={animated ? { opacity: 0, x: 16 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-1 bottom-0 z-10"
        >
          <span
            className={`font-moulpali ${scales.brideText} g-foil-text leading-tight tracking-normal block drop-shadow-sm`}
            style={{
              paddingTop: "0.35em",
              paddingBottom: "0.25em",
              paddingLeft: "0.1em",
              paddingRight: "0.1em",
            }}
          >
            សុជាតា
          </span>
        </motion.div>
      </div>
    </div>
  );
};
