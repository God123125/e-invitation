import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { WEDDING_DATA } from "../../data/wedding";
import { I18N, Language } from "../../data/i18n";
import {
  CrestSVG,
  DividerOrnamentSVG,
  ButterflySVG,
} from "../DecorativeElements";

interface LoveStorySectionProps {
  lang: Language;
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({ lang }) => {
  const t = I18N[lang];
  const isKm = lang === "km";
  const stories = WEDDING_DATA.loveStory;
  const [activeIndex, setActiveIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background atmosphere shifting day -> golden -> dusk -> evening ceremony
  const atmospheres = [
    "from-[#3a4120] via-[#2a2f16] to-[#1d2010]", // Day
    "from-[#4f5a26] via-[#3a4120] to-[#1d2010]", // Golden hour
    "from-[#2e2636] via-[#1f2228] to-[#120f0b]", // Dusk
    "from-[#1f2618] via-[#141b12] to-[#0d120c]", // Evening ceremony
  ];

  // Story embers canvas effect
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

    const particles: {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      alpha: number;
    }[] = [];
    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.6,
        vy: -(Math.random() * 0.35 + 0.15),
        vx: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 239, 192, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#d9b15a";
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="story"
      className={`relative w-full py-20 px-4 sm:px-6 transition-colors duration-1000 overflow-hidden bg-gradient-to-b ${atmospheres[activeIndex]}`}
    >
      <canvas ref={canvasRef} className="hero__embers" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Chapter Header */}
        <div className="chapter__head text-center mb-10">
          <CrestSVG size={44} className="mx-auto mb-2" />
          <span className="font-serif italic text-xs sm:text-sm text-[#d9b15a] tracking-[0.2em] uppercase block">
            Milestones of Our Devotion
          </span>
          <h2 className="font-moul text-xl sm:text-2xl md:text-3xl foil">
            {t.loveStoryHeading}
          </h2>
          <p className="font-kh text-xs sm:text-sm text-[#f5efdd]/80 mt-1">
            {t.loveStorySub}
          </p>
          <div className="mt-3 opacity-70 flex justify-center">
            <DividerOrnamentSVG width={180} />
          </div>
        </div>

        {/* Horizontal Navigation Dots */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
          {stories.map((story, idx) => (
            <button
              key={story.year}
              onClick={() => setActiveIndex(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-kh transition-all ${
                activeIndex === idx
                  ? "bg-[#d9b15a] text-[#1d2010] font-bold shadow-lg scale-105"
                  : "bg-[#1d2010]/60 text-[#f5efdd]/70 hover:bg-[#1d2010]/90 border border-[#d9b15a]/30"
              }`}
            >
              {story.year}
            </button>
          ))}
        </div>

        {/* Pinned Carousel Card */}
        <div className="relative min-h-[350px] flex items-center justify-center">
          {stories.map((story, idx) => {
            if (idx !== activeIndex) return null;
            return (
              <motion.div
                key={story.year}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-xl rounded-2xl bg-[#1d2010]/85 backdrop-blur-md p-6 sm:p-10 border border-[#d9b15a]/40 shadow-2xl text-[#f5efdd] flex flex-col items-center text-center relative"
              >
                {/* Year Pill Tag */}
                <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#3a4120] text-[#fbefc0] border border-[#d9b15a]/60 mb-4 shadow-sm">
                  <span className="font-kh font-bold text-sm">
                    {story.year}
                  </span>
                  <ButterflySVG size={16} />
                </div>

                {/* Chapter Title in Moul */}
                <h3 className="font-moul text-base sm:text-xl text-[#fbefc0] mb-1">
                  {isKm ? story.titleKm : story.titleEn}
                </h3>

                <p className="font-serif italic text-xs sm:text-sm text-[#d9b15a] mb-4">
                  {story.titleEn}
                </p>

                <div className="w-16 h-px bg-[#d9b15a]/40 mb-4" />

                {/* Poetic Khmer Caption */}
                <p className="font-kh text-sm sm:text-base text-[#f5efdd]/90 leading-[2.1] max-w-md">
                  {isKm ? story.descKm : story.descEn}
                </p>

                <div className="mt-6 opacity-60">
                  <DividerOrnamentSVG width={140} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeIndex === 0}
            className={`px-4 py-1.5 rounded-lg border text-xs font-kh transition-all ${
              activeIndex === 0
                ? "opacity-30 cursor-not-allowed border-gray-600 text-gray-500"
                : "border-[#d9b15a]/50 text-[#f5efdd] hover:bg-[#d9b15a]/20"
            }`}
          >
            {isKm ? "← មុន" : "← Previous"}
          </button>
          <span className="text-xs text-[#d9b15a] font-kh">
            {activeIndex + 1} / {stories.length}
          </span>
          <button
            onClick={() =>
              setActiveIndex((prev) => Math.min(stories.length - 1, prev + 1))
            }
            disabled={activeIndex === stories.length - 1}
            className={`px-4 py-1.5 rounded-lg border text-xs font-kh transition-all ${
              activeIndex === stories.length - 1
                ? "opacity-30 cursor-not-allowed border-gray-600 text-gray-500"
                : "border-[#d9b15a]/50 text-[#f5efdd] hover:bg-[#d9b15a]/20"
            }`}
          >
            {isKm ? "បន្ទាប់ →" : "Next →"}
          </button>
        </div>
      </div>
    </section>
  );
};
