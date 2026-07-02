"use client";

import { useLanguage } from "@/lib/i18n";
import { whatsappLink, DEFAULT_WHATSAPP } from "@/lib/whatsapp";

export default function ContactCTA() {
  const { t, lang } = useLanguage();

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-8 rounded-3xl bg-clay px-8 py-14 text-ivory sm:px-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow text-ivory/70">{t.contact.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 max-w-md text-ivory/85">{t.contact.body}</p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <a
            href={whatsappLink(
              DEFAULT_WHATSAPP,
              lang === "fr"
                ? "Bonjour, je souhaite réserver un séjour à Delali Apartment."
                : "Hello, I would like to book a stay at Delali Apartment."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring rounded-full bg-night px-7 py-3.5 text-sm font-medium text-ivory transition hover:bg-nightSoft"
          >
            {t.nav.book}
          </a>
          <div className="text-sm text-ivory/85">
            <p className="eyebrow text-ivory/60">{t.contact.address}</p>
            <p className="mt-1">DVA, Lomé, Togo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
