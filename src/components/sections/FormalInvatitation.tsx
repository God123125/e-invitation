import React from "react";
import { motion } from "motion/react";
import { WEDDING_DATA } from "../../data/wedding";
import { I18N, Language } from "../../data/i18n";
import { DividerOrnamentSVG, CrestSVG } from "../DecorativeElements";

interface FormalInvitationProps {
  lang: Language;
}

export const FormalInvitation: React.FC<FormalInvitationProps> = ({ lang }) => {
  const t = I18N[lang];
  const isKm = lang === "km";
  const { groom, bride } = WEDDING_DATA.couple;

  return (
    <section
      id="words"
      className="chapter words bg-[#3a4120] text-[#f5efdd] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[0.88fr_1.12fr] gap-8 md:gap-14 items-center">
        {/* Left: Neoclassical Arch Frame (.arch from reference) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="arch max-w-[340px] md:max-w-none mx-auto w-full bg-gradient-to-b from-[#2a2f16] to-[#1d2010] flex flex-col items-center justify-center p-6 text-center"
        >
          {/* Artistic Inset Floral Arch Framing */}
          <div className="absolute inset-3 border border-[#d9b15a]/40 rounded-t-full rounded-b-xl pointer-events-none" />

          <div className="my-auto flex flex-col items-center">
            <CrestSVG size={58} className="mb-4" />
            <span className="font-moul text-lg sm:text-xl text-[#fbefc0] mb-2 leading-relaxed">
              សិរីសួស្តីអាពាហ៍ពិពាហ៍
            </span>
            <p className="font-script text-base text-[#d9b15a] mb-6">
              The Sacred Union
            </p>
            <div className="w-20 h-px bg-[#d9b15a]/50 mb-6" />
            <p className="font-moulpali text-xl sm:text-2xl foil mb-2">
              {groom.shortNameKm} &amp; {bride.shortNameKm}
            </p>
            <p className="font-serif italic text-xs tracking-widest uppercase text-[#f5efdd]/80">
              {groom.nameEn} &amp; {bride.nameEn}
            </p>
          </div>
        </motion.div>

        {/* Right: Invitation Words & Both Sets of Parents (.words__text) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-center md:text-left"
        >
          {/* Kicker */}
          <div>
            <span className="font-serif italic text-xs sm:text-sm text-[#d9b15a] tracking-[0.2em] uppercase block mb-1">
              Ceremonial Announcement
            </span>
            <h2 className="font-moul text-xl sm:text-2xl md:text-3xl text-[#fbefc0] leading-relaxed">
              {t.cordiallyInvite}
            </h2>
          </div>

          {/* Parents Two-Column Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-y border-[#d9b15a]/30 py-5 my-6 text-center sm:text-left">
            {/* Groom's Parents */}
            <div>
              <span className="font-kh font-bold text-xs text-[#d9b15a] uppercase tracking-wider block mb-1">
                {t.groomParentsTitle}
              </span>
              <div className="font-kh text-sm sm:text-base text-[#f5efdd] leading-loose">
                <p>{groom.fatherKm}</p>
                <p>{groom.motherKm}</p>
              </div>
              {!isKm && (
                <p className="font-serif italic text-xs text-[#d9b15a]/80 mt-1">
                  {groom.fatherEn} &amp; {groom.motherEn}
                </p>
              )}
            </div>

            {/* Bride's Parents */}
            <div>
              <span className="font-kh font-bold text-xs text-[#d9b15a] uppercase tracking-wider block mb-1">
                {t.brideParentsTitle}
              </span>
              <div className="font-kh text-sm sm:text-base text-[#f5efdd] leading-loose">
                <p>{bride.fatherKm}</p>
                <p>{bride.motherKm}</p>
              </div>
              {!isKm && (
                <p className="font-serif italic text-xs text-[#d9b15a]/80 mt-1">
                  {bride.fatherEn} &amp; {bride.motherEn}
                </p>
              )}
            </div>
          </div>

          {/* Invitation Prose */}
          <div className="font-kh text-sm sm:text-base text-[#f5efdd]/90 leading-[2.1] space-y-3">
            <p className="font-semibold text-[#fbefc0]">{t.guestHonorific}</p>
            <p>{t.formalInvitationP1}</p>
            <div className="py-1">
              <span className="font-moul text-sm sm:text-base text-[#fbefc0] block">
                {groom.nameKm}
                <span className="text-xs font-normal text-[#d9b15a] mx-2">
                  ជាគូនឹង
                </span>
                {bride.nameKm}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#f5efdd]/75">
              {t.formalInvitationP2}
            </p>
          </div>

          <div className="pt-2 opacity-80 flex justify-center md:justify-start">
            <DividerOrnamentSVG width={180} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
