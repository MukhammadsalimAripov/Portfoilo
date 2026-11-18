"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project, ProjectCategory } from '@/lib/types';
import { getStoredProjects, saveNewProject, removeProject, resetDefaultProjects, isAdminLoggedIn, logoutAdmin } from '@/lib/storage';
import { useLanguage } from '@/context/LanguageContext';
import { AdminModal } from '@/components/AdminModal';
import { Plus, Trash2, RotateCcw, LogOut, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Check, Eye } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'frontend' | 'fullstack' | 'ecommerce' | 'telegram' | 'other'>('frontend');
  const [description, setDescription] = useState('');
  const [tech, setTech] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [imageMode, setImageMode] = useState<'url' | 'file'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFileBase64, setImageFileBase64] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const authed = isAdminLoggedIn();
    setIsAuthenticated(authed);
    if (authed) {
      setProjects(getStoredProjects());
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageFileBase64(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !tech.trim()) return;

    let finalImage = imageMode === 'file' && imageFileBase64 ? imageFileBase64 : imageUrl.trim();
    if (!finalImage) {
      finalImage = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80';
    }

    const techArray = tech.split(',').map(s => s.trim()).filter(Boolean);

    saveNewProject({
      title: title.trim(),
      category,
      description: description.trim(),
      tech: techArray,
      image: finalImage,
      demoUrl: demoUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
    });

    setProjects(getStoredProjects());

    // Reset Form
    setTitle('');
    setDescription('');
    setTech('');
    setDemoUrl('');
    setGithubUrl('');
    setImageUrl('');
    setImageFileBase64('');
    setImageMode('url');

    setSuccessMsg(t.admin_project_added);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleDelete = (id: string) => {
    if (confirm(t.admin_delete_confirm)) {
      const updated = removeProject(id);
      setProjects(updated);
    }
  };

  const handleResetDefaults = () => {
    const defaults = resetDefaultProjects();
    setProjects(defaults);
    setSuccessMsg(t.admin_restored_defaults);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleLogout = () => {
    logoutAdmin();
    router.push('/');
  };

  // If not logged in, show Password prompt modal directly
  if (isAuthenticated === false) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <AdminModal isOpen={true} onClose={() => router.push('/')} />
      </div>
    );
  }

  if (isAuthenticated === null) {
    return null; // loading check
  }

  const currentPreviewImage = imageMode === 'file' ? imageFileBase64 : imageUrl;

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.admin_title}
            </h1>
            <span className="py-0.5 px-3 rounded-full text-xs font-bold uppercase bg-pink-500 text-white">
              Admin
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.admin_subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => router.push('/projects')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.nav_projects}</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.admin_btn_reset_defaults}</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.nav_logout}</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="mb-8 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold text-sm animate-fade-in flex items-center gap-2">
          <Check className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Grid: Add form (Left) vs Project list (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Add Project Form */}
        <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-500" />
            <span>{t.admin_form_title}</span>
          </h2>

          <form onSubmit={handleCreateProject} className="space-y-4 text-sm">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                {t.admin_field_title}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.admin_field_title_ph}
                className="w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                {t.admin_field_category}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="frontend">Frontend</option>
                <option value="fullstack">Fullstack</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="telegram">Telegram Bot</option>
                <option value="other">Other / Boshqa</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                {t.admin_field_desc}
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.admin_field_desc_ph}
                className="w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                {t.admin_field_tech}
              </label>
              <input
                type="text"
                required
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                placeholder={t.admin_field_tech_ph}
                className="w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Image Mode */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase">
                {t.admin_field_img_type}
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    imageMode === 'url'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>{t.admin_field_img_url_tab}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('file')}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    imageMode === 'file'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{t.admin_field_img_file_tab}</span>
                </button>
              </div>

              {imageMode === 'url' ? (
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder={t.admin_field_img_ph}
                  className="w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-2 text-slate-900 dark:text-white file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white cursor-pointer"
                />
              )}

              {/* Preview Box */}
              {currentPreviewImage && (
                <div className="mt-3 w-full h-32 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950">
                  <img
                    src={currentPreviewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Demo URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                {t.admin_field_demo}
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder={t.admin_field_demo_ph}
                className="w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                {t.admin_field_github}
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder={t.admin_field_github_ph}
                className="w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 pt-3"
            >
              <Plus className="w-4 h-4" />
              <span>{t.admin_btn_save}</span>
            </button>
          </form>
        </div>

        {/* Right: Existing Project List */}
        <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.admin_list_title}
            </h2>
            <span className="py-1 px-3 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              {projects.length}
            </span>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {project.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {project.tech.slice(0, 3).join(', ')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                  title={t.admin_btn_delete}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
