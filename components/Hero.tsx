"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Search, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { whatsappLink, DEFAULT_WHATSAPP } from "@/lib/whatsapp";
import { stockPhotos } from "@/lib/stockPhotos";
import TogoFlag from "./TogoFlag";

export default function Hero() {
  const { t, lang, toggleLang } = useLanguage();

  const bookingMessage =
    lang === "fr"
      ? "Bonjour, je suis intéressé(e) par un séjour à Delali Apartment."
      : "Hello, I'm interested in a stay at Delali Apartment.";

  return (
    <section className="px-3 pt-3 sm:px-6 sm:pt-6">
      <div className="relative isolate mx-auto min-h-[640px] w-full max-w-[1400px] overflow-hidden rounded-[28px] shadow-card sm:min-h-[720px] sm:rounded-[36px]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={stockPhotos.heroPool}
            alt="Delali Apartment — DVA, Lomé, Togo"
            fill
            priority
            className="animate-kenburns object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-night/50 via-night/15 to-night/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-night/10" />

        {/* Glass navbar */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 flex justify-center px-4 pt-5 sm:px-8 sm:pt-8"
        >
          <nav className="flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-ivory backdrop-blur-xl sm:px-6">
            <Link href="/" className="font-display text-base font-semibold tracking-tight">
              Delali <span className="italic text-goldSoft">Apartment</span>
            </Link>
            <div className="hidden items-center gap-7 md:flex">
              <a href="#apartments" className="text-sm text-ivory/85 transition hover:text-ivory">
                {t.nav.apartments}
              </a>
              <a href="#location" className="text-sm text-ivory/85 transition hover:text-ivory">
                {t.nav.location}
              </a>
              <a href="#contact" className="text-sm text-ivory/85 transition hover:text-ivory">
                {t.nav.contact}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLang}
                aria-label="Changer de langue / Switch language"
                className="focus-ring eyebrow rounded-full border border-white/25 px-3 py-1.5 text-ivory/90 transition hover:border-white/60 hover:bg-white/10"
              >
                {lang === "fr" ? "FR/EN" : "EN/FR"}
              </button>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP, bookingMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring hidden items-center gap-1.5 rounded-full bg-ivory px-4 py-2 text-sm font-medium text-night transition hover:bg-white sm:flex"
              >
                <MessageCircle size={14} />
                {t.nav.book}
              </a>
            </div>
          </nav>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-4 mt-16 max-w-lg text-ivory sm:mx-8 sm:mt-24 lg:mt-28"
        >
          <p className="eyebrow flex items-center gap-2 text-goldSoft">
            <TogoFlag className="h-3.5 w-5 rounded-[2px] shadow-sm" />
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-4 whitespace-pre-line font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/80 sm:text-base">
            {t.hero.subtitle}
          </p>
          <a
            href={whatsappLink(DEFAULT_WHATSAPP, bookingMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-palm px-6 py-3 text-sm font-medium text-ivory shadow-glow transition hover:bg-palmDeep sm:hidden"
          >
            <MessageCircle size={15} />
            {t.hero.cta}
          </a>
        </motion.div>

        {/* Circular scroll CTA */}
        <motion.a
          href="#apartments"
          aria-label={t.hero.ctaSecondary}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.08 }}
          className="focus-ring absolute left-1/2 top-1/2 z-10 hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border border-white/40 bg-white/10 text-center text-[11px] font-medium leading-tight text-ivory backdrop-blur-md transition hover:bg-white/20 sm:flex"
        >
          <span className="whitespace-pre-line">{t.hero.scrollCta}</span>
          <ArrowDown size={16} className="mt-1" />
        </motion.a>

        {/* Floating trust card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-4 top-24 z-20 w-[220px] rounded-2xl border border-white/25 bg-white/10 p-4 text-ivory backdrop-blur-xl sm:right-8 sm:top-28 sm:w-[240px]"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-palm text-xs">
              ✓
            </span>
            <p className="text-sm font-medium">{t.hero.trustTitle}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/15 pt-3 text-center">
            <div>
              <p className="font-display text-xl font-semibold">4.9 ★</p>
              <p className="mt-0.5 text-[11px] text-ivory/70">{t.hero.stat1Label}</p>
            </div>
            <div>
              <p className="font-display text-xl font-semibold">15</p>
              <p className="mt-0.5 text-[11px] text-ivory/70">{t.hero.stat2Label}</p>
            </div>
          </div>
        </motion.div>

        {/* Floating stay card */}
        <motion.div
          initial={{ opacity: 0, x: 24, y: 12 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-[-56px] right-4 z-20 w-[260px] rounded-2xl border border-white/25 bg-white/90 p-3 text-night shadow-card backdrop-blur-xl sm:right-8 sm:w-[280px]"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-xl">
              <Image src={stockPhotos.livingRoom} alt="" fill className="object-cover" sizes="56px" />
            </div>
            <div>
              <p className="eyebrow flex items-center gap-1.5 text-night/50">
                <TogoFlag className="h-2.5 w-4 rounded-[1px]" />
                {t.hero.stayCardLabel}
              </p>
              <p className="font-display text-sm font-semibold">DVA, Lomé</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href={whatsappLink(DEFAULT_WHATSAPP, bookingMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center justify-center gap-1.5 rounded-full bg-palm py-2 text-xs font-medium text-ivory transition hover:bg-palmDeep"
            >
              <MessageCircle size={13} />
              {t.hero.stayCardCta}
            </a>
            <a
              href="https://www.google.com/maps?q=DVA,Lom%C3%A9,Togo"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center justify-center gap-1.5 rounded-full border border-night/15 py-2 text-xs font-medium text-night transition hover:border-night/40"
            >
              <Search size={13} />
              {t.hero.mapCta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
