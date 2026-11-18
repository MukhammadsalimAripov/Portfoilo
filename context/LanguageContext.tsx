"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '@/lib/types';
import { translations } from '@/lib/translations';

interface LanguageContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.ru;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ru');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('muhammadsalim_next_lang') as Language;
    if (saved === 'ru' || saved === 'uzb') {
      setLang(saved);
    }
  }, []);

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('muhammadsalim_next_lang', newLang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(lang === 'ru' ? 'uzb' : 'ru');
  };

  const t = translations[lang] || translations.ru;

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
