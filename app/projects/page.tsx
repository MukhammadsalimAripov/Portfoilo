"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Project, ProjectCategory } from '@/lib/types';
import { getStoredProjects, isAdminLoggedIn } from '@/lib/storage';
import { useLanguage } from '@/context/LanguageContext';
import { ProjectCounterBar } from '@/components/ProjectCounterBar';
import { ProjectCard } from '@/components/ProjectCard';
import { AdminModal } from '@/components/AdminModal';
import { Search, Plus, FolderOpen, ArrowLeft, ExternalLink, Github } from 'lucide-react';

export default function ProjectsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  const handleAdminAddClick = () => {
    if (isAdminLoggedIn()) {
      router.push('/admin');
    } else {
      setIsAdminOpen(true);
    }
  };

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: t.filter_all },
    { key: 'frontend', label: t.filter_frontend },
    { key: 'fullstack', label: t.filter_fullstack },
    { key: 'ecommerce', label: t.filter_ecommerce },
    { key: 'telegram', label: t.filter_telegram },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.btn_back_home}</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {t.nav_projects}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
            {t.projects_title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base">
            {t.projects_subtitle}
          </p>
        </div>

        {/* Live Project Counter Bar (Счётчик проектов) */}
        <ProjectCounterBar projects={projects} />

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search_placeholder}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Add Project (Admin protected shortcut) */}
          <div className="w-full md:w-auto flex justify-end">
            <button
              type="button"
              onClick={handleAdminAddClick}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-pink-500/30 bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-bold hover:bg-pink-500 hover:text-white transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{t.admin_form_title}</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center p-8">
            <FolderOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {t.no_projects_found}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.search_placeholder}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Bottom Button to Open Link (Внизу проектов кнопка, которая открывает ссылку) */}
        <div className="mt-16 text-center rounded-3xl p-8 sm:p-12 bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-xl">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
              {t.bottom_projects_title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6">
              {t.bottom_projects_desc}
            </p>
            <a
              href="https://github.com/muhammadsalim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Github className="w-5 h-5" />
              <span>{t.bottom_projects_btn}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
