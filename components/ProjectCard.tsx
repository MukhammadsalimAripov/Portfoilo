"use client";

import React, { useState } from 'react';
import { Project } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { ExternalLink, Github, Eye, X, Calendar, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useLanguage();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const categoryLabel = t[`filter_${project.category}` as keyof typeof t] || project.category;

  return (
    <>
      <article className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col">
        {/* Thumbnail Wrap */}
        <div className="relative w-full h-52 sm:h-56 bg-slate-950 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          
          {/* Category Tag */}
          <span className="absolute top-4 right-4 py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
            {categoryLabel}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 line-clamp-3 leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="py-1 px-2.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Card Footer Actions - Prominent Button that opens the link */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            {/* Main prominent button that opens the project link */}
            {(project.demoUrl || project.githubUrl) ? (
              <a
                href={project.demoUrl || project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all"
                title={project.demoUrl || project.githubUrl}
              >
                <span>{t.btn_open_project}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => setIsDetailOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{t.btn_details}</span>
              </button>
            )}

            {/* Secondary actions: Details & GitHub */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsDetailOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.btn_details}</span>
              </button>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs transition-colors"
                  title={t.btn_code}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Details Modal */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsDetailOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-64 rounded-2xl overflow-hidden mb-6 bg-slate-950">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500">
              <span className="py-1 px-3 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 uppercase">
                {categoryLabel}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {project.createdAt}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {project.title}
            </h3>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {project.description}
            </p>

            <div className="mb-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                {t.skills_title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tItem, idx) => (
                  <span
                    key={idx}
                    className="py-1.5 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {tItem}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-md shadow-indigo-600/20"
                >
                  <span>{t.btn_open_project}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>{t.btn_code}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
