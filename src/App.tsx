/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { WEDDING_DATA } from "./data/wedding";
import { I18N, Language, toKhmerNumerals } from "./data/i18n";
import {
  ld,
  ud,
  fd,
  td,
  nd,
  ad,
  od,
  Ru,
  Vu,
  Hu,
  Wu,
  Uu,
  Ku,
  sd,
} from "./services/referenceOrnaments";
import { soundtrack } from "./services/soundtrack";

export default function App() {
  const [lang, setLang] = useState<Language>("km");
  const [isPlaying, setIsPlaying] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const t = I18N[lang];
  const isKm = lang === "km";
  const { groom, bride } = WEDDING_DATA.couple;
  const { date, venue, programmes, loveStory, gift } = WEDDING_DATA;

  // Gallery items matching reference
  const galleryPhotos = [
    { src: "/img/pre-wedding1.jpg", caption: "ម៉ារ៉ាឌី & សុជាតា" },
    { src: "/img/pre-wedding2.jpg", caption: "ម៉ារ៉ាឌី & សុជាតា" },
    { src: "/img/pre-wedding3.jpg", caption: "ម៉ារ៉ាឌី & សុជាតា" },
    { src: "/img/pre-wedding4.jpg", caption: "ម៉ារ៉ាឌី & សុជាតា" },
    { src: "/img/pre-wedding5.jpg", caption: "ម៉ារ៉ាឌី & សុជាតា" },
    { src: "/img/pre-wedding6.jpg", caption: "ម៉ារ៉ាឌី & សុជាតា" },
    { src: "/img/pre-wedding7.jpg", caption: "ម៉ារ៉ាឌី & សុជាតា" },
    { src: "/img/pre-wedding8.jpg", caption: "ម៉ារ៉ាឌី & សុជាតា" },
    { src: "/img/pre-wedding9.jpg", caption: "ម៉ារ៉ាឌី & សុជាតា" },
    { src: "/img/pre-wedding10.jpg", caption: "ម៉ារ៉ាឌី & សុជាតា" },
    { src: "/img/pre-wedding11.jpg", caption: "ម៉ារ៉ាឌី & សុជាតា" },
  ];

  // Embers animation canvas
  const heroEmbersRef = useRef<HTMLCanvasElement>(null);
  const storyEmbersRef = useRef<HTMLCanvasElement>(null);
  const pondCanvasRef = useRef<HTMLCanvasElement>(null);

  // Countdown State
  const [countdown, setCountdown] = useState({
    d: "០០",
    h: "០០",
    m: "០០",
    s: "០០",
  });

  useEffect(() => {
    const target = date.dateObj.getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (n: number) => String(n).padStart(2, "0");
      if (lang === "km") {
        setCountdown({
          d: toKhmerNumerals(pad(d)),
          h: toKhmerNumerals(pad(h)),
          m: toKhmerNumerals(pad(m)),
          s: toKhmerNumerals(pad(s)),
        });
      } else {
        setCountdown({
          d: pad(d),
          h: pad(h),
          m: pad(m),
          s: pad(s),
        });
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [date.dateObj, lang]);

  // Audio Sync
  useEffect(() => {
    return soundtrack.subscribe((playing) => setIsPlaying(playing));
  }, []);

  // Preloader count up
  const [preloaderCount, setPreloaderCount] = useState(0);
  useEffect(() => {
    let cur = 0;
    const int = setInterval(() => {
      cur += Math.floor(Math.random() * 8) + 4;
      if (cur >= 100) {
        cur = 100;
        setPreloaderCount(100);
        clearInterval(int);
        setTimeout(() => {
          gsap.to("#preloader", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              setPreloaderDone(true);
            },
          });
        }, 400);
      } else {
        setPreloaderCount(cur);
      }
    }, 45);
    return () => clearInterval(int);
  }, []);

  // Envelope 3D Tilt & GSAP Opening
  useEffect(() => {
    if (!preloaderDone || isOpen) return;

    const gate = document.getElementById("gate");
    const env = document.getElementById("env");
    const tilt = document.getElementById("env-tilt");
    const seal = document.getElementById("seal");
    if (!gate || !env || !tilt || !seal) return;

    // Intro entrance
    gsap.from(".gate__invite > *", {
      y: 20,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.12,
      delay: 0.1,
    });
    gsap.from(env, {
      y: 80,
      rotateX: 22,
      opacity: 0,
      duration: 1.6,
      ease: "power3.out",
      delay: 0.15,
    });
    gsap.from(seal, {
      scale: 1.25,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(2)",
      delay: 1,
    });
    gsap.from(".gate__hint", { opacity: 0, duration: 1, delay: 1.5 });

    // Idle float
    const floatAnim = gsap.to(tilt, {
      y: -6,
      duration: 2.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const handlePointerMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      gsap.to(tilt, {
        rotateY: x * 9,
        rotateX: 6 - y * 7,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("pointermove", handlePointerMove);

    let openingTriggered = false;
    const triggerOpen = () => {
      if (openingTriggered) return;
      openingTriggered = true;

      window.removeEventListener("pointermove", handlePointerMove);
      floatAnim.kill();
      gate.classList.add("is-opening");

      // Play audio
      soundtrack.play();

      const finishOpen = () => {
        setIsOpen(true);
        document.body.classList.remove("is-locked");
        document.body.classList.add("is-open");
        gsap.to(gate, {
          opacity: 0,
          duration: 1.1,
          ease: "power1.inOut",
          onComplete: () => gate.remove(),
        });
      };

      const c = document.querySelectorAll(".e2__part");

      gsap
        .timeline({ defaults: { ease: "power2.inOut" } })
        .to(tilt, { rotateX: 4, rotateY: 0, y: 0, duration: 0.6 }, 0)
        .to(
          ".gate__invite, .gate__hint",
          { opacity: 0, y: -14, duration: 0.7 },
          0,
        )
        .to(seal, { scale: 0.93, duration: 0.18, ease: "power2.in" }, 0)
        .to(
          seal,
          {
            scale: 1.1,
            y: -18,
            rotate: -10,
            duration: 0.55,
            ease: "power2.out",
          },
          0.18,
        )
        .to(
          seal,
          {
            x: "38vw",
            y: "60vh",
            rotate: 70,
            scale: 0.9,
            duration: 0.9,
            ease: "power2.in",
          },
          0.8,
        )
        .to(
          "#env-flap",
          { rotateX: 180, duration: 1.6, ease: "power2.inOut" },
          0.75,
        )
        .to("#flap-shadow", { opacity: 0, duration: 0.7 }, 0.75)
        .set("#env-flap", { zIndex: 1 }, 1.55)
        .to(
          "#env-card",
          { yPercent: -66, rotate: -1.4, duration: 1.5, ease: "power2.inOut" },
          2.15,
        )
        .to(c, { yPercent: 7, duration: 1.5, ease: "power2.inOut" }, 2.15)
        .set("#env-card", { zIndex: 6 }, 3.6)
        .to(
          c,
          { yPercent: 135, rotate: 3, duration: 1, ease: "power2.in" },
          3.6,
        )
        .to(".e2__ground", { opacity: 0, duration: 0.6 }, 3.6)
        .to(
          "#env-card",
          {
            yPercent: -20,
            rotate: 0,
            scale: 1.35,
            duration: 1.2,
            ease: "power3.inOut",
          },
          3.7,
        )
        .to(".gate__dim", { opacity: 1, duration: 0.9, ease: "power1.in" }, 4.6)
        .to(
          "#env-card",
          { scale: 2.4, opacity: 0, duration: 1, ease: "power2.in" },
          4.6,
        )
        .add(finishOpen, 5.45);
    };

    seal.addEventListener("click", triggerOpen);
    env.addEventListener("click", (e) => {
      if (!seal.contains(e.target as Node)) triggerOpen();
    });
  }, [preloaderDone, isOpen]);

  // Floating Embers for Hero and Story
  useEffect(() => {
    const initEmbers = (canvas: HTMLCanvasElement | null, count = 35) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let animId: number;
      let w = (canvas.width =
        canvas.parentElement?.clientWidth || window.innerWidth);
      let h = (canvas.height =
        canvas.parentElement?.clientHeight || window.innerHeight);

      const pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.8,
        vy: -(Math.random() * 0.45 + 0.2),
        vx: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.7 + 0.2,
      }));

      const loop = () => {
        ctx.clearRect(0, 0, w, h);
        pts.forEach((p) => {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 239, 192, ${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#e0a995";
          ctx.fill();
        });
        animId = requestAnimationFrame(loop);
      };
      loop();
      return () => cancelAnimationFrame(animId);
    };

    const cleanup1 = initEmbers(heroEmbersRef.current, 38);
    const cleanup2 = initEmbers(storyEmbersRef.current, 26);
    return () => {
      cleanup1 && cleanup1();
      cleanup2 && cleanup2();
    };
  }, [isOpen]);

  // Scroll Progress Vine
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(height > 0 ? (top / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const copyText = (val: string) => {
    navigator.clipboard.writeText(val);
    showToast(isKm ? "បានចម្លងរួចរាល់" : "Copied to clipboard");
  };

  // Download iCal .ics
  const downloadIcs = () => {
    const start = "20261204T003000Z";
    const end = "20261204T150000Z";
    const summary = `អាពាហ៍ពិពាហ៍ ${groom.shortNameKm} & ${bride.shortNameKm}`;
    const description = `ពិធីសិរីសួស្តីអាពាហ៍ពិពាហ៍ ${groom.nameKm} & ${bride.nameKm}\\n${venue.nameKm}\\n${venue.googleMapsUrl}`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Khmer Wedding Invitation//Marady & Socheata//KM",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:marady-socheata-2026@wedding.invitation`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${venue.nameKm}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding-marady-socheata-2026.ics";
    a.click();
    showToast(isKm ? "បានទាញយកប្រតិទិនរួចរាល់" : "Calendar downloaded");
  };

  return (
    <>
      {/* 0 · PRELOADER (Lotus drawing + Khmer count) */}
      {!preloaderDone && (
        <div className="preloader" id="preloader" aria-hidden="true">
          <div className="preloader__inner">
            <div
              id="pre-lotus"
              dangerouslySetInnerHTML={{ __html: Hu("pre-lotus-svg") }}
            />
            <div className="preloader__count" id="pre-count">
              {toKhmerNumerals(preloaderCount)}
            </div>
          </div>
          <div className="preloader__curtain"></div>
        </div>
      )}

      {/* 0b · ENVELOPE GATE (Realistic 3D Envelope .e2 matching reference) */}
      <div
        className="gate"
        id="gate"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gate-guest"
      >
        <picture className="gate__bg" aria-hidden="true">
          <source
            media="(max-aspect-ratio: 1/1)"
            srcSet="/img/words-640.webp 640w, /img/words-1280.webp 1280w"
            sizes="100vw"
          />
          <img
            src="/img/cozy-1280.webp"
            srcSet="/img/cozy-1280.webp 1280w"
            sizes="100vw"
            alt=""
          />
        </picture>
        <svg
          className="gate__florals emboss"
          id="gate-florals"
          viewBox="0 0 400 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html:
              `<g transform="translate(0 0)">${Vu()
                .replace(/<svg[^>]*>/, "")
                .replace("</svg>", "")}</g>` +
              `<g transform="translate(400 800) scale(-1 -1)">${Vu()
                .replace(/<svg[^>]*>/, "")
                .replace("</svg>", "")}</g>`,
          }}
        />

        <div className="gate__stage">
          <div className="gate__invite">
            <div className="gate__kicker foil font-moul">
              {t.invitationPill}
            </div>
            <div className="gate__sub font-script">The Wedding Invitation</div>
          </div>

          {/* Envelope 2 Mount */}
          <div id="env-mount">
            <div className="e2" id="env">
              <div className="e2__ground" aria-hidden="true"></div>
              <div className="e2__stage" id="env-tilt">
                <div className="e2__part e2__back tex-olive"></div>

                <div className="e2__card tex-cream" id="env-card">
                  <div className="e2__card-frame"></div>
                  <div
                    className="e2__card-corners"
                    dangerouslySetInnerHTML={{
                      __html: ["tl", "tr", "bl", "br"]
                        .map((c) => ad(c))
                        .join(""),
                    }}
                  />
                  <div className="e2__card-inner">
                    <div className="e2__card-kicker font-moul foil">
                      {t.invitationPill}
                    </div>
                    <div
                      className="w-full flex justify-center"
                      dangerouslySetInnerHTML={{
                        __html: sd({
                          groom: groom.shortNameKm,
                          bride: bride.shortNameKm,
                          cls: "lk-card",
                          crest: true,
                        }),
                      }}
                    />
                    <div className="e2__card-invite font-moul">
                      {t.cordiallyInvite}
                    </div>
                    <div className="e2__card-date font-kh">
                      {date.dayKm} · {date.monthKm} · {date.yearKm}
                    </div>
                  </div>
                </div>

                <div className="e2__part e2__pocket">
                  <div className="e2__pocket-l tex-olive"></div>
                  <div className="e2__pocket-r tex-olive"></div>
                  <div className="e2__pocket-b tex-olive"></div>
                  <div
                    className="e2__emboss"
                    dangerouslySetInnerHTML={{ __html: ad("bl") + ad("br") }}
                  />
                  <div className="e2__date font-kh">
                    {date.dayKm} · {date.monthKm} · {date.yearKm}
                  </div>
                </div>

                <div className="e2__part e2__flapshadow" id="flap-shadow"></div>

                <div className="e2__part e2__flap" id="env-flap">
                  <div className="e2__flap-front tex-olive">
                    <svg
                      className="e2__flap-foil"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d={ud()}
                        transform="translate(50 2.5) scale(.93) translate(-50 0)"
                      />
                    </svg>
                    <div
                      className="e2__flap-logo"
                      dangerouslySetInnerHTML={{
                        __html: sd({
                          groom: groom.shortNameKm,
                          bride: bride.shortNameKm,
                          cls: "lk-env",
                          crest: true,
                        }),
                      }}
                    />
                  </div>
                  <div className="e2__flap-back tex-cream">
                    <div
                      className="e2__flap-crest"
                      dangerouslySetInnerHTML={{ __html: nd() }}
                    />
                  </div>
                </div>

                <button
                  className="e2__seal"
                  id="seal"
                  type="button"
                  aria-label="Open the invitation / បើកធៀប"
                  dangerouslySetInnerHTML={{ __html: fd() }}
                />
              </div>
            </div>
          </div>

          <div className="gate__hint font-kh">{t.openEnvelopePrompt}</div>
        </div>

        <div className="gate__dim" aria-hidden="true"></div>
      </div>

      {/* HUD Header */}
      <header className="hud">
        <a
          className="hud__mono"
          href="#hero"
          id="hud-mono"
          aria-label="Top of page"
          dangerouslySetInnerHTML={{
            __html: sd({
              groom: groom.shortNameKm,
              bride: bride.shortNameKm,
              cls: "lk-hud",
              crest: false,
            }),
          }}
        />
        <div className="hud__right">
          <button
            className="chip font-kh font-semibold"
            id="lang-toggle"
            type="button"
            onClick={() => setLang((l) => (l === "km" ? "en" : "km"))}
            aria-label="Switch language"
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
          <button
            className={`chip ${isPlaying ? "is-playing" : ""}`}
            id="music-toggle"
            type="button"
            onClick={() => soundtrack.toggle()}
            aria-pressed={isPlaying}
            aria-label="Music toggle"
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

      {/* Scroll Vine Progress */}
      <div className="vine-progress" aria-hidden="true">
        <span style={{ height: `${scrollProgress}%` }}></span>
        <b></b>
      </div>

      {/* Floating Bottom RSVP / Location Pill */}
      <a className="btn rsvp-pill" href="#venue">
        {lang === "km" ? "ទីតាំង" : "Venue"}
      </a>

      {/* MAIN WEDDING INVITATION CHAPTERS */}
      <main id="main">
        {/* 1 · COVER / HERO */}
        <section
          className="hero cover"
          id="hero"
          aria-label="Wedding invitation cover"
        >
          <div className="hero__media" id="hero-media">
            <picture>
              <source
                media="(max-aspect-ratio: 1/1)"
                srcSet="/img/hero-m-1280.webp 1280w"
                sizes="100vw"
              />
              <img
                src="/img/hero-1280.webp"
                sizes="100vw"
                alt="អេង ម៉ារ៉ាឌី និង កៅ ហែមសុជាតា"
                fetchPriority="high"
              />
            </picture>
            <div className="hero__shade"></div>
            <canvas
              ref={heroEmbersRef}
              className="hero__embers"
              id="hero-embers"
            ></canvas>
          </div>

          <div
            data-orn="corner4"
            className="cover__corners"
            dangerouslySetInnerHTML={{
              __html: ["tl", "tr", "bl", "br"].map((c) => ad(c)).join(""),
            }}
          />

          <div className="cover__inner">
            <div
              className="cover__crest"
              data-orn="crest"
              dangerouslySetInnerHTML={{ __html: nd() }}
            ></div>
            <div className="cover__kicker foil font-moul">
              {t.invitationPill}
            </div>
            <div className="cover__sub font-script">The Wedding Invitation</div>
            <div
              className="cover__lockup"
              data-lockup="cover"
              dangerouslySetInnerHTML={{
                __html: sd({
                  groom: groom.shortNameKm,
                  bride: bride.shortNameKm,
                  cls: "lk-cover",
                  crest: true,
                }),
              }}
            />
            <div
              className="hero__en font-serif uppercase tracking-widest text-[#fbf5f0]"
              id="names-en"
            >
              {groom.nameEn} &amp; {bride.nameEn}
            </div>
            <div className="cover__invite font-kh">{t.cordiallyInvite}</div>

            <div className="cover__chips">
              <div className="chip-d">
                <small>{t.dayHeader}</small>
                <b className="font-kh">{isKm ? "សុក្រ" : "Fri"}</b>
              </div>
              <div className="chip-d">
                <small>{t.dateHeader}</small>
                <b className="font-kh text-[#f8e1d6]">
                  {isKm ? date.dayKm : date.dayEn}
                </b>
              </div>
              <div className="chip-d">
                <small>{t.monthHeader}</small>
                <b className="font-kh">{isKm ? date.monthKm : date.monthEn}</b>
              </div>
              <div className="chip-d">
                <small>{t.yearHeader}</small>
                <b className="font-kh">{isKm ? date.yearKm : date.yearEn}</b>
              </div>
            </div>

            <div className="cover__lunar font-kh text-xs sm:text-sm text-[#fbf5f0]/85">
              {isKm ? date.lunarKm : date.lunarEn}
            </div>

            <div className="cover__venue font-kh text-xs sm:text-sm text-[#fbf5f0]/90">
              <span>{isKm ? venue.nameKm : venue.nameEn}</span> ·{" "}
              <span>{isKm ? venue.addressKm : venue.addressEn}</span>
            </div>

            <a className="cover__cue font-kh text-xs" href="#words">
              <span>{t.scrollCue}</span>
              <i></i>
            </a>
          </div>
        </section>

        {/* 2 · INVITATION WORDS */}
        <section className="chapter words" id="words">
          <svg
            className="words__florals emboss"
            id="words-florals"
            viewBox="0 0 260 260"
            aria-hidden="true"
            dangerouslySetInnerHTML={{
              __html: `<g transform="translate(260 0) scale(-1 1)">${Vu()
                .replace(/<svg[^>]*>/, "")
                .replace("</svg>", "")}</g>`,
            }}
          />

          <div className="words__grid">
            <div className="arch" data-parallax-wrap>
              <img src="/img/words-1280.webp" alt="The couple" loading="lazy" />
            </div>

            <div className="words__text">
              <span className="kicker foil font-kh">
                {isKm ? "លិខិតគោរពអញ្ជើញ" : "Formal Invitation"}
              </span>
              <h2 className="title font-moul text-xl sm:text-2xl text-[#f8e1d6]">
                {t.cordiallyInvite}
              </h2>
              <p className="words__body serif-kh font-kh text-sm sm:text-base text-[#fbf5f0]/90 leading-loose">
                {t.formalInvitationP1}
              </p>

              <div className="parents">
                <div>
                  <h4 className="font-kh text-xs text-[#e0a995] uppercase font-bold">
                    {t.groomParentsTitle}
                  </h4>
                  <p className="font-kh text-sm sm:text-base leading-relaxed">
                    {groom.fatherKm}
                    <br />
                    {groom.motherKm}
                  </p>
                </div>
                <div>
                  <h4 className="font-kh text-xs text-[#e0a995] uppercase font-bold">
                    {t.brideParentsTitle}
                  </h4>
                  <p className="font-kh text-sm sm:text-base leading-relaxed">
                    {bride.fatherKm}
                    <br />
                    {bride.motherKm}
                  </p>
                </div>
              </div>

              <p className="words__thanks font-kh text-xs sm:text-sm text-[#fbf5f0]/80 mt-4">
                {t.formalInvitationP2}
              </p>
            </div>
          </div>
        </section>

        {/* 3 · THE COUPLE */}
        <section className="chapter couple" id="couple">
          <div className="chapter__head">
            <span className="kicker font-serif italic text-xs text-[#e0a995] uppercase tracking-widest">
              {isKm ? "កូនកំលោះ និង កូនក្រមុំ" : "The Couple"}
            </span>
            <div
              data-orn="divider"
              dangerouslySetInnerHTML={{ __html: od("divider") }}
            ></div>
          </div>

          <div className="couple__stage">
            <div className="person" data-from="left">
              <div className="caps font-kh text-xs text-[#e0a995]">
                {t.groomLabel}
              </div>
              <div className="person__name foil font-moul text-xl sm:text-2xl">
                {groom.nameKm}
              </div>
              <div className="person__en font-serif italic text-sm text-[#e0a995]">
                {groom.nameEn}
              </div>
              <div className="person__parents font-kh text-xs sm:text-sm text-[#fbf5f0]/80 mt-3 leading-relaxed">
                <span>{groom.fatherKm}</span>
                <br />
                <span>{groom.motherKm}</span>
              </div>
            </div>

            <div className="couple__photo">
              <div className="scallop-frame" id="couple-frame">
                <img
                  src="/img/cozy-1280.webp"
                  alt="The Couple"
                  loading="lazy"
                />
                <svg
                  className="frame-line"
                  viewBox="0 0 1 1"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    className="draw"
                    d={Uu(8, 10, 0.02)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
              <div className="couple__amp" id="couple-amp">
                <span className="foil">&amp;</span>
              </div>
              <div
                className="couple__butterfly"
                id="couple-butterfly"
                dangerouslySetInnerHTML={{ __html: Ru() }}
              ></div>
            </div>

            <div className="person" data-from="right">
              <div className="caps font-kh text-xs text-[#e0a995]">
                {t.brideLabel}
              </div>
              <div className="person__name foil font-moul text-xl sm:text-2xl">
                {bride.nameKm}
              </div>
              <div className="person__en font-serif italic text-sm text-[#e0a995]">
                {bride.nameEn}
              </div>
              <div className="person__parents font-kh text-xs sm:text-sm text-[#fbf5f0]/80 mt-3 leading-relaxed">
                <span>{bride.fatherKm}</span>
                <br />
                <span>{bride.motherKm}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 · COUNTDOWN */}
        <section className="chapter countdown" id="countdown">
          <div className="marquee" aria-hidden="true">
            <div className="marquee__track" id="marquee">
              <span>{t.blessingMarquee}</span>
              <span>{t.blessingMarquee}</span>
            </div>
          </div>

          <div className="chapter__head" style={{ marginBottom: "1.5rem" }}>
            <span className="kicker font-serif italic text-xs text-[#e0a995] uppercase">
              {t.countdownTitle}
            </span>
          </div>

          <div className="count" id="count" aria-live="polite">
            <div className="count__unit">
              <span className="count__num foil font-kh" data-u="d">
                {countdown.d}
              </span>
              <span className="count__label caps font-kh">
                {t.countdownDays}
              </span>
            </div>
            <div className="count__unit">
              <span className="count__num foil font-kh" data-u="h">
                {countdown.h}
              </span>
              <span className="count__label caps font-kh">
                {t.countdownHours}
              </span>
            </div>
            <div className="count__unit">
              <span className="count__num foil font-kh" data-u="m">
                {countdown.m}
              </span>
              <span className="count__label caps font-kh">
                {t.countdownMinutes}
              </span>
            </div>
            <div className="count__unit">
              <span className="count__num foil font-kh" data-u="s">
                {countdown.s}
              </span>
              <span className="count__label caps font-kh">
                {t.countdownSeconds}
              </span>
            </div>
          </div>

          <div className="count__date">
            <div
              data-orn="divider"
              dangerouslySetInnerHTML={{ __html: od("divider") }}
            ></div>
            <div className="caps font-kh text-[#e0a995]">
              {isKm ? "ថ្ងៃសុក្រ" : "Friday"}
            </div>
            <div className="font-kh text-sm sm:text-base">
              {isKm ? date.gregorianKm : date.gregorianEn}
            </div>
            <div className="font-kh text-xs text-[#fbf5f0]/80">
              {isKm ? "វេលាម៉ោង ៧:៣០ ព្រឹក" : "At 07:30 AM"}
            </div>
          </div>
        </section>

        {/* 5 · PROGRAMME */}
        <section className="chapter programme" id="programme">
          <div className="programme__grid">
            <div className="programme__aside">
              <h2 className="display foil font-moul text-2xl sm:text-3xl">
                {t.programmeHeading}
              </h2>
              <div className="font-kh text-xs sm:text-sm text-[#fbf5f0]/80 mt-1">
                {t.programmeSub}
              </div>
            </div>

            <div className="programme__list">
              <div className="programme__thread" aria-hidden="true">
                <span></span>
              </div>
              <ol
                id="programme-list"
                style={{ listStyle: "none", margin: 0, padding: 0 }}
                className="space-y-8"
              >
                {programmes.map((p) => {
                  const iconKeyMap: Record<string, string> = {
                    fruit: "tray",
                    ring: "ring",
                    chant: "monk",
                    knot: "thread",
                    lunch: "dinner",
                    banquet: "candle",
                  };
                  const iconKey = iconKeyMap[p.iconType] || "flower";

                  return (
                    <li key={p.id} className="programme__item relative pl-8">
                      <div className="programme__icon absolute -left-5 top-0 w-8 h-8 rounded-full bg-[#4a2a2a] border border-[#e0a995] flex items-center justify-center text-[#f8e1d6]">
                        <span
                          dangerouslySetInnerHTML={{ __html: Ku(iconKey) }}
                        ></span>
                      </div>
                      <div className="programme__time font-kh font-semibold text-xs text-[#e0a995]">
                        {isKm ? p.timeKm : p.timeEn}
                      </div>
                      <h4 className="programme__title font-moul text-sm sm:text-base text-[#f8e1d6] mt-1">
                        {isKm ? p.titleKm : p.titleEn}
                      </h4>
                      <p className="programme__desc font-kh text-xs sm:text-sm text-[#fbf5f0]/80 mt-1 leading-relaxed">
                        {isKm ? p.descriptionKm : p.descriptionEn}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* 6 · STORY */}
        <section className="story" id="story">
          <div className="story__pin">
            <canvas
              ref={storyEmbersRef}
              className="story__embers"
              id="story-embers"
            ></canvas>
            <div className="story__track" id="story-track">
              <div className="story__intro">
                <span className="kicker foil font-serif italic text-xs">
                  {isKm ? "ដំណើររឿងនៃស្នេហ៍" : "Our Love Story"}
                </span>
                <h2 className="display font-moul text-xl sm:text-2xl text-[#f8e1d6]">
                  {t.loveStoryHeading}
                </h2>
                <div className="caps font-kh text-xs text-[#e0a995] mt-2">
                  {t.loveStorySub}
                </div>
              </div>

              {loveStory.map((s, idx) => (
                <div
                  key={idx}
                  className="story__card bg-[#220e0e]/85 p-6 sm:p-8 rounded-2xl border border-[#e0a995]/40 shadow-xl min-w-[280px] sm:min-w-[340px]"
                >
                  <span className="font-kh font-bold text-xs text-[#e0a995] block mb-2">
                    {s.year}
                  </span>
                  <h3 className="font-moul text-base sm:text-lg text-[#f8e1d6] mb-2">
                    {isKm ? s.titleKm : s.titleEn}
                  </h3>
                  <p className="font-kh text-xs sm:text-sm text-[#fbf5f0]/85 leading-relaxed">
                    {isKm ? s.descKm : s.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7 · POND */}
        <section className="pond" id="pond">
          <div className="pond__sticky" id="pond-sticky">
            <picture>
              <source
                media="(min-aspect-ratio: 1/1)"
                srcSet="/img/pond-w-1280.webp 1280w"
                sizes="100vw"
              />
              <img
                className="pond__fallback"
                src="/img/pond-1280.webp"
                sizes="100vw"
                alt="Candles and lotus offerings on the pond"
                loading="lazy"
                id="pond-img"
              />
            </picture>
            <canvas
              ref={pondCanvasRef}
              className="pond__canvas"
              id="pond-canvas"
            ></canvas>
            <div className="pond__shade"></div>
            <div className="pond__text text-center">
              <div className="kicker foil font-serif italic text-xs">
                {t.candleSectionTitle}
              </div>
              <div className="display foil font-moulpali text-2xl sm:text-4xl mt-1">
                <span>{groom.shortNameKm}</span>{" "}
                <span style={{ fontFamily: "var(--f-script)" }}>&amp;</span>{" "}
                <span>{bride.shortNameKm}</span>
              </div>
            </div>
            <div className="pond__hint font-kh text-xs">
              {t.candleSectionSub}
            </div>
          </div>
        </section>

        {/* 8 · GALLERY */}
        <section className="chapter gallery" id="gallery">
          <div className="chapter__head">
            <span className="kicker font-serif italic text-xs text-[#e0a995] uppercase">
              {t.galleryHeading}
            </span>
            <h2 className="display font-moul text-xl sm:text-2xl text-[#f8e1d6]">
              {t.gallerySub}
            </h2>
            <div
              data-orn="divider"
              dangerouslySetInnerHTML={{ __html: od("divider") }}
            ></div>
          </div>

          <div
            className="gallery__grid grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto"
            id="gallery-grid"
          >
            {galleryPhotos.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="gallery__item overflow-hidden rounded-xl border border-[#e0a995]/40 shadow-lg group relative cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="font-kh text-xs text-white bg-black/60 px-3 py-1 rounded-full">
                    {photo.caption}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 9 · VENUE */}
        <section className="chapter venue" id="venue">
          <span className="kicker foil font-serif italic text-xs text-center block mb-2">
            {t.venueHeading}
          </span>
          <div
            id="angkor"
            className="flex justify-center"
            dangerouslySetInnerHTML={{ __html: nd("venue__crest") + Wu() }}
          ></div>
          <div className="venue__name foil font-moul text-xl sm:text-2xl text-center mt-3">
            {isKm ? venue.nameKm : venue.nameEn}
          </div>
          <div className="venue__meta font-kh text-xs sm:text-sm text-center text-[#fbf5f0]/80 mt-1">
            {isKm ? venue.addressKm : venue.addressEn}
          </div>

          <div className="venue__when font-kh text-center my-4 space-y-1">
            <div className="caps text-[#f8e1d6] font-semibold">
              {isKm ? "ថ្ងៃសុក្រ" : "Friday"}
            </div>
            <div className="text-sm">
              {isKm ? date.gregorianKm : date.gregorianEn}
            </div>
            <div className="text-xs text-[#e0a995]">
              {isKm
                ? "ម៉ោង ៧:៣០ ព្រឹក ដល់ ម៉ោង ៥:០០ ល្ងាច"
                : "07:30 AM to 05:00 PM"}
            </div>
          </div>

          <div className="venue__map max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#e0a995]/50 shadow-2xl h-[320px] sm:h-[400px]">
            <iframe
              id="venue-map"
              src={venue.embedUrl}
              title="Google Map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="w-full h-full border-0 filter saturate-[0.9]"
            ></iframe>
          </div>

          <div className="venue__actions flex justify-center gap-4 mt-6">
            <a
              className="btn px-6 py-2.5 rounded-full bg-[#4a2a2a] text-[#f8e1d6] border border-[#e0a995]/60 font-kh text-xs font-semibold"
              id="map-link"
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener"
            >
              {t.openGoogleMaps}
            </a>
            <button
              className="btn px-6 py-2.5 rounded-full bg-[#e0a995] text-[#220e0e] border border-[#f8e1d6] font-kh text-xs font-bold"
              id="ics-btn"
              type="button"
              onClick={downloadIcs}
            >
              {t.addToCalendar}
            </button>
          </div>
        </section>


        {/* 11 · FINALE */}
        <section className="chapter finale" id="finale">
          <div>
            <div className="finale__candles" id="candles" aria-hidden="true">
              <i className="candle"></i>
              <i className="candle"></i>
              <i className="candle"></i>
              <i className="candle"></i>
              <i className="candle"></i>
              <i className="candle"></i>
              <i className="candle"></i>
            </div>
            <h2 className="display foil font-moul text-2xl sm:text-4xl">
              {t.thankYouHeading}
            </h2>
            <p className="finale__line font-kh text-xs sm:text-sm text-[#fbf5f0]/85 max-w-lg mx-auto my-4">
              {t.thankYouSub}
            </p>

            <div className="finale__actions flex flex-wrap justify-center gap-3 max-w-md mx-auto my-6">
              <a
                className="share share--tg font-kh text-xs"
                id="share-tg"
                target="_blank"
                rel="noopener"
                href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(t.invitationPill)}`}
              >
                <i data-icon="telegram"></i>
                <span>
                  <small>{t.shareVia} </small>Telegram
                </span>
              </a>
              <a
                className="share share--ms font-kh text-xs"
                id="share-ms"
                target="_blank"
                rel="noopener"
                href={`https://www.facebook.com/dialog/send?link=${encodeURIComponent(window.location.href)}&app_id=2914944191950478&redirect_uri=${encodeURIComponent(window.location.href)}`}
              >
                <i data-icon="messenger"></i>
                <span>
                  <small>{t.shareVia} </small>Messenger
                </span>
              </a>
              <a
                className="share share--fb font-kh text-xs"
                id="share-fb"
                target="_blank"
                rel="noopener"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              >
                <i data-icon="facebook"></i>
                <span>
                  <small>{t.shareVia} </small>Facebook
                </span>
              </a>
              <button
                className="share share--copy font-kh text-xs"
                id="share-copy"
                type="button"
                onClick={() => copyText(window.location.href)}
              >
                <i data-icon="link"></i>
                <span>
                  <small>{isKm ? "ចម្លង" : "Copy"} </small>
                  <b>{t.copyLink}</b>
                </span>
              </button>
            </div>

            <div
              className="finale__mono flex justify-center my-6"
              id="finale-mono"
              dangerouslySetInnerHTML={{
                __html: sd({
                  groom: groom.shortNameKm,
                  bride: bride.shortNameKm,
                  cls: "lk-finale",
                  crest: true,
                }),
              }}
            />
          </div>
        </section>

        <footer className="footer font-kh text-xs text-[#fbf5f0]/60 text-center py-6 border-t border-[#4a2a2a]/40">
          <span>{groom.nameKm}</span> &amp; <span>{bride.nameKm}</span> ·{" "}
          <span id="year">២០២៦</span>
          <div className="mt-1 font-serif text-[11px] text-[#e0a995]/70">
            Design inspired by{" "}
            <a
              href="https://somethphay.me"
              target="_blank"
              rel="noopener"
              className="underline hover:text-white"
            >
              Someth Phay · somethphay.me
            </a>
          </div>
        </footer>
      </main>

      {/* Lightbox Dialog */}
      {lightboxIndex !== null && (
        <dialog
          className="lightbox open"
          id="lightbox"
          aria-label="Photo viewer"
          open
          style={{ display: "flex" }}
        >
          <img
            id="lb-img"
            src={galleryPhotos[lightboxIndex].src}
            alt={galleryPhotos[lightboxIndex].caption}
          />
          <button
            className="lb-btn lb-close"
            type="button"
            id="lb-close"
            aria-label="Close"
            onClick={() => setLightboxIndex(null)}
          >
            ✕
          </button>
          <button
            className="lb-btn lb-prev"
            type="button"
            id="lb-prev"
            aria-label="Previous"
            onClick={() =>
              setLightboxIndex((i) =>
                i! > 0 ? i! - 1 : galleryPhotos.length - 1,
              )
            }
          >
            ‹
          </button>
          <button
            className="lb-btn lb-next"
            type="button"
            id="lb-next"
            aria-label="Next"
            onClick={() =>
              setLightboxIndex((i) =>
                i! < galleryPhotos.length - 1 ? i! + 1 : 0,
              )
            }
          >
            ›
          </button>
          <div className="lb-count caps font-kh" id="lb-count">
            {lightboxIndex + 1} / {galleryPhotos.length}
          </div>
        </dialog>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast show font-kh text-xs" id="toast" role="status">
          {toastMessage}
        </div>
      )}
    </>
  );
}
