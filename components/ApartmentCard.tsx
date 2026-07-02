"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import type { Apartment } from "@/lib/types";

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  const { t, lang } = useLanguage();
  const cover = apartment.images?.[0];

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
      <Link
        href={`/apartment/${apartment.slug}`}
        className="focus-ring group block overflow-hidden rounded-2xl bg-ivory shadow-card transition-shadow hover:shadow-glow"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sandDeep">
          {cover ? (
            <Image
              src={cover}
              alt={apartment.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-night/30">
              Delali Apartment
            </div>
          )}
          <div className="absolute left-4 top-4 rounded-full bg-night/85 px-3 py-1 font-mono text-xs text-ivory">
            {apartment.price_per_night.toLocaleString(lang === "fr" ? "fr-FR" : "en-US")}{" "}
            {apartment.currency} {t.apartments.perNight}
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-night">
            {apartment.name}
          </h3>
          <p className="mt-1 text-sm text-night/60">{apartment.address}</p>
          <div className="mt-4 flex items-center gap-4 text-xs text-night/60">
            <span>
              {apartment.bedrooms} {t.apartments.bedrooms}
            </span>
            <span>·</span>
            <span>
              {apartment.bathrooms} {t.apartments.bathrooms}
            </span>
            <span>·</span>
            <span>
              {apartment.max_guests} {t.apartments.guests}
            </span>
          </div>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-clayDeep transition group-hover:gap-2">
            {t.apartments.viewDetails} <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
