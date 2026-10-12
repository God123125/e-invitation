import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { I18N, Language } from "../../data/i18n";
import { CrestSVG, DividerOrnamentSVG } from "../DecorativeElements";
import { WEDDING_DATA } from "../../data/wedding";

interface GallerySectionProps {
  lang: Language;
}

interface PhotoCard {
  id: string;
  titleKm: string;
  titleEn: string;
  thumbSrc: string;
  fullSrc: string;
  aspect: "portrait" | "landscape" | "square";
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null,
  );
  const t = I18N[lang];
  const isKm = lang === "km";

  const photos: PhotoCard[] = [
    {
      id: "g1",
      titleKm: "ទិដ្ឋភាពមុនថ្ងៃមង្គល",
      titleEn: "Moments Before Vows",
      thumbSrc: "/img/gallery/pre-wedding1-thumb.jpg",
      fullSrc: "/img/gallery/pre-wedding1.jpg",
      aspect: "portrait",
    },
    {
      id: "g2",
      titleKm: "ស្នាមញញឹមនៃក្តីស្រលាញ់",
      titleEn: "Smile of Pure Love",
      thumbSrc: "/img/gallery/pre-wedding2-thumb.jpg",
      fullSrc: "/img/gallery/pre-wedding2.jpg",
      aspect: "portrait",
    },
    {
      id: "g3",
      titleKm: "ដំណើររួមគ្នាក្នុងជីវិត",
      titleEn: "Walking Together in Life",
      thumbSrc: "/img/gallery/pre-wedding3-thumb.jpg",
      fullSrc: "/img/gallery/pre-wedding3.jpg",
      aspect: "portrait",
    },
    {
      id: "g4",
      titleKm: "ពេលវេលាដ៏មានតម្លៃ",
      titleEn: "Precious Moments",
      thumbSrc: "/img/gallery/pre-wedding4-thumb.jpg",
      fullSrc: "/img/gallery/pre-wedding4.jpg",
      aspect: "portrait",
    },
    {
      id: "g5",
      titleKm: "ភាពកក់ក្តៅក្នុងបេះដូង",
      titleEn: "Warmth of Two Hearts",
      thumbSrc: "/img/gallery/pre-wedding5-thumb.jpg",
      fullSrc: "/img/gallery/pre-wedding5.jpg",
      aspect: "portrait",
    },
    {
      id: "g6",
      titleKm: "អនុស្សាវរីយ៍ផ្អែមល្ហែម",
      titleEn: "Sweet Memories",
      thumbSrc: "/img/gallery/pre-wedding6-thumb.jpg",
      fullSrc: "/img/gallery/pre-wedding6.jpg",
      aspect: "portrait",
    },
    {
      id: "g7",
      titleKm: "ដំណើរនៃក្តីស្រឡាញ់",
      titleEn: "The Journey of Love",
      thumbSrc: "/img/gallery/pre-wedding7-thumb.jpg",
      fullSrc: "/img/gallery/pre-wedding7.jpg",
      aspect: "portrait",
    },
    {
      id: "g8",
      titleKm: "សេចក្តីស្ងប់និងសុភមង្គល",
      titleEn: "Peace & Eternal Happiness",
      thumbSrc: "/img/gallery/pre-wedding8-thumb.jpg",
      fullSrc: "/img/gallery/pre-wedding8.jpg",
      aspect: "portrait",
    },
    {
      id: "g9",
      titleKm: "ក្តីសង្ឃឹមនិងអនាគត",
      titleEn: "Hope & Endless Future",
      thumbSrc: "/img/gallery/pre-wedding9-thumb.jpg",
      fullSrc: "/img/gallery/pre-wedding9.jpg",
      aspect: "portrait",
    },
    {
      id: "g10",
      titleKm: "ក្តីស្រឡាញ់ដែលមិនប្រែប្រួល",
      titleEn: "Unconditional Love",
      thumbSrc: "/img/gallery/pre-wedding10-thumb.jpg",
      fullSrc: "/img/gallery/pre-wedding10.jpg",
      aspect: "portrait",
    },
    {
      id: "g11",
      titleKm: "ថ្ងៃស្អែកដ៏ស្រស់បំព្រង",
      titleEn: "A Beautiful Tomorrow",
      thumbSrc: "/img/gallery/pre-wedding11-thumb.jpg",
      fullSrc: "/img/gallery/pre-wedding11.jpg",
      aspect: "portrait",
    },
  ];

  return (
    <section
      id="gallery"
      className="relative w-full py-20 px-4 sm:px-6 bg-[#162118] paper-texture-olive overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-serif italic text-xs text-[#e0a995] uppercase tracking-widest block mb-1">
            {t.galleryHeading}
          </span>
          <h2 className="font-moul text-xl sm:text-2xl md:text-3xl g-foil-text tracking-wide">
            {t.gallerySub}
          </h2>
          <div className="mt-3 opacity-70 flex justify-center">
            <DividerOrnamentSVG width={180} />
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              onClick={() => setSelectedPhotoIndex(idx)}
              className="group relative rounded-xl overflow-hidden border border-[#e0a995]/40 shadow-lg cursor-pointer bg-[#220e0e] transition-transform duration-300 hover:scale-[1.02] hover:border-[#f8e1d6]"
              style={{
                aspectRatio: item.aspect === "portrait" ? "2 / 3" : "3 / 2",
              }}
            >
              <img
                src={item.thumbSrc}
                alt={item.titleKm}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <p className="font-kh font-semibold text-xs text-[#f8e1d6]">
                  {isKm ? item.titleKm : item.titleEn}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-[#e0a995]">
                  <Eye className="w-3 h-3" />
                  <span>{isKm ? "មើលរូបភាព" : "View"}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 sm:p-8"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <div className="w-full flex items-center justify-between max-w-4xl z-20">
              <span className="font-kantumruy text-xs text-[#e0a995]">
                {selectedPhotoIndex + 1} / {photos.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex(null);
                }}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close photo viewer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div
              className="relative max-w-4xl w-full my-auto flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedPhotoIndex].fullSrc}
                alt={photos[selectedPhotoIndex].titleKm}
                className="max-h-[75vh] max-w-full rounded-xl border border-[#e0a995]/60 shadow-2xl object-contain"
                decoding="async"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex((prev) =>
                    prev !== null
                      ? prev === 0
                        ? photos.length - 1
                        : prev - 1
                      : 0,
                  );
                }}
                className="absolute left-[-12px] sm:left-[-24px] top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-[#1b261d] text-[#f8e1d6] border border-[#e0a995] hover:scale-110 transition-transform"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex((prev) =>
                    prev !== null
                      ? prev === photos.length - 1
                        ? 0
                        : prev + 1
                      : 0,
                  );
                }}
                className="absolute right-[-12px] sm:right-[-24px] top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-[#1b261d] text-[#f8e1d6] border border-[#e0a995] hover:scale-110 transition-transform"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center z-20">
              <p className="font-kh text-sm text-[#f8e1d6]">
                {isKm
                  ? photos[selectedPhotoIndex].titleKm
                  : photos[selectedPhotoIndex].titleEn}
              </p>
              <span className="font-cormorant italic text-xs text-[#e0a995]">
                {WEDDING_DATA.couple.groom.nameEn} &amp;{" "}
                {WEDDING_DATA.couple.bride.nameEn}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
