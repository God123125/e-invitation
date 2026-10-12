import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, MessageCircle, Share2, Copy, Check } from "lucide-react";
import { WEDDING_DATA } from "../../data/wedding";
import { I18N, Language } from "../../data/i18n";
import { NameLogo } from "../NameLogo";
import { CrestSVG, DividerOrnamentSVG } from "../DecorativeElements";

interface ThankYouSectionProps {
  lang: Language;
}

export const ThankYouSection: React.FC<ThankYouSectionProps> = ({ lang }) => {
  const t = I18N[lang];
  const [copiedLink, setCopiedLink] = useState(false);

  const weddingUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://wedding.invitation";
  const shareText = `សិរីសួស្តីអាពាហ៍ពិពាហ៍ អេង ម៉ារ៉ាឌី & កៅ ហែមសុជាតា - ${WEDDING_DATA.date.gregorianKm}`;

  const handleShareTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(weddingUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleShareMessenger = () => {
    const url = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(weddingUrl)}&app_id=2914944191950478&redirect_uri=${encodeURIComponent(weddingUrl)}`;
    window.open(url, "_blank");
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(weddingUrl)}`;
    window.open(url, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(weddingUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section
      id="finale"
      className="chapter finale bg-[#120f0b] text-[#f5efdd] overflow-hidden"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* 7 Sacred Lit Candles Matching Reference finale__candles */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col items-center"
            >
              {/* Animated Flame */}
              <div className="w-3 h-5 rounded-full bg-gradient-to-t from-[#ffb65c] via-[#ffdf88] to-white animate-pulse shadow-[0_0_12px_#ffb65c]" />
              {/* Candle Body */}
              <div className="w-2.5 h-11 bg-gradient-to-r from-[#e9dfc6] via-[#fff7e6] to-[#cfc3a5] rounded-t-sm shadow-sm" />
            </motion.div>
          ))}
        </div>

        <CrestSVG size={48} className="mb-2" />

        {/* Heading: សូមអរគុណ */}
        <h2 className="font-moul text-2xl sm:text-3xl md:text-4xl foil tracking-wide mb-3">
          {t.thankYouHeading}
        </h2>

        <p className="font-serif italic text-base sm:text-lg text-[#d9b15a] mb-4">
          With Sincere Gratitude &amp; Appreciation
        </p>

        <p className="font-kh text-xs sm:text-sm text-[#f5efdd]/85 max-w-lg leading-[2.1] mb-8">
          {t.thankYouSub}
        </p>

        {/* Signature Name Logo */}
        <div className="my-3">
          <NameLogo size="md" showCrest={false} />
        </div>

        <div className="my-5 opacity-70 flex justify-center">
          <DividerOrnamentSVG width={200} />
        </div>

        {/* Social Share Buttons */}
        <div className="w-full max-w-md my-6">
          <h3 className="font-kh font-semibold text-xs text-[#d9b15a] uppercase tracking-wider mb-4">
            {t.shareHeading}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {/* Telegram */}
            <button
              type="button"
              onClick={handleShareTelegram}
              className="flex items-center justify-center gap-2 p-3 rounded-full bg-[#229ED9]/15 border border-[#229ED9]/40 hover:bg-[#229ED9]/30 text-white transition-all text-xs font-kh shadow-sm active:scale-95"
            >
              <Send className="w-4 h-4 text-[#229ED9]" />
              <span>{t.shareTelegram}</span>
            </button>

            {/* Messenger */}
            <button
              type="button"
              onClick={handleShareMessenger}
              className="flex items-center justify-center gap-2 p-3 rounded-full bg-[#00B2FF]/15 border border-[#00B2FF]/40 hover:bg-[#00B2FF]/30 text-white transition-all text-xs font-kh shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#00B2FF]" />
              <span>{t.shareMessenger}</span>
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={handleShareFacebook}
              className="flex items-center justify-center gap-2 p-3 rounded-full bg-[#1877F2]/15 border border-[#1877F2]/40 hover:bg-[#1877F2]/30 text-white transition-all text-xs font-kh shadow-sm active:scale-95"
            >
              <Share2 className="w-4 h-4 text-[#1877F2]" />
              <span>{t.shareFacebook}</span>
            </button>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 p-3 rounded-full bg-[#d9b15a]/15 border border-[#d9b15a]/50 hover:bg-[#d9b15a]/30 text-[#fbefc0] transition-all text-xs font-kh shadow-sm active:scale-95"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{t.linkCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#d9b15a]" />
                  <span>{t.copyLink}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Inspired Credit Matching Reference Site */}
        <div className="mt-14 pt-8 border-t border-[#3a4120]/60 w-full text-center">
          <p className="font-serif text-xs sm:text-sm text-[#d9b15a]/80">
            Design inspired by{" "}
            <a
              href="https://somethphay.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#fbefc0] hover:underline font-semibold"
            >
              Someth Phay · somethphay.me
            </a>
          </p>
          <p className="font-kh text-[10px] text-[#f5efdd]/50 mt-1">
            {WEDDING_DATA.couple.groom.shortNameKm} &amp;{" "}
            {WEDDING_DATA.couple.bride.shortNameKm} ·{" "}
            {WEDDING_DATA.date.gregorianKm}
          </p>
        </div>
      </div>
    </section>
  );
};
