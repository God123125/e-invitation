import React from "react";
import { motion } from "motion/react";
import { WEDDING_DATA, CeremonyItem } from "../../data/wedding";
import { I18N, Language } from "../../data/i18n";
import { CrestSVG, DividerOrnamentSVG } from "../DecorativeElements";

interface ProgrammeTimelineProps {
  lang: Language;
}

export const ProgrammeTimeline: React.FC<ProgrammeTimelineProps> = ({
  lang,
}) => {
  const t = I18N[lang];
  const isKm = lang === "km";
  const programmes = WEDDING_DATA.programmes;

  // Custom vector line icons matching reference craftsmanship
  const renderRitualIcon = (type: CeremonyItem["iconType"]) => {
    switch (type) {
      case "fruit":
        return (
          <svg
            viewBox="0 0 40 40"
            className="w-5 h-5 stroke-[#fbefc0] fill-none"
            strokeWidth="1.6"
          >
            <path d="M8 26 L32 26 C30 32, 10 32, 8 26 Z" />
            <path d="M12 26 C12 18, 28 18, 28 26" />
            <circle cx="20" cy="14" r="3.5" />
            <circle cx="15" cy="18" r="3" />
            <circle cx="25" cy="18" r="3" />
            <path d="M16 32 L14 36 L26 36 L24 32" />
          </svg>
        );
      case "ring":
        return (
          <svg
            viewBox="0 0 40 40"
            className="w-5 h-5 stroke-[#fbefc0] fill-none"
            strokeWidth="1.6"
          >
            <circle cx="16" cy="22" r="9" />
            <circle cx="24" cy="18" r="9" />
            <path d="M24 9 L25 7 L27 9 L25 11 Z" fill="#fbefc0" />
          </svg>
        );
      case "chant":
        return (
          <svg
            viewBox="0 0 40 40"
            className="w-5 h-5 stroke-[#fbefc0] fill-none"
            strokeWidth="1.6"
          >
            <path
              d="M20 10 C20 10, 26 20, 20 28 C14 20, 20 10, 20 10 Z"
              fill="#fbefc0"
              opacity="0.3"
            />
            <path d="M20 28 C15 22, 9 20, 11 26 C13 30, 18 29, 20 28 Z" />
            <path d="M20 28 C25 22, 31 20, 29 26 C27 30, 22 29, 20 28 Z" />
            <circle cx="20" cy="8" r="1.5" fill="#fbefc0" />
          </svg>
        );
      case "knot":
        return (
          <svg
            viewBox="0 0 40 40"
            className="w-5 h-5 stroke-[#fbefc0] fill-none"
            strokeWidth="1.6"
          >
            <path d="M20 8 C16 16, 14 24, 20 32 C26 24, 24 16, 20 8 Z" />
            <circle cx="20" cy="20" r="3" fill="#fbefc0" />
            <path d="M10 28 Q20 34, 30 28" />
            <path d="M20 32 L20 36" />
          </svg>
        );
      case "lunch":
        return (
          <svg
            viewBox="0 0 40 40"
            className="w-5 h-5 stroke-[#fbefc0] fill-none"
            strokeWidth="1.6"
          >
            <path d="M8 26 L32 26" />
            <path d="M10 26 C10 14, 30 14, 30 26 Z" />
            <circle cx="20" cy="12" r="2" />
            <path d="M6 30 L34 30" />
          </svg>
        );
      case "banquet":
        return (
          <svg
            viewBox="0 0 40 40"
            className="w-5 h-5 stroke-[#fbefc0] fill-none"
            strokeWidth="1.6"
          >
            <path d="M14 12 L18 22 L18 28 M14 28 L22 28" />
            <path d="M26 12 L22 22 L22 28 M18 28 L26 28" />
            <circle cx="20" cy="10" r="1.5" fill="#fbefc0" />
            <path d="M18 7 L20 4 L22 7" />
          </svg>
        );
    }
  };

  return (
    <section
      id="programme"
      className="chapter programme bg-[#2a2f16] text-[#f5efdd] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-14 items-start">
        {/* Sticky Aside Column on Desktop (.programme__aside) */}
        <div className="md:sticky md:top-[18vh] text-center md:text-left space-y-3">
          <CrestSVG size={46} className="mx-auto md:mx-0" />
          <span className="font-serif italic text-xs sm:text-sm text-[#d9b15a] tracking-[0.2em] uppercase block">
            Sacred Order of Service
          </span>
          <h2 className="font-moul text-2xl sm:text-3xl md:text-4xl foil leading-relaxed">
            {t.programmeHeading}
          </h2>
          <p className="font-kh text-xs sm:text-sm text-[#f5efdd]/80 max-w-sm mx-auto md:mx-0">
            {t.programmeSub}
          </p>
          <div className="pt-2 opacity-70 flex justify-center md:justify-start">
            <DividerOrnamentSVG width={180} />
          </div>
        </div>

        {/* Timeline List with Gold Thread Sheen (.programme__list) */}
        <div className="relative pl-7 sm:pl-10 border-l-2 border-[#d9b15a]/40 space-y-9 sm:space-y-11 ml-3 sm:ml-6">
          {/* Animated Gold Thread Line */}
          <div className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#fbefc0] via-[#d9b15a] to-transparent pointer-events-none" />

          {programmes.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Gold Node */}
              <div className="absolute -left-[37px] sm:-left-[49px] top-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1d2010] border-2 border-[#d9b15a] shadow-[0_0_12px_rgba(217,177,90,0.35)] flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-[#fbefc0]">
                {renderRitualIcon(item.iconType)}
              </div>

              {/* Ritual Details */}
              <div className="bg-[#1d2010]/80 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-[#d9b15a]/35 shadow-lg transition-all group-hover:border-[#fbefc0]/60">
                {/* Time Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3a4120] text-[#fbefc0] border border-[#d9b15a]/50 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fbefc0] animate-pulse" />
                  <span className="font-kh font-semibold text-xs tracking-wider">
                    {isKm ? item.timeKm : item.timeEn}
                  </span>
                </div>

                {/* Ritual Title */}
                <h3 className="font-moul text-sm sm:text-base text-[#fbefc0] leading-relaxed mb-1.5">
                  {isKm ? item.titleKm : item.titleEn}
                </h3>

                {/* Description */}
                <p className="font-kh text-xs sm:text-sm text-[#f5efdd]/80 leading-relaxed">
                  {isKm ? item.descriptionKm : item.descriptionEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
