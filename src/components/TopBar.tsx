import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { NameLogo } from "./NameLogo";
import { Language, I18N } from "../data/i18n";
import { soundtrack } from "../services/soundtrack";

interface TopBarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ lang, onLanguageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const t = I18N[lang];

  useEffect(() => {
    const unsub = soundtrack.subscribe((playing) => {
      setIsPlaying(playing);
    });

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
      setIsScrolled(winScroll > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleSound = () => {
    soundtrack.toggle();
  };

  const handleToggleLang = () => {
    onLanguageChange(lang === "km" ? "en" : "km");
  };

  return (
    <>
      {/* Top Vine Scroll Progress Indicator */}
      <div className="vine-progress" aria-hidden="true">
        <span style={{ height: `${scrollProgress}%` }} />
      </div>

      {/* HUD Header */}
      <header className={`hud ${isScrolled ? "scrolled" : ""}`}>
        {/* Monogram Top-Left */}
        <a
          href="#cover"
          className="hud__mono group block"
          aria-label="Top of invitation"
        >
          <div className="origin-left">
            <NameLogo size="sm" showCrest={false} />
          </div>
        </a>

        {/* Right HUD Controls */}
        <div className="hud__right">
          {/* Language Toggle Chip: ខ្មែរ / EN */}
          <button
            id="lang-toggle"
            type="button"
            onClick={handleToggleLang}
            className="chip font-kh font-semibold"
            aria-label="Switch language between Khmer and English"
          >
            {lang === "km" ? (
              <span>
                <b className="text-[#f8e1d6]">ខ្មែរ</b> / EN
              </span>
            ) : (
              <span>
                ខ្មែរ / <b className="text-[#f8e1d6]">EN</b>
              </span>
            )}
          </button>

          {/* Music Toggle Chip with Animated Sound Bars */}
          <button
            id="music-toggle"
            type="button"
            onClick={handleToggleSound}
            aria-pressed={isPlaying}
            aria-label={
              isPlaying ? "Pause background music" : "Play background music"
            }
            className={`chip ${isPlaying ? "is-playing" : ""}`}
          >
            <span className="bars" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
          </button>
        </div>
      </header>

      {/* Floating Bottom Location / Venue Pill Button */}
      <a
        href="#venue"
        className="rsvp-pill"
        aria-label="Jump to celebration venue"
      >
        <MapPin className="w-4 h-4 text-[#e0a995]" />
        <span>
          {lang === "km" ? "ទីតាំងប្រារព្ធពិធី" : "Celebration Venue"}
        </span>
      </a>
    </>
  );
};
