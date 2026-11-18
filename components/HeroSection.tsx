"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { isAdminLoggedIn } from '@/lib/storage';
import { AdminModal } from './AdminModal';
import { ArrowRight, Lock, Sparkles, Code2, Layers, Cpu, Users } from 'lucide-react';

export function HeroSection({ projectCount = 6 }: { projectCount?: number }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleAdminClick = () => {
    if (isAdminLoggedIn()) {
      router.push('/admin');
    } else {
      setIsAdminOpen(true);
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{t.hero_badge}</span>
            </div>

            {/* Greeting */}
            <p className="text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-400 mb-1">
              {t.hero_greeting}
            </p>

            {/* Name */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {t.hero_name}
            </h1>

            {/* Role */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              {t.hero_role}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-8">
              {t.hero_desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
              {/* View Projects Button */}
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>{t.btn_view_projects}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Admin Only Button */}
              <button
                type="button"
                onClick={handleAdminClick}
                className="inline-flex items-center gap-2 py-3.5 px-6 rounded-2xl border border-pink-500/30 bg-pink-500/10 text-pink-600 dark:text-pink-400 font-semibold text-sm sm:text-base hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-pink-500/25 transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>{t.btn_admin_only}</span>
              </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {t.hero_exp_years}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {t.hero_exp_label}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {projectCount}+
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {t.hero_projects_label}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {t.hero_clients_label}
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Developer Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-80 sm:w-96 rounded-3xl p-6 bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-2xl">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 -z-10" />

              {/* Team Avatars */}
              <div className="flex items-center justify-center -space-x-4 mb-6">
                <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-xl z-20">
                  <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center text-white">
                    <span className="text-xl font-black">MS</span>
                    <span className="text-[9px] font-semibold text-indigo-300">Salim</span>
                  </div>
                </div>
                <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-500 shadow-xl z-10">
                  <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center text-white">
                    <span className="text-xl font-black">M</span>
                    <span className="text-[9px] font-semibold text-pink-300">Muhammad</span>
                  </div>
                </div>
              </div>

              {/* Dev title */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Team Sirius</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Мухаммадсалим & Мухаммад
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  Web Developers • Next.js & React
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="py-1 px-3 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  Next.js 14
                </span>
                <span className="py-1 px-3 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  TypeScript
                </span>
                <span className="py-1 px-3 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  React
                </span>
                <span className="py-1 px-3 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  Tailwind
                </span>
              </div>

              {/* Quick links to projects */}
              <Link
                href="/projects"
                className="w-full py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-indigo-500 hover:text-white transition-all"
              >
                <span>{t.btn_view_projects}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Floating Badge Left */}
              <div className="absolute -top-4 -left-6 py-2 px-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 animate-bounce">
                <Code2 className="w-4 h-4 text-indigo-500" />
                <span>Fullstack Next.js</span>
              </div>

              {/* Floating Badge Right */}
              <div className="absolute -bottom-4 -right-6 py-2 px-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 animate-pulse">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>UI/UX & Fast Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </section>
  );
}
