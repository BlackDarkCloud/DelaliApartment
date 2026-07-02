"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-night/10 bg-sand py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-night/60 sm:flex-row">
        <p className="font-display text-base text-night">
          Delali <span className="italic text-clay">Apartment</span>
        </p>
        <p>
          © {year} Delali Apartment · DVA, Lomé, Togo · {t.footer.rights}
        </p>
        <Link href="/admin" className="hover:text-clay">
          {t.footer.admin}
        </Link>
      </div>
    </footer>
  );
}
