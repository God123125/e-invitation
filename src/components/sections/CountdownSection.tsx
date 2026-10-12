import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { WEDDING_DATA } from "../../data/wedding";
import { I18N, Language, toKhmerNumerals } from "../../data/i18n";
import { DividerOrnamentSVG } from "../DecorativeElements";

interface CountdownSectionProps {
  lang: Language;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ lang }) => {
  const t = I18N[lang];
  const isKm = lang === "km";
  const targetDate = WEDDING_DATA.date.dateObj.getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const formatDigit = (num: number) => {
    const padded = String(num).padStart(2, "0");
    return isKm ? toKhmerNumerals(padded) : padded;
  };

  return (
    <section
      id="countdown"
      className="chapter countdown bg-[#1d2010] text-[#f5efdd] overflow-hidden relative"
    >
      {/* Exact Marquee Background Track from Reference */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          <span>{t.blessingMarquee}</span>
          <span>{t.blessingMarquee}</span>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Header */}
        <span className="font-serif italic text-xs sm:text-sm text-[#d9b15a] tracking-[0.2em] uppercase block mb-1">
          Awaiting The Auspicious Moment
        </span>
        <h2 className="font-moul text-xl sm:text-2xl md:text-3xl foil mb-3">
          {t.countdownTitle}
        </h2>
        <div className="opacity-70 mb-8 flex justify-center">
          <DividerOrnamentSVG width={180} />
        </div>

        {/* 4 Countdown Boxes */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
          {/* Days */}
          <div className="bg-[#2a2f16]/90 backdrop-blur-sm rounded-xl p-3 sm:p-5 border border-[#d9b15a]/45 shadow-xl flex flex-col items-center">
            <span className="font-kh text-2xl sm:text-4xl md:text-5xl font-bold foil tabular-nums">
              {formatDigit(timeLeft.days)}
            </span>
            <span className="font-kh text-[11px] sm:text-xs text-[#d9b15a] mt-1 uppercase tracking-wider font-semibold">
              {t.countdownDays}
            </span>
          </div>

          {/* Hours */}
          <div className="bg-[#2a2f16]/90 backdrop-blur-sm rounded-xl p-3 sm:p-5 border border-[#d9b15a]/45 shadow-xl flex flex-col items-center">
            <span className="font-kh text-2xl sm:text-4xl md:text-5xl font-bold foil tabular-nums">
              {formatDigit(timeLeft.hours)}
            </span>
            <span className="font-kh text-[11px] sm:text-xs text-[#d9b15a] mt-1 uppercase tracking-wider font-semibold">
              {t.countdownHours}
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-[#2a2f16]/90 backdrop-blur-sm rounded-xl p-3 sm:p-5 border border-[#d9b15a]/45 shadow-xl flex flex-col items-center">
            <span className="font-kh text-2xl sm:text-4xl md:text-5xl font-bold foil tabular-nums">
              {formatDigit(timeLeft.minutes)}
            </span>
            <span className="font-kh text-[11px] sm:text-xs text-[#d9b15a] mt-1 uppercase tracking-wider font-semibold">
              {t.countdownMinutes}
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-[#2a2f16]/90 backdrop-blur-sm rounded-xl p-3 sm:p-5 border border-[#d9b15a]/45 shadow-xl flex flex-col items-center">
            <span className="font-kh text-2xl sm:text-4xl md:text-5xl font-bold foil tabular-nums">
              {formatDigit(timeLeft.seconds)}
            </span>
            <span className="font-kh text-[11px] sm:text-xs text-[#d9b15a] mt-1 uppercase tracking-wider font-semibold">
              {t.countdownSeconds}
            </span>
          </div>
        </div>

        {/* Date Confirmation */}
        <p className="mt-8 font-kh text-xs sm:text-sm text-[#f5efdd]/85">
          {isKm ? WEDDING_DATA.date.gregorianKm : WEDDING_DATA.date.gregorianEn}
        </p>
      </div>
    </section>
  );
};
