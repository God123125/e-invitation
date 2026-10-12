import React from "react";
import { motion } from "motion/react";
import { MapPin, Navigation, Calendar, ExternalLink } from "lucide-react";
import { WEDDING_DATA } from "../../data/wedding";
import { I18N, Language } from "../../data/i18n";
import { CrestSVG, DividerOrnamentSVG } from "../DecorativeElements";

interface VenueSectionProps {
  lang: Language;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ lang }) => {
  const t = I18N[lang];
  const isKm = lang === "km";
  const { venue, date, couple } = WEDDING_DATA;

  // Generate downloadable iCalendar (.ics) file
  const handleDownloadIcs = () => {
    const startTime = "20261204T003000Z"; // 07:30 AM UTC+7
    const endTime = "20261204T150000Z"; // 10:00 PM UTC+7
    const summary = `អាពាហ៍ពិពាហ៍ ${couple.groom.shortNameKm} & ${couple.bride.shortNameKm} (${couple.groom.shortNameEn} & ${couple.bride.shortNameEn})`;
    const description = `ពិធីសិរីសួស្តីអាពាហ៍ពិពាហ៍ អេង ម៉ារ៉ាឌី និង កៅ ហែមសុជាតា\\nទីតាំង: ${venue.nameKm}\\nផែនទី: ${venue.googleMapsUrl}`;
    const location = `${venue.nameKm}, Coordinates: ${venue.coordinates.lat},${venue.coordinates.lng}`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Khmer Wedding Invitation//Marady & Socheata//KM",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:wedding-marady-socheata-${Date.now()}@wedding.invitation`,
      `DTSTAMP:${startTime}`,
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "wedding-marady-socheata-2026.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="venue"
      className="chapter venue bg-[#2a2f16] text-[#f5efdd] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Chapter Header */}
        <div className="chapter__head">
          <CrestSVG size={48} className="mx-auto mb-2" />
          <span className="font-serif italic text-xs sm:text-sm text-[#d9b15a] tracking-[0.2em] uppercase block">
            Celebration Venue
          </span>
          <h2 className="font-moul text-xl sm:text-2xl md:text-3xl foil">
            {t.venueHeading}
          </h2>
          <p className="font-kh text-xs sm:text-sm text-[#f5efdd]/80 mt-1">
            {t.venueSub}
          </p>
          <div className="mt-3 opacity-70 flex justify-center">
            <DividerOrnamentSVG width={180} />
          </div>
        </div>

        {/* Venue Information Card */}
        <div className="bg-[#1d2010]/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#d9b15a]/40 shadow-2xl text-center mb-8 relative">
          <div className="inline-flex items-center gap-2 text-[#d9b15a] mb-2">
            <MapPin className="w-5 h-5 text-[#fbefc0]" />
            <span className="font-kh font-semibold text-xs tracking-wider uppercase text-[#d9b15a]">
              {t.atVenue}
            </span>
          </div>

          <h3 className="font-moul text-lg sm:text-2xl text-[#fbefc0] mb-1">
            {isKm ? venue.nameKm : venue.nameEn}
          </h3>

          <p className="font-kh text-sm text-[#f5efdd]/85 mb-6">
            {isKm ? venue.addressKm : venue.addressEn}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3a4120] text-[#fbefc0] border border-[#d9b15a]/60 hover:bg-[#4f5a26] transition-all font-kh text-xs sm:text-sm font-semibold shadow-md active:scale-95"
            >
              <Navigation className="w-4 h-4 text-[#fbefc0]" />
              <span>{t.openGoogleMaps}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <button
              type="button"
              onClick={handleDownloadIcs}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d9b15a] text-[#1d2010] border border-[#fbefc0] hover:bg-[#fbefc0] transition-all font-kh text-xs sm:text-sm font-bold shadow-md active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#1d2010]" />
              <span>{t.addToCalendar}</span>
            </button>
          </div>
        </div>

        {/* Embedded Google Map iframe */}
        <div className="rounded-2xl overflow-hidden border-2 border-[#d9b15a]/50 shadow-2xl h-[340px] sm:h-[420px] w-full relative bg-[#120f0b]">
          <iframe
            title="Wedding Venue Google Maps"
            src={venue.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter saturate-[0.85] contrast-[1.05]"
          />
        </div>
      </div>
    </section>
  );
};
