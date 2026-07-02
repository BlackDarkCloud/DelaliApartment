"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { stockPhotos } from "@/lib/stockPhotos";
import Reveal from "./Reveal";

export default function DestinationsPreview() {
  const { t } = useLanguage();
  const photos = [stockPhotos.livingRoom, stockPhotos.bedroom, stockPhotos.kitchenLounge];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-24 sm:pt-28">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {photos.map((src, i) => (
            <Reveal key={i} delay={i * 0.1} y={30}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-sandDeep shadow-card"
              >
                <Image
                  src={src}
                  alt={t.destinations.names[i]}
                  fill
                  sizes="(max-width: 768px) 33vw, 220px"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-ivory/90 text-[10px] text-clayDeep">
                  ●
                </span>
                <span className="absolute bottom-3 left-3 right-3 font-display text-sm font-medium text-ivory drop-shadow">
                  {t.destinations.names[i]}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="eyebrow text-clayDeep">{t.destinations.eyebrow}</p>
          <p className="mt-4 max-w-sm text-night/70 leading-relaxed">
            {t.destinations.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
