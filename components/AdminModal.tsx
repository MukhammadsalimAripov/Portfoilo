"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ADMIN_PASSWORD } from '@/lib/translations';
import { loginAdmin } from '@/lib/storage';
import { Lock, Eye, EyeOff, X, ArrowRight } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError(t.modal_error_empty);
      return;
    }

    if (password.trim() === ADMIN_PASSWORD) {
      setIsSuccess(true);
      loginAdmin();
      setTimeout(() => {
        setIsSuccess(false);
        setPassword('');
        onClose();
        router.push('/admin');
      }, 500);
    } else {
      setError(t.modal_error_wrong);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className={`relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-2xl transition-all duration-300 ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 text-pink-500 border border-pink-500/30">
          <Lock className="w-7 h-7" />
        </div>

        {/* Title & Desc */}
        <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
          {t.modal_admin_title}
        </h3>
        <p className="text-sm text-center text-slate-600 dark:text-slate-400 mb-6">
          {t.modal_admin_subtitle}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.modal_password_placeholder}
              className={`w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all ${
                error 
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/30' 
                  : isSuccess
                  ? 'border-emerald-500 focus:ring-2 focus:ring-emerald-500/30'
                  : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400'
              }`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <p className="text-xs font-medium text-red-500 mt-1 animate-fade-in">
              {error}
            </p>
          )}

          {isSuccess && (
            <p className="text-xs font-medium text-emerald-500 mt-1 animate-fade-in">
              {t.modal_success}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {t.modal_btn_cancel}
            </button>

            <button
              type="submit"
              className="w-1/2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{t.modal_btn_submit}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
