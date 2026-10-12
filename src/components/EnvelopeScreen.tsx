import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { WEDDING_DATA } from "../data/wedding";
import { I18N, Language } from "../data/i18n";
import { WaxSealSVG, CornerOrnamentSVG, CrestSVG } from "./DecorativeElements";
import { NameLogo } from "./NameLogo";
import { soundtrack } from "../services/soundtrack";

interface EnvelopeScreenProps {
  lang: Language;
  onOpenComplete: () => void;
}

type Stage =
  | "closed"
  | "seal-lift"
  | "flap-opening"
  | "card-extract"
  | "card-zoom"
  | "finished";

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({
  lang,
  onOpenComplete,
}) => {
  const [stage, setStage] = useState<Stage>("closed");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const t = I18N[lang];
  const isKm = lang === "km";

  // Pointer tilt physics
  const handlePointerMove = (e: React.PointerEvent) => {
    if (stage !== "closed") return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Tactile Hand-Crafted Opening Sequence
  const startOpening = () => {
    if (stage !== "closed") return;

    // Start audio synthesizer
    soundtrack.play();

    // 1. Seal pressed and lifted
    setStage("seal-lift");

    // 2. 3D Flap folds back 180°
    setTimeout(() => {
      setStage("flap-opening");
    }, 1000);

    // 3. Card slides up out of pocket
    setTimeout(() => {
      setStage("card-extract");
      try {
        confetti({
          particleCount: 50,
          spread: 65,
          origin: { y: 0.65 },
          colors: ["#cf9f45", "#fae7b4", "#deb260", "#f5efdd"],
          ticks: 200,
          gravity: 0.7,
        });
      } catch {}
    }, 2400);

    // 4. Card zooms to camera, envelope drops away
    setTimeout(() => {
      setStage("card-zoom");
    }, 4000);

    // 5. Complete gate dissolve into Cover Hero
    setTimeout(() => {
      setStage("finished");
      onOpenComplete();
    }, 5400);
  };

  if (stage === "finished") return null;

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="gate select-none cursor-pointer"
      role="dialog"
      aria-modal="true"
      onClick={stage === "closed" ? startOpening : undefined}
    >
      {/* Background Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_30%,_#4f5a26_0%,_#2a2f16_60%,_#1d2010_100%)] pointer-events-none" />

      {/* Floating Gold Dust Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute w-2 h-2 rounded-full bg-[#fbefc0] blur-[1px] top-1/4 left-1/5 animate-pulse" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#d9b15a] blur-[1px] top-2/3 right-1/4 animate-pulse delay-500" />
      </div>

      <div className="gate__stage">
        {/* Gate Invitation Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="gate__invite"
        >
          <div className="gate__kicker foil font-moul">{t.invitationPill}</div>
          <div className="gate__sub font-script">The Wedding Invitation</div>
        </motion.div>

        {/* ==============================================================
            ENVELOPE COMPONENT (.e2)
            ============================================================== */}
        <motion.div
          animate={{
            rotateY: tilt.x,
            rotateX: tilt.y,
            y: stage === "card-extract" ? 36 : stage === "card-zoom" ? 260 : 0,
            opacity: stage === "card-zoom" ? 0 : 1,
          }}
          transition={{
            rotateY: { type: "spring", damping: 15, stiffness: 100 },
            rotateX: { type: "spring", damping: 15, stiffness: 100 },
            y: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.8 },
          }}
          className="e2"
        >
          {/* Ground Soft Drop Shadow */}
          <div className="e2__ground" />

          {/* 3D Envelope Stage */}
          <div className="e2__stage">
            {/* LAYER 1: BACK PANEL (tex-olive) */}
            <div
              className="e2__back tex-olive"
              style={{ transform: "translateZ(-14px)" }}
            />

            {/* LAYER 2: THE INNER CARD */}
            <motion.div
              animate={{
                y:
                  stage === "card-extract"
                    ? -180
                    : stage === "card-zoom"
                      ? -110
                      : 0,
                rotateZ: stage === "card-extract" ? -2.5 : 0,
                scale: stage === "card-zoom" ? 1.6 : 1,
                opacity: stage === "card-zoom" ? 0.95 : 1,
              }}
              transition={{
                duration: stage === "card-zoom" ? 1.4 : 1.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="e2__card tex-cream"
              style={{
                transform: "translateZ(-2px)",
                transformOrigin: "bottom center",
              }}
            >
              {/* Card Inset Hairline Frame */}
              <div className="e2__card-frame" />

              {/* 4 Corner Ornaments */}
              <div className="absolute top-2 left-2 pointer-events-none opacity-80">
                <CornerOrnamentSVG position="top-left" size={36} />
              </div>
              <div className="absolute top-2 right-2 pointer-events-none opacity-80">
                <CornerOrnamentSVG position="top-right" size={36} />
              </div>
              <div className="absolute bottom-2 left-2 pointer-events-none opacity-80">
                <CornerOrnamentSVG position="bottom-left" size={36} />
              </div>
              <div className="absolute bottom-2 right-2 pointer-events-none opacity-80">
                <CornerOrnamentSVG position="bottom-right" size={36} />
              </div>

              {/* Card Content */}
              <div className="e2__card-inner">
                <span className="font-moul text-xs sm:text-sm text-[#8a6a2a] leading-relaxed">
                  {t.invitationPill}
                </span>

                {/* Monogram Logo */}
                <div className="scale-85 my-auto">
                  <NameLogo size="sm" showCrest={true} />
                </div>

                <div>
                  <span className="font-moul text-xs text-[#4f5a26] block mb-1">
                    {t.cordiallyInvite}
                  </span>
                  <span className="font-kh text-[11px] text-[#8a6a2a] tracking-widest block">
                    {isKm
                      ? WEDDING_DATA.date.gregorianKm
                      : WEDDING_DATA.date.gregorianEn}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* LAYER 3: FRONT POCKET PANELS */}
            <div
              className="e2__pocket"
              style={{ transform: "translateZ(6px)" }}
            >
              <div className="e2__pocket-l tex-olive" />
              <div className="e2__pocket-r tex-olive" />
              <div className="e2__pocket-b tex-olive" />

              {/* Pocket Gold Foil Date & Line */}
              <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none z-10">
                <span className="font-kh text-[11px] tracking-[0.2em] foil uppercase">
                  {WEDDING_DATA.date.dayKm} · {WEDDING_DATA.date.monthKm} ·{" "}
                  {WEDDING_DATA.date.yearKm}
                </span>
              </div>
            </div>

            {/* LAYER 4: 3D TOP FOLDING SCALLOPED FLAP */}
            <motion.div
              animate={{
                rotateX:
                  stage === "flap-opening" ||
                  stage === "card-extract" ||
                  stage === "card-zoom"
                    ? 180
                    : 0,
              }}
              transition={{
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="e2__flap"
              style={{
                zIndex:
                  stage === "flap-opening" ||
                  stage === "card-extract" ||
                  stage === "card-zoom"
                    ? -5 // Moves behind the card once opened
                    : 25,
              }}
            >
              {/* Flap Front (Closed View) */}
              <div
                className="e2__flap-front tex-olive"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 20%, 93% 36%, 86% 50%, 75% 68%, 62% 84%, 50% 100%, 38% 84%, 25% 68%, 14% 50%, 7% 36%, 0 20%)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
                  transform: "translateZ(8px)",
                }}
              >
                {/* Scalloped Gold Foil Border */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="scallopFoil"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#9c7124" />
                      <stop offset="35%" stopColor="#fbefc0" />
                      <stop offset="70%" stopColor="#d9b15a" />
                      <stop offset="100%" stopColor="#9c7124" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 3 2 L 97 2 L 97 18 Q 85 55, 50 96 Q 15 55, 3 18 Z"
                    stroke="url(#scallopFoil)"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                    fill="none"
                    opacity="0.85"
                  />
                </svg>

                {/* Monogram on Flap */}
                <div className="scale-75 origin-top mt-1">
                  <NameLogo size="xs" showCrest={true} />
                </div>
              </div>

              {/* Flap Back (Opened View) */}
              <div
                className="e2__flap-back tex-cream"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 20%, 93% 36%, 86% 50%, 75% 68%, 62% 84%, 50% 100%, 38% 84%, 25% 68%, 14% 50%, 7% 36%, 0 20%)",
                  transform: "rotateX(180deg) translateZ(-8px)",
                }}
              >
                <div className="opacity-50 scale-75">
                  <CrestSVG size={40} />
                </div>
              </div>
            </motion.div>

            {/* LAYER 5: WAX SEAL BUTTON */}
            <AnimatePresence>
              {stage !== "card-zoom" && (
                <motion.button
                  type="button"
                  aria-label="Open the wedding invitation / បើកធៀប"
                  onClick={startOpening}
                  animate={{
                    scale: stage === "seal-lift" ? 1.15 : 1,
                    y:
                      stage === "seal-lift" ||
                      stage === "flap-opening" ||
                      stage === "card-extract"
                        ? -80
                        : 0,
                    x:
                      stage === "flap-opening" || stage === "card-extract"
                        ? 120
                        : 0,
                    opacity:
                      stage === "flap-opening" || stage === "card-extract"
                        ? 0
                        : 1,
                  }}
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="e2__seal pointer-events-auto"
                >
                  <div className="seal-pulse" />
                  <WaxSealSVG size={88} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Gate Tap Hint */}
        {stage === "closed" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="gate__hint"
          >
            <span>{t.openEnvelopePrompt}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};
