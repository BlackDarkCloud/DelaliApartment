"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { whatsappLink, DEFAULT_WHATSAPP } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  if (pathname?.startsWith("/admin")) return null;

  const message =
    lang === "fr"
      ? "Bonjour, je suis intéressé(e) par un séjour à Delali Apartment."
      : "Hello, I'm interested in a stay at Delali Apartment.";

  return (
    <motion.a
      href={whatsappLink(DEFAULT_WHATSAPP, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="focus-ring fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-palm text-ivory shadow-glow sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 rounded-full bg-palm animate-pulseRing" />
      <MessageCircle size={26} className="relative" strokeWidth={2} />
    </motion.a>
  );
}
