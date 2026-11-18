"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Layout, Server, Wrench } from 'lucide-react';

export function SkillsSection() {
  const { t } = useLanguage();

  const skillGroups = [
    {
      title: t.skill_frontend,
      icon: Layout,
      color: "from-blue-500/20 to-indigo-500/20 text-indigo-500",
      skills: ["Next.js 14", "React.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Zustand", "HTML5 & CSS3", "Framer Motion"]
    },
    {
      title: t.skill_backend,
      icon: Server,
      color: "from-purple-500/20 to-pink-500/20 text-purple-500",
      skills: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Prisma ORM", "REST API", "Telegram Bot API", "NextAuth / JWT"]
    },
    {
      title: t.skill_tools,
      icon: Wrench,
      color: "from-pink-500/20 to-rose-500/20 text-pink-500",
      skills: ["Git & GitHub", "Vercel Deploy", "Docker Basics", "Postman", "Figma", "VS Code", "PNPM / NPM", "Linux CLI"]
    }
  ];

  return (
    <section id="skills" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {t.skills_title}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            {t.skills_subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-tr ${group.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {group.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="py-1.5 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
