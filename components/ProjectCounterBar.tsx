"use client";

import React from 'react';
import { Project } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { FolderGit2, Code, Layers, ShoppingBag } from 'lucide-react';

interface ProjectCounterBarProps {
  projects: Project[];
}

export function ProjectCounterBar({ projects }: ProjectCounterBarProps) {
  const { t } = useLanguage();

  const total = projects.length;
  const frontend = projects.filter(p => p.category === 'frontend').length;
  const fullstack = projects.filter(p => p.category === 'fullstack').length;
  const ecommerce = projects.filter(p => p.category === 'ecommerce' || p.category === 'telegram').length;

  const stats = [
    {
      label: t.counter_total,
      count: total,
      icon: FolderGit2,
      color: "from-indigo-500/15 to-purple-500/15 text-indigo-500 border-indigo-500/30",
    },
    {
      label: t.counter_frontend,
      count: frontend,
      icon: Code,
      color: "from-blue-500/15 to-cyan-500/15 text-blue-500 border-blue-500/30",
    },
    {
      label: t.counter_fullstack,
      count: fullstack,
      icon: Layers,
      color: "from-purple-500/15 to-pink-500/15 text-purple-500 border-purple-500/30",
    },
    {
      label: t.counter_ecommerce,
      count: ecommerce,
      icon: ShoppingBag,
      color: "from-pink-500/15 to-rose-500/15 text-pink-500 border-pink-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="rounded-3xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300"
          >
            <div className={`p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr ${stat.color} border shrink-0`}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-none">
                {stat.count}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
