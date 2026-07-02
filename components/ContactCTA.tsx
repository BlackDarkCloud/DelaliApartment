"use client";

import { useLanguage } from "@/lib/i18n";
import { whatsappLink, DEFAULT_WHATSAPP } from "@/lib/whatsapp";
import Reveal from "./Reveal";
import TogoFlag from "./TogoFlag";

export default function ContactCTA() {
  const { t, lang } = useLanguage();

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-clay to-clayDeep px-8 py-14 text-ivory sm:px-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-goldSoft/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow flex items-center gap-2 text-ivory/70">
                <TogoFlag className="h-3.5 w-5 rounded-[2px]" />
                {t.contact.eyebrow}
              </p>
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
        </div>
      </Reveal>
    </section>
  );
}
