"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { supabase } from "@/lib/supabaseClient";
import { whatsappLink } from "@/lib/whatsapp";
import type { Apartment } from "@/lib/types";

export default function ApartmentDetailPage() {
  const params = useParams<{ slug: string }>();
  const { t, lang } = useLanguage();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data } = await supabase
        .from("apartments")
        .select("*")
        .eq("slug", params.slug)
        .single();
      if (active) {
        setApartment((data as Apartment) ?? null);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [params.slug]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="mx-auto max-w-6xl px-6 py-24 text-center text-night/50">
          …
        </div>
        <Footer />
      </>
    );
  }

  if (!apartment) {
    return (
      <>
        <Header />
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="text-night/60">404</p>
          <Link href="/#apartments" className="mt-4 inline-block text-clayDeep underline">
            {t.detail.back}
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const description = lang === "fr" ? apartment.description_fr : apartment.description_en;
  const images = apartment.images?.length ? apartment.images : [];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/#apartments" className="eyebrow text-night/50 hover:text-clay">
          ← {t.detail.back}
        </Link>

        <h1 className="mt-4 font-display text-3xl font-semibold text-night sm:text-4xl">
          {apartment.name}
        </h1>
        <p className="mt-2 text-night/60">{apartment.address}</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-[2fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sandDeep">
            {images[activeImage] && (
              <Image
                src={images[activeImage]}
                alt={apartment.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            )}
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-1">
            {images.slice(0, 4).map((img, i) => (
              <button
                key={img + i}
                onClick={() => setActiveImage(i)}
                className={`focus-ring relative aspect-square overflow-hidden rounded-xl border-2 ${
                  activeImage === i ? "border-clay" : "border-transparent"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="120px" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-display text-xl font-semibold text-night">
              {t.detail.about}
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-night/70">
              {description}
            </p>

            <h2 className="mt-10 font-display text-xl font-semibold text-night">
              {t.detail.amenities}
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-night/70">
              {apartment.amenities?.map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {a}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-6 border-t border-night/10 pt-6 text-sm text-night/70">
              <span>
                {apartment.bedrooms} {t.apartments.bedrooms}
              </span>
              <span>
                {apartment.bathrooms} {t.apartments.bathrooms}
              </span>
              <span>
                {apartment.max_guests} {t.apartments.guests}
              </span>
            </div>
          </div>

          <aside className="h-fit rounded-2xl bg-night p-7 text-ivory shadow-card">
            <p className="font-mono text-2xl font-semibold">
              {apartment.price_per_night.toLocaleString(
                lang === "fr" ? "fr-FR" : "en-US"
              )}{" "}
              {apartment.currency}
              <span className="ml-1 text-sm font-normal text-ivory/60">
                {t.apartments.perNight}
              </span>
            </p>
            <h3 className="mt-6 font-display text-lg font-semibold">
              {t.detail.contactTitle}
            </h3>
            <p className="mt-2 text-sm text-ivory/70">{t.detail.contactBody}</p>
            <a
              href={whatsappLink(
                apartment.whatsapp_number,
                lang === "fr"
                  ? `Bonjour, je suis intéressé(e) par "${apartment.name}" (${apartment.address}).`
                  : `Hello, I'm interested in "${apartment.name}" (${apartment.address}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-6 block rounded-full bg-palm px-6 py-3 text-center text-sm font-medium text-ivory transition hover:bg-palmDeep"
            >
              {t.detail.whatsappCta}
            </a>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
