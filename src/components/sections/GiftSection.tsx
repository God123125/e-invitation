import React, { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { WEDDING_DATA } from "../../data/wedding";
import { I18N, Language } from "../../data/i18n";
import { CrestSVG, DividerOrnamentSVG } from "../DecorativeElements";

interface GiftSectionProps {
  lang: Language;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ lang }) => {
  const t = I18N[lang];
  const { aba, acleda } = WEDDING_DATA.gift;
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleSaveQr = (
    bankName: string,
    accountName: string,
    accountNo: string,
  ) => {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 760;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#f5efdd";
    ctx.fillRect(0, 0, 600, 760);

    // Decorative Olive Header
    ctx.fillStyle = "#2a2f16";
    ctx.fillRect(24, 24, 552, 100);

    ctx.fillStyle = "#fbefc0";
    ctx.font = "bold 26px serif";
    ctx.textAlign = "center";
    ctx.fillText("សិរីសួស្តីអាពាហ៍ពិពាហ៍", 300, 68);
    ctx.font = "18px sans-serif";
    ctx.fillText(`${bankName} - ចំណងដៃអាពាហ៍ពិពាហ៍`, 300, 100);

    // QR Box
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(100, 155, 400, 400);
    ctx.strokeStyle = "#d9b15a";
    ctx.lineWidth = 4;
    ctx.strokeRect(100, 155, 400, 400);

    // Matrix
    ctx.fillStyle = "#1d2010";
    ctx.fillRect(130, 185, 70, 70);
    ctx.clearRect(145, 200, 40, 40);
    ctx.fillRect(155, 210, 20, 20);

    ctx.fillRect(400, 185, 70, 70);
    ctx.clearRect(415, 200, 40, 40);
    ctx.fillRect(425, 210, 20, 20);

    ctx.fillRect(130, 455, 70, 70);
    ctx.clearRect(145, 470, 40, 40);
    ctx.fillRect(155, 480, 20, 20);

    for (let r = 0; r < 14; r++) {
      for (let c = 0; c < 14; c++) {
        if ((r + c) % 3 === 0 || (r * c) % 5 === 0) {
          ctx.fillRect(220 + c * 12, 225 + r * 14, 8, 8);
        }
      }
    }

    // Account Details
    ctx.fillStyle = "#2a2f16";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText(accountName, 300, 605);

    ctx.fillStyle = "#9c7124";
    ctx.font = "bold 28px monospace";
    ctx.fillText(accountNo, 300, 655);

    ctx.fillStyle = "#4f5a26";
    ctx.font = "16px sans-serif";
    ctx.fillText("សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះពរជ័យ!", 300, 708);

    const link = document.createElement("a");
    link.download = `KHQR-${bankName.replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <section
      id="gift"
      className="chapter gift bg-[#1d2010] text-[#f5efdd] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Chapter Header */}
        <div className="chapter__head">
          <CrestSVG size={46} className="mx-auto mb-2" />
          <span className="font-serif italic text-xs sm:text-sm text-[#d9b15a] tracking-[0.2em] uppercase block">
            Tokens of Blessing
          </span>
          <h2 className="font-moul text-xl sm:text-2xl md:text-3xl foil">
            {t.giftHeading}
          </h2>
          <p className="font-kh text-xs sm:text-sm text-[#f5efdd]/80 mt-2 max-w-lg mx-auto leading-relaxed">
            {t.giftSub}
          </p>
          <div className="mt-3 opacity-70 flex justify-center">
            <DividerOrnamentSVG width={180} />
          </div>
        </div>

        {/* 2-Column Always-Visible Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* ABA KHQR CARD */}
          <div className="bg-[#2a2f16]/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#d9b15a]/40 shadow-2xl flex flex-col items-center text-center relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004e7c] text-white text-xs font-bold mb-4 shadow-sm">
              <span>ABA KHQR</span>
              <span className="text-[10px] text-blue-200">
                ({aba.currency})
              </span>
            </div>

            <div className="relative w-52 h-52 bg-white rounded-xl p-3 border-2 border-[#d9b15a] shadow-inner flex flex-col items-center justify-center mb-5">
              <div className="w-full bg-[#e31837] py-0.5 rounded-t text-center mb-1">
                <span className="text-[11px] font-black text-white tracking-widest uppercase">
                  KHQR
                </span>
              </div>

              <svg viewBox="0 0 100 100" className="w-36 h-36" fill="#1d2010">
                <rect x="5" y="5" width="26" height="26" rx="4" />
                <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="13" width="10" height="10" />

                <rect x="69" y="5" width="26" height="26" rx="4" />
                <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="77" y="13" width="10" height="10" />

                <rect x="5" y="69" width="26" height="26" rx="4" />
                <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="77" width="10" height="10" />

                <rect x="36" y="8" width="6" height="6" />
                <rect x="46" y="14" width="6" height="6" />
                <rect x="56" y="8" width="6" height="6" />
                <rect x="36" y="24" width="6" height="6" />
                <rect x="46" y="30" width="6" height="6" />
                <rect x="8" y="38" width="6" height="6" />
                <rect x="22" y="44" width="6" height="6" />
                <rect x="38" y="48" width="6" height="6" />
                <rect x="52" y="42" width="6" height="6" />
                <rect x="68" y="38" width="6" height="6" />
                <rect x="84" y="46" width="6" height="6" />
                <rect x="38" y="62" width="6" height="6" />
                <rect x="48" y="72" width="6" height="6" />
                <rect x="62" y="66" width="6" height="6" />
                <rect x="76" y="78" width="6" height="6" />
                <rect x="86" y="68" width="6" height="6" />
                <rect x="44" y="86" width="6" height="6" />
                <rect x="58" y="86" width="6" height="6" />

                <circle cx="50" cy="50" r="11" fill="white" />
                <circle cx="50" cy="50" r="9" fill="#004e7c" />
                <path
                  d="M50 54 L47 51 C45 49 43 47 45 45 C47 43 49 45 50 46 C51 45 53 43 55 45 C57 47 55 49 53 51 Z"
                  fill="white"
                />
              </svg>

              <span className="text-[10px] font-bold text-gray-500 mt-1">
                SCAN TO BLESS
              </span>
            </div>

            <h4 className="font-kh font-bold text-sm text-[#fbefc0] mb-1">
              {aba.accountName}
            </h4>

            <div className="flex items-center gap-2 font-mono text-base font-bold text-[#fbefc0] bg-[#1d2010]/80 px-4 py-1.5 rounded-lg mb-5 border border-[#d9b15a]/30">
              <span>{aba.accountNumber}</span>
              <button
                type="button"
                onClick={() => handleCopy(aba.accountNumber, "aba")}
                className="text-[#d9b15a] hover:text-[#fbefc0] transition-colors"
                title={t.copyAcc}
              >
                {copiedAccount === "aba" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                handleSaveQr("ABA BANK", aba.accountName, aba.accountNumber)
              }
              className="mt-auto inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#3a4120] text-[#fbefc0] border border-[#d9b15a]/60 text-xs font-semibold hover:bg-[#4f5a26] transition-all shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.saveQr}</span>
            </button>
          </div>

          {/* ACLEDA KHQR CARD */}
          <div className="bg-[#2a2f16]/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#d9b15a]/40 shadow-2xl flex flex-col items-center text-center relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b365d] text-white text-xs font-bold mb-4 shadow-sm">
              <span>ACLEDA KHQR</span>
              <span className="text-[10px] text-blue-200">
                ({acleda.currency})
              </span>
            </div>

            <div className="relative w-52 h-52 bg-white rounded-xl p-3 border-2 border-[#d9b15a] shadow-inner flex flex-col items-center justify-center mb-5">
              <div className="w-full bg-[#e31837] py-0.5 rounded-t text-center mb-1">
                <span className="text-[11px] font-black text-white tracking-widest uppercase">
                  KHQR
                </span>
              </div>

              <svg viewBox="0 0 100 100" className="w-36 h-36" fill="#1d2010">
                <rect x="5" y="5" width="26" height="26" rx="4" />
                <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="13" width="10" height="10" />

                <rect x="69" y="5" width="26" height="26" rx="4" />
                <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="77" y="13" width="10" height="10" />

                <rect x="5" y="69" width="26" height="26" rx="4" />
                <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="77" width="10" height="10" />

                <rect x="36" y="8" width="6" height="6" />
                <rect x="50" y="16" width="6" height="6" />
                <rect x="38" y="26" width="6" height="6" />
                <rect x="54" y="28" width="6" height="6" />
                <rect x="12" y="42" width="6" height="6" />
                <rect x="26" y="46" width="6" height="6" />
                <rect x="42" y="46" width="6" height="6" />
                <rect x="58" y="40" width="6" height="6" />
                <rect x="72" y="44" width="6" height="6" />
                <rect x="88" y="40" width="6" height="6" />
                <rect x="40" y="60" width="6" height="6" />
                <rect x="52" y="66" width="6" height="6" />
                <rect x="66" y="74" width="6" height="6" />
                <rect x="80" y="62" width="6" height="6" />
                <rect x="48" y="82" width="6" height="6" />
                <rect x="60" y="88" width="6" height="6" />

                <circle cx="50" cy="50" r="11" fill="white" />
                <circle cx="50" cy="50" r="9" fill="#1b365d" />
                <path
                  d="M50 54 L47 51 C45 49 43 47 45 45 C47 43 49 45 50 46 C51 45 53 43 55 45 C57 47 55 49 53 51 Z"
                  fill="white"
                />
              </svg>

              <span className="text-[10px] font-bold text-gray-500 mt-1">
                SCAN TO BLESS
              </span>
            </div>

            <h4 className="font-kh font-bold text-sm text-[#fbefc0] mb-1">
              {acleda.accountName}
            </h4>

            <div className="flex items-center gap-2 font-mono text-base font-bold text-[#fbefc0] bg-[#1d2010]/80 px-4 py-1.5 rounded-lg mb-5 border border-[#d9b15a]/30">
              <span>{acleda.accountNumber}</span>
              <button
                type="button"
                onClick={() => handleCopy(acleda.accountNumber, "acleda")}
                className="text-[#d9b15a] hover:text-[#fbefc0] transition-colors"
                title={t.copyAcc}
              >
                {copiedAccount === "acleda" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                handleSaveQr(
                  "ACLEDA BANK",
                  acleda.accountName,
                  acleda.accountNumber,
                )
              }
              className="mt-auto inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#3a4120] text-[#fbefc0] border border-[#d9b15a]/60 text-xs font-semibold hover:bg-[#4f5a26] transition-all shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.saveQr}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
