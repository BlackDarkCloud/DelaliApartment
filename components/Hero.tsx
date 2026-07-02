"use client";

import { useLanguage } from "@/lib/i18n";
import { whatsappLink, DEFAULT_WHATSAPP } from "@/lib/whatsapp";
import House3D from "./House3D";

export default function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sandDeep/60 via-sand to-sand" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-14 lg:grid-cols-2 lg:items-center lg:pt-20">
        <div>
          <p className="eyebrow text-clayDeep">{t.hero.eyebrow}</p>
          <h1 className="mt-4 whitespace-pre-line font-display text-4xl font-semibold leading-[1.08] tracking-tight text-night sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-night/70">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={whatsappLink(
                DEFAULT_WHATSAPP,
                lang === "fr"
                  ? "Bonjour, je suis intéressé(e) par un séjour à Delali Apartment."
                  : "Hello, I'm interested in a stay at Delali Apartment."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-full bg-night px-6 py-3 text-sm font-medium text-ivory transition hover:bg-palmDeep"
            >
              {t.hero.cta}
            </a>
            <a
              href="#apartments"
              className="focus-ring rounded-full border border-night/25 px-6 py-3 text-sm font-medium text-night transition hover:border-night/60"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-night/10 pt-6">
            <div>
              <dt className="font-display text-2xl font-semibold text-clayDeep">4.9</dt>
              <dd className="mt-1 text-xs text-night/60">{t.hero.stat1Label}</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-semibold text-clayDeep">15</dt>
              <dd className="mt-1 text-xs text-night/60">{t.hero.stat2Label}</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-semibold text-clayDeep">24/7</dt>
              <dd className="mt-1 text-xs text-night/60">{t.hero.stat3Label}</dd>
            </div>
          </dl>
        </div>

        <House3D />
      </div>
    </section>
  );
}
