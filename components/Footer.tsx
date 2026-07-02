"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import TogoFlag from "./TogoFlag";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/15 bg-night py-10 text-ivory">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-ivory/60 sm:flex-row">
        <p className="font-display text-base text-ivory">
          Delali <span className="italic text-goldSoft">Apartment</span>
        </p>
        <p className="flex items-center gap-2">
          <TogoFlag className="h-3 w-4 rounded-[1px]" />© {year} Delali Apartment · DVA,
          Lomé, Togo · {t.footer.rights}
        </p>
        <Link href="/admin" className="transition hover:text-goldSoft">
          {t.footer.admin}
        </Link>
      </div>
    </footer>
  );
}
