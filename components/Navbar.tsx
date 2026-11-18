"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { isAdminLoggedIn } from '@/lib/storage';
import { AdminModal } from './AdminModal';
import { Sun, Moon, Lock, Menu, X, Sparkles } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAdminClick = () => {
    if (isAdminLoggedIn()) {
      router.push('/admin');
    } else {
      setIsAdminModalOpen(true);
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: t.nav_home },
    { href: '/#about', label: t.nav_about },
    { href: '/#skills', label: t.nav_skills },
    { href: '/projects', label: t.nav_projects },
    { href: '/#contact', label: t.nav_contact },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo - Sirius Team */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-all">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 drop-shadow" />
              S
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-wider bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                {t.brand_team || "SIRIUS"}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 -mt-1">
                {t.brand_tagline || "Web Dev Team"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 relative py-1 ${
                    isActive 
                      ? 'text-indigo-600 dark:text-indigo-400 font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Lang Switch, Theme Switch, Admin Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
              title="Переключить язык (UZB / RU)"
            >
              <span className={`px-2.5 py-1 rounded-full transition-all ${lang === 'uzb' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
                UZB
              </span>
              <span className={`px-2.5 py-1 rounded-full transition-all ${lang === 'ru' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
                RU
              </span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all"
              title="Сменить тему (Светлая / Тёмная)"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Admin Only Button */}
            <button
              onClick={handleAdminClick}
              className="flex items-center gap-1.5 py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold border border-pink-500/30 bg-pink-500/10 text-pink-600 dark:text-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-pink-500/25 transition-all"
              title={t.btn_admin_only}
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.nav_admin_short}</span>
              <span className="sm:hidden">{t.nav_admin_short}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 bg-white dark:bg-slate-900 h-full p-6 shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 z-10 animate-slide-in-right">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-base shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1" />
                    S
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight">
                      {t.brand_team || "SIRIUS"}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {t.brand_tagline || "Web Dev Team"}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <button
                onClick={handleAdminClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-pink-500/10 border border-pink-500/30 text-pink-600 dark:text-pink-400"
              >
                <Lock className="w-4 h-4" />
                <span>{t.btn_admin_only}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Password Modal */}
      <AdminModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />
    </>
  );
}
