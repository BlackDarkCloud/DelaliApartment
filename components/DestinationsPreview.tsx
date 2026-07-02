"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { stockPhotos } from "@/lib/stockPhotos";

export default function DestinationsPreview() {
  const { t } = useLanguage();
  const photos = [stockPhotos.livingRoom, stockPhotos.bedroom, stockPhotos.kitchenLounge];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-24 sm:pt-28">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {photos.map((src, i) => (
            <div
              key={i}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-sandDeep"
            >
              <Image
                src={src}
                alt={t.destinations.names[i]}
                fill
                sizes="(max-width: 768px) 33vw, 220px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-ivory/90 px-2.5 py-1 text-[10px] font-medium text-night">
                ●
              </span>
              <span className="absolute bottom-3 left-3 right-3 font-display text-sm font-medium text-ivory drop-shadow">
                {t.destinations.names[i]}
              </span>
            </div>
          ))}
        </div>
        <div>
          <p className="eyebrow text-clayDeep">{t.destinations.eyebrow}</p>
          <p className="mt-4 max-w-sm text-night/70 leading-relaxed">
            {t.destinations.body}
          </p>
        </div>
      </div>
    </section>
  );
}
