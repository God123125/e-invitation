import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toKhmerNumerals } from "../data/i18n";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        setCount(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 650);
        }, 300);
      } else {
        setCount(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          className="preloader select-none"
        >
          {/* Background Ambient Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3a4120_0%,_#1d2010_100%)]" />

          <div className="preloader__inner relative z-10">
            {/* Animated Lotus Sacred Motif */}
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              <defs>
                <linearGradient
                  id="lotusGold"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#9c7124" />
                  <stop offset="35%" stopColor="#d9b15a" />
                  <stop offset="60%" stopColor="#fbefc0" />
                  <stop offset="100%" stopColor="#9c7124" />
                </linearGradient>
              </defs>
              <motion.path
                d="M50 15 C50 15, 65 35, 50 68 C35 35, 50 15, 50 15 Z"
                stroke="url(#lotusGold)"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.path
                d="M50 68 C40 50, 20 45, 24 60 C28 72, 42 70, 50 68 Z"
                stroke="url(#lotusGold)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
              />
              <motion.path
                d="M50 68 C60 50, 80 45, 76 60 C72 72, 58 70, 50 68 Z"
                stroke="url(#lotusGold)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
              />
              <circle cx="50" cy="14" r="2.5" fill="url(#lotusGold)" />
            </svg>

            {/* Counter in Khmer Numerals ០ to ១០០ */}
            <div className="preloader__count font-moul tracking-wider">
              {toKhmerNumerals(count)}
            </div>

            <p className="font-serif italic text-xs tracking-[0.25em] text-[#d9b15a] uppercase">
              Marady &amp; Socheata
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
