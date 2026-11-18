"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Send, MapPin, CheckCircle, Github } from 'lucide-react';

export function ContactSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', contact: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {t.nav_contact}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            {t.contact_title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base">
            {t.contact_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Card */}
          <div className="lg:col-span-5 rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t.contact_tg_phone}</span>
                <p className="text-base font-bold text-slate-900 dark:text-white">@imvibeprogramist</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Email</span>
                <p className="text-base font-bold text-slate-900 dark:text-white">azizaaripova1957@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t.contact_location}</span>
                <p className="text-base font-bold text-slate-900 dark:text-white">{t.about_location_val}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-3">GitHub Profile</span>
              <a
                href="https://github.com/muhammadsalim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>github.com/muhammadsalim</span>
              </a>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center animate-fade-in">
                <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {t.contact_success}
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase">
                    {t.contact_name_ph}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Мухаммадсалим"
                    className="w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase">
                    {t.contact_email_ph}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="example@mail.com или @username"
                    className="w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase">
                    {t.contact_message_ph}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact_message_ph}
                    className="w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <span>{t.contact_send_msg}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
