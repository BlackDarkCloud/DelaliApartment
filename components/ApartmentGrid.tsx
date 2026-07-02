"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { supabase } from "@/lib/supabaseClient";
import type { Apartment } from "@/lib/types";
import ApartmentCard from "./ApartmentCard";
import Reveal from "./Reveal";

export default function ApartmentGrid() {
  const { t } = useLanguage();
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from("apartments")
        .select("*")
        .order("created_at", { ascending: false });
      if (active) {
        if (!error && data) setApartments(data as Apartment[]);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="apartments" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="eyebrow text-clayDeep">{t.apartments.eyebrow}</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-night sm:text-4xl">
          {t.apartments.title}
        </h2>
        <p className="mt-4 max-w-xl text-night/65">{t.apartments.subtitle}</p>
      </Reveal>

      {loading ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="aspect-[4/5] animate-pulse rounded-2xl bg-sandDeep"
            />
          ))}
        </div>
      ) : apartments.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-night/20 p-10 text-center text-night/50">
          {t.apartments.empty}
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apartments.map((apt, i) => (
            <Reveal key={apt.id} delay={Math.min(i, 4) * 0.08}>
              <ApartmentCard apartment={apt} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
