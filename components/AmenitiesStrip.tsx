"use client";

import { useLanguage } from "@/lib/i18n";

export default function AmenitiesStrip() {
  const { t } = useLanguage();
  const items = t.amenities.items;
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-gold/20 bg-night py-4">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <span
            key={i}
            className="eyebrow flex items-center gap-3 whitespace-nowrap text-ivory/80"
          >
            <span className="h-1 w-1 rounded-full bg-gold" />
            {item.label}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
