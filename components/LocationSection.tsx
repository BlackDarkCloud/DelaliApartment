"use client";

import { useLanguage } from "@/lib/i18n";

export default function LocationSection() {
  const { t } = useLanguage();

  return (
    <section id="location" className="bg-night py-20 text-ivory">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow text-gold">{t.location.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            {t.location.title}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ivory/70">
            {t.location.body}
          </p>
          <div className="mt-8 border-t border-ivory/15 pt-6">
            <p className="eyebrow text-ivory/50">{t.location.addressLabel}</p>
            <p className="mt-2 font-display text-xl">{t.location.address}</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-ivory/10 shadow-card">
          <iframe
            title="Delali Apartment – DVA, Lomé"
            src="https://www.google.com/maps?q=DVA,Lom%C3%A9,Togo&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
