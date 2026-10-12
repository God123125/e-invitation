import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronDown, MapPin } from "lucide-react";
import { WEDDING_DATA } from "../../data/wedding";
import { I18N, Language } from "../../data/i18n";
import {
  CrestSVG,
  CornerOrnamentSVG,
  DividerOrnamentSVG,
} from "../DecorativeElements";
import { NameLogo } from "../NameLogo";

interface CoverHeroProps {
  lang: Language;
}

export const CoverHero: React.FC<CoverHeroProps> = ({ lang }) => {
  const t = I18N[lang];
  const isKm = lang === "km";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating gentle golden embers canvas effect matching hero-embers from reference
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width =
      canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height =
      canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    const particles: {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      alpha: number;
      decay: number;
    }[] = [];
    const count = 38;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.8,
        vy: -(Math.random() * 0.45 + 0.2),
        vx: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.7 + 0.2,
        decay: Math.random() * 0.003 + 0.001,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.alpha -= p.decay;

        if (p.y < -10 || p.alpha <= 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.alpha = Math.random() * 0.7 + 0.3;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 239, 192, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#d9b15a";
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="cover"
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-between overflow-hidden bg-[radial-gradient(120%_70%_at_50%_35%,_#fff0c814,_#0000_60%),_linear-gradient(170deg,_var(--olive-500)_0%,_var(--olive-700)_55%,_var(--olive-800)_100%)] pt-20 pb-8 px-4 sm:px-6"
    >
      {/* Background Floating Embers Canvas */}
      <canvas ref={canvasRef} className="hero__embers" aria-hidden="true" />

      {/* 4 Corner Ornaments (Mirrored with inner <g> transforms) */}
      <div className="absolute top-2 left-2 z-20 opacity-90">
        <CornerOrnamentSVG position="top-left" size={68} />
      </div>
      <div className="absolute top-2 right-2 z-20 opacity-90">
        <CornerOrnamentSVG position="top-right" size={68} />
      </div>
      <div className="absolute bottom-2 left-2 z-20 opacity-90">
        <CornerOrnamentSVG position="bottom-left" size={68} />
      </div>
      <div className="absolute bottom-2 right-2 z-20 opacity-90">
        <CornerOrnamentSVG position="bottom-right" size={68} />
      </div>

      {/* Center Framing Container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center my-auto py-3">
        {/* Top Fan Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-1.5"
        >
          <CrestSVG size={54} />
        </motion.div>

        {/* Ceremonial Heading in Moul Font with Specular Gold Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-moul text-xl sm:text-2xl md:text-3xl foil tracking-wide mb-1"
        >
          សិរីសួស្តីអាពាហ៍ពិពាហ៍
        </motion.h1>

        {/* Script Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-script text-lg sm:text-xl text-[#f5efdd]/85 tracking-wider mb-2"
        >
          The Wedding Invitation
        </motion.p>

        {/* Couple's Monogram Name Logo */}
        <div className="my-1.5 py-1">
          <NameLogo size="lg" animated={true} showCrest={false} />
        </div>

        {/* English Names in Cormorant Garamond */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-1 mb-3"
        >
          <p className="font-serif font-semibold text-base sm:text-lg text-[#f5efdd] tracking-[0.25em] uppercase">
            {WEDDING_DATA.couple.groom.nameEn}
            <span className="text-[#d9b15a] mx-2 font-normal">&amp;</span>
            {WEDDING_DATA.couple.bride.nameEn}
          </p>
        </motion.div>

        {/* Divider Flourish */}
        <div className="opacity-80 my-1">
          <DividerOrnamentSVG width={200} />
        </div>

        {/* Cordially Invite Honorific */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="my-1.5"
        >
          <span className="font-kh text-sm sm:text-base text-[#f5efdd] font-medium tracking-wide">
            {t.cordiallyInvite}
          </span>
        </motion.div>

        {/* Exact Reference Date 4-Chips Row: ថ្ងៃ | ទី | ខែ | ឆ្នាំ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="cover__chips"
        >
          <div className="chip-d">
            <small>{t.dayHeader}</small>
            <b>{isKm ? "សុក្រ" : "Fri"}</b>
          </div>
          <div className="chip-d">
            <small>{t.dateHeader}</small>
            <b className="text-[#fbefc0]">
              {isKm ? WEDDING_DATA.date.dayKm : WEDDING_DATA.date.dayEn}
            </b>
          </div>
          <div className="chip-d">
            <small>{t.monthHeader}</small>
            <b>
              {isKm ? WEDDING_DATA.date.monthKm : WEDDING_DATA.date.monthEn}
            </b>
          </div>
          <div className="chip-d">
            <small>{t.yearHeader}</small>
            <b>{isKm ? WEDDING_DATA.date.yearKm : WEDDING_DATA.date.yearEn}</b>
          </div>
        </motion.div>

        {/* Khmer Lunar Calendar Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-1 px-4"
        >
          <p className="font-kh text-xs sm:text-sm text-[#f5efdd]/85 max-w-lg leading-relaxed">
            {isKm ? WEDDING_DATA.date.lunarKm : WEDDING_DATA.date.lunarEn}
          </p>
        </motion.div>

        {/* Venue Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#d9b15a]"
        >
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="font-kh font-medium text-[#f5efdd]">
            {isKm ? WEDDING_DATA.venue.nameKm : WEDDING_DATA.venue.nameEn} ·{" "}
            {isKm ? WEDDING_DATA.venue.addressKm : WEDDING_DATA.venue.addressEn}
          </span>
        </motion.div>
      </div>

      {/* Scroll Cue Indicator */}
      <motion.a
        href="#words"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center mt-2 text-[#d9b15a] cursor-pointer hover:text-[#fbefc0] transition-colors"
      >
        <span className="font-kh text-[11px] tracking-wider mb-1 text-[#f5efdd]/80">
          {t.scrollCue}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#d9b15a]" />
        </motion.div>
      </motion.a>
    </section>
  );
};
