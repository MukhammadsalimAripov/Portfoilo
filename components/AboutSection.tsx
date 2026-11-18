"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Code, Smartphone, Zap, MapPin, ArrowRight, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

export function AboutSection() {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: t.member1_name,
      role: t.member1_role,
      badge: t.member1_badge,
      desc: t.member1_desc,
      avatarInitials: "MS",
      avatarGradient: "from-indigo-600 via-purple-600 to-pink-600",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
      location: t.member1_location,
      status: t.member1_status,
    },
    {
      name: t.member2_name,
      role: t.member2_role,
      badge: t.member2_badge,
      desc: t.member2_desc,
      avatarInitials: "M",
      avatarGradient: "from-purple-600 via-pink-600 to-amber-500",
      skills: ["React", "Next.js", "JavaScript", "Tailwind CSS", "UI/UX"],
      location: t.member2_location,
      status: t.member2_status,
    },
  ];

  const highlights = [
    {
      icon: Code,
      title: t.card1_title,
      desc: t.card1_desc,
      color: "from-indigo-500/20 to-purple-500/20 text-indigo-500",
    },
    {
      icon: Smartphone,
      title: t.card2_title,
      desc: t.card2_desc,
      color: "from-purple-500/20 to-pink-500/20 text-purple-500",
    },
    {
      icon: Zap,
      title: t.card3_title,
      desc: t.card3_desc,
      color: "from-pink-500/20 to-amber-500/20 text-pink-500",
    },
  ];

  return (
    <section id="about" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.about_team_tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.about_subtitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base sm:text-lg leading-relaxed">
            {t.about_team_intro}
          </p>
        </div>

        {/* 2 Team Members Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative rounded-3xl p-8 sm:p-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group"
            >
              <div>
                {/* Member Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${member.avatarGradient} flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform shrink-0`}>
                      {member.avatarInitials}
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {member.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                          {member.role}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-300 font-semibold">
                          {member.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{member.status}</span>
                  </div>
                </div>

                {/* Bio Description */}
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                  {member.desc}
                </p>

                {/* Tech Skills Pills */}
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                    {t.member_stack_label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Location & Team Attribution */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
                  <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>{member.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{t.sirius_dev_label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Strengths Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-start gap-5 hover:border-indigo-500/40 transition-colors"
              >
                <div className={`p-4 rounded-2xl bg-gradient-to-tr ${item.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{t.btn_view_projects}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 py-3.5 px-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all"
          >
            <span>{t.btn_contact_me}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
