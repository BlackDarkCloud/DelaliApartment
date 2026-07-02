"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { dictionary, type Lang } from "./dictionary";

type LanguageContextValue = {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  t: (typeof dictionary)[Lang];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("delali-lang") as Lang | null;
    if (stored === "fr" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("delali-lang", next);
    document.documentElement.lang = next;
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "fr" ? "en" : "fr");
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider
      value={{ lang, toggleLang, setLang, t: dictionary[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
