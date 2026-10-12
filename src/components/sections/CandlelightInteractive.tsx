import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { I18N, Language } from "../../data/i18n";
import {
  LotusLanternSVG,
  CrestSVG,
  DividerOrnamentSVG,
} from "../DecorativeElements";

interface CandlelightInteractiveProps {
  lang: Language;
}

interface FloatingLantern {
  id: number;
  x: number;
  y: number;
  scale: number;
  vx: number;
  vy: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export const CandlelightInteractive: React.FC<CandlelightInteractiveProps> = ({
  lang,
}) => {
  const t = I18N[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating lotus lanterns
  const [lanterns, setLanterns] = useState<FloatingLantern[]>([
    { id: 1, x: 25, y: 56, scale: 0.9, vx: 0.02, vy: -0.01 },
    { id: 2, x: 75, y: 46, scale: 0.85, vx: -0.015, vy: 0.015 },
    { id: 3, x: 50, y: 68, scale: 1.1, vx: 0.01, vy: -0.012 },
  ]);

  const ripplesRef = useRef<Ripple[]>([]);

  // Ripple Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += 2.2;
        r.opacity = Math.max(0, 1 - r.radius / r.maxRadius);

        if (r.opacity <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(251, 239, 192, ${r.opacity * 0.45})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        if (r.radius > 16) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius - 12, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(217, 177, 90, ${r.opacity * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInteraction = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripplesRef.current.push({
      id: Date.now(),
      x,
      y,
      radius: 4,
      maxRadius: 190,
      opacity: 0.8,
    });

    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    setLanterns((prev) => [
      ...prev.slice(-6),
      {
        id: Date.now(),
        x: xPct,
        y: yPct,
        scale: 0.95 + Math.random() * 0.2,
        vx: (Math.random() - 0.5) * 0.03,
        vy: (Math.random() - 0.5) * 0.03,
      },
    ]);
  };

  return (
    <section
      id="pond"
      ref={containerRef}
      onPointerDown={handleInteraction}
      className="relative w-full min-h-[580px] sm:min-h-[660px] flex flex-col items-center justify-between py-18 px-4 bg-[#120f0b] overflow-hidden select-none cursor-pointer"
    >
      {/* Background Water Surface */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1d2010] via-[#120f0b] to-[#0a0806]" />
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_rgba(255,182,92,0.18)_0%,_transparent_70%)]" />

      {/* Ripple Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Section Heading */}
      <div className="relative z-20 text-center max-w-xl mx-auto pointer-events-none">
        <CrestSVG size={44} className="mx-auto mb-2" />
        <span className="font-serif italic text-xs sm:text-sm text-[#d9b15a] tracking-[0.2em] uppercase block">
          Sacred Light &amp; Water
        </span>
        <h2 className="font-moul text-xl sm:text-2xl foil">
          {t.candleSectionTitle}
        </h2>
        <p className="font-kh text-xs sm:text-sm text-[#f5efdd]/80 mt-1">
          {t.candleSectionSub}
        </p>
        <div className="mt-3 opacity-60 flex justify-center">
          <DividerOrnamentSVG width={160} />
        </div>
      </div>

      {/* Drifting Lotus Lanterns */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {lanterns.map((l) => (
          <motion.div
            key={l.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: l.scale,
              opacity: 1,
              x: [0, 8, -6, 0],
              y: [0, -6, 4, 0],
            }}
            transition={{
              scale: { duration: 0.8 },
              opacity: { duration: 0.8 },
              x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              position: "absolute",
              left: `${l.x}%`,
              top: `${l.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <LotusLanternSVG size={76} />
          </motion.div>
        ))}
      </div>

      {/* Bottom Hint */}
      <div className="relative z-20 pointer-events-none text-center">
        <span className="font-kh text-xs text-[#d9b15a] bg-[#1d2010]/85 px-4 py-1.5 rounded-full border border-[#d9b15a]/40 shadow-md">
          {lang === "km"
            ? "✨ ចុចលើផ្ទៃទឹកដើម្បីបណ្តែតផ្កាឈូកពរជ័យ"
            : "✨ Tap anywhere to float a blessing lotus lantern"}
        </span>
      </div>
    </section>
  );
};
