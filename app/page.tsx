"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ContactSection } from '@/components/ContactSection';
import { getStoredProjects, isAdminLoggedIn } from '@/lib/storage';
import { useLanguage } from '@/context/LanguageContext';
import { AdminModal } from '@/components/AdminModal';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Sparkles } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [projectCount, setProjectCount] = useState(6);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const projects = getStoredProjects();
    setProjectCount(projects.length);
  }, []);

  const handleAdminClick = () => {
    if (isAdminLoggedIn()) {
      router.push('/admin');
    } else {
      setIsAdminOpen(true);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection projectCount={projectCount} />

      {/* About Me Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* CTA to Projects */}
      <section className="py-16 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl p-8 sm:p-12 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>{t.nav_projects}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                {t.projects_title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
                {t.projects_subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] transition-all"
              >
                <span>{t.btn_view_projects}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={handleAdminClick}
                className="inline-flex items-center gap-2 py-3.5 px-6 rounded-2xl border border-pink-500/30 bg-pink-500/10 text-pink-600 dark:text-pink-400 font-semibold text-sm hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>{t.btn_admin_only}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Admin Modal */}
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
