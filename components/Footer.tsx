"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { AdminModal } from './AdminModal';
import { Lock, Sparkles, Github, Send } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Rights */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              S
            </div>
            <span className="font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t.brand_team || "SIRIUS"}
            </span>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            © 2026 Sirius Team. {t.footer_rights}
          </span>
        </div>

        {/* Links & Admin Trigger */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://t.me/imvibeprogramist"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            title="Telegram"
          >
            <Send className="w-5 h-5" />
          </a>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold text-pink-600 dark:text-pink-400 bg-pink-500/10 border border-pink-500/20 hover:bg-pink-500/20 transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{t.btn_admin_only}</span>
          </button>
        </div>
      </div>

      {/* Admin Modal */}
      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </footer>
  );
}
