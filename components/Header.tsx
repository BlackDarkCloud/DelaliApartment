"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { whatsappLink, DEFAULT_WHATSAPP } from "@/lib/whatsapp";

export default function Header() {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-night/10 bg-sand/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          Delali <span className="text-clay italic">Apartment</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#apartments" className="text-sm hover:text-clay transition-colors">
            {t.nav.apartments}
          </Link>
          <Link href="/#location" className="text-sm hover:text-clay transition-colors">
            {t.nav.location}
          </Link>
          <Link href="/#contact" className="text-sm hover:text-clay transition-colors">
            {t.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="focus-ring eyebrow rounded-full border border-night/20 px-3 py-1.5 text-night/80 transition hover:border-night/50"
            aria-label="Changer de langue / Switch language"
          >
            {lang === "fr" ? "FR / EN" : "EN / FR"}
          </button>
          <a
            href={whatsappLink(
              DEFAULT_WHATSAPP,
              lang === "fr"
                ? "Bonjour, je suis intéressé(e) par un séjour à Delali Apartment."
                : "Hello, I'm interested in a stay at Delali Apartment."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden rounded-full bg-palm px-4 py-2 text-sm font-medium text-ivory transition hover:bg-palmDeep sm:inline-block"
          >
            {t.nav.book}
          </a>
        </div>
      </div>
    </header>
  );
}
