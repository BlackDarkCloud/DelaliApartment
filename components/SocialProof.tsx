"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { guestAvatars } from "@/lib/stockPhotos";
import Reveal from "./Reveal";

export default function SocialProof() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <Reveal>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-clayDeep">{t.social.since}</p>
            <h2 className="mt-3 whitespace-pre-line font-display text-3xl font-semibold leading-tight text-night sm:text-4xl">
              {t.social.title}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <a
                href="#apartments"
                aria-hidden="true"
                tabIndex={-1}
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-night/20 text-night/60 transition hover:border-clay hover:text-clay"
              >
                <ArrowLeft size={16} />
              </a>
              <a
                href="#apartments"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-night/20 text-night/60 transition hover:border-clay hover:text-clay"
              >
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="flex items-center gap-3 border-l border-night/10 pl-6">
              <div className="flex -space-x-3">
                {guestAvatars.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-sand"
                  >
                    <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-xs text-night/60">
                <p className="font-medium text-night">100+</p>
                <p>{t.social.guestsLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 border-l border-night/10 pl-6 text-sm text-night">
              <Star size={15} className="fill-gold text-gold" />
              <span className="font-medium">4.9</span>
              <span className="text-night/50">{t.social.ratingLabel}</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
