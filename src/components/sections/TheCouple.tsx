import React from "react";
import { motion } from "motion/react";
import { WEDDING_DATA } from "../../data/wedding";
import { I18N, Language } from "../../data/i18n";
import { CrestSVG, DividerOrnamentSVG } from "../DecorativeElements";

interface TheCoupleProps {
  lang: Language;
}

export const TheCouple: React.FC<TheCoupleProps> = ({ lang }) => {
  const t = I18N[lang];
  const isKm = lang === "km";
  const { groom, bride } = WEDDING_DATA.couple;

  return (
    <section
      id="couple"
      className="chapter couple bg-[#2a2f16] text-[#f5efdd] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Chapter Header */}
        <div className="chapter__head">
          <span className="font-serif italic text-xs sm:text-sm text-[#d9b15a] tracking-[0.2em] uppercase block mb-1">
            The Bride &amp; Groom
          </span>
          <h2 className="font-moul text-xl sm:text-2xl md:text-3xl foil">
            {isKm ? "កូនកំលោះ និង កូនក្រមុំ" : "The Happy Couple"}
          </h2>
          <div className="mt-3 opacity-70">
            <DividerOrnamentSVG width={180} />
          </div>
        </div>

        {/* 3-Column Stage Matching couple__stage from Reference */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,1.2fr)_1fr] gap-8 md:gap-10 items-center">
          {/* GROOM PERSON */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-right space-y-3"
          >
            <span className="font-kh font-bold text-xs text-[#d9b15a] uppercase tracking-wider block">
              {t.groomLabel}
            </span>
            <h3 className="font-moul text-lg sm:text-2xl text-[#fbefc0]">
              {groom.nameKm}
            </h3>
            <p className="font-serif italic text-sm text-[#d9b15a] tracking-widest uppercase">
              {groom.nameEn}
            </p>

            <div className="w-16 h-px bg-[#d9b15a]/40 mx-auto md:ml-auto md:mr-0 my-3" />

            <div className="font-kh text-xs sm:text-sm text-[#f5efdd]/85 leading-loose">
              <span className="text-[11px] font-bold text-[#d9b15a] block mb-1">
                {t.groomParentsTitle}
              </span>
              <p>{groom.fatherKm}</p>
              <p>{groom.motherKm}</p>
            </div>
          </motion.div>

          {/* CENTER ARCH FRAME */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="arch w-full max-w-[300px] sm:max-w-[340px] mx-auto bg-gradient-to-b from-[#3a4120] to-[#1d2010] p-6 flex flex-col items-center justify-center text-center shadow-2xl relative"
          >
            <div className="absolute inset-2 border border-[#d9b15a]/50 rounded-t-full rounded-b-xl pointer-events-none" />

            <CrestSVG size={52} className="mb-4" />
            <span className="font-moulpali text-2xl sm:text-3xl foil mb-2">
              {groom.shortNameKm} &amp; {bride.shortNameKm}
            </span>
            <p className="font-script text-base sm:text-lg text-[#d9b15a] mb-4">
              Forever &amp; Always
            </p>
            <div className="w-16 h-px bg-[#d9b15a]/60 mb-4" />
            <span className="font-kh text-xs text-[#f5efdd]/80 tracking-widest">
              {isKm
                ? WEDDING_DATA.date.gregorianKm
                : WEDDING_DATA.date.gregorianEn}
            </span>
          </motion.div>

          {/* BRIDE PERSON */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left space-y-3"
          >
            <span className="font-kh font-bold text-xs text-[#d9b15a] uppercase tracking-wider block">
              {t.brideLabel}
            </span>
            <h3 className="font-moul text-lg sm:text-2xl text-[#fbefc0]">
              {bride.nameKm}
            </h3>
            <p className="font-serif italic text-sm text-[#d9b15a] tracking-widest uppercase">
              {bride.nameEn}
            </p>

            <div className="w-16 h-px bg-[#d9b15a]/40 mx-auto md:mr-auto md:ml-0 my-3" />

            <div className="font-kh text-xs sm:text-sm text-[#f5efdd]/85 leading-loose">
              <span className="text-[11px] font-bold text-[#d9b15a] block mb-1">
                {t.brideParentsTitle}
              </span>
              <p>{bride.fatherKm}</p>
              <p>{bride.motherKm}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
