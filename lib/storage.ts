import { Project } from './types';

const STORAGE_KEY = 'muhammadsalim_next_projects';
const AUTH_KEY = 'muhammadsalim_next_admin_auth';

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'SavdoHub - E-Commerce Platformasi',
    category: 'ecommerce',
    description: 'Katta hajmdagi tovarlar katalogi, interaktiv savat, online to\'lov tizimlari (Payme, Click) va boshqaruv paneli bilan to\'liq ta\'minlangan onlayn savdo platformasi.',
    tech: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Redux Toolkit'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://demo-ecommerce.example.com',
    githubUrl: 'https://github.com/muhammadsalim/ecommerce-platform',
    createdAt: '2026-02-15'
  },
  {
    id: 'proj-2',
    title: 'Apex CRM & Analytics Dashboard',
    category: 'fullstack',
    description: 'Biznes jarayonlarini avtomatlashtirish, mijozlar oqimi va savdo statistikasini real vaqt rejimida diagrammalar orqali kuzatish tizimi.',
    tech: ['Next.js 14', 'TypeScript', 'Prisma', 'Chart.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://demo-crm.example.com',
    githubUrl: 'https://github.com/muhammadsalim/apex-crm-dashboard',
    createdAt: '2026-03-01'
  },
  {
    id: 'proj-3',
    title: 'RestoBot - Telegram WebApp & Yetkazib berish xizmati',
    category: 'telegram',
    description: 'Restoranlar uchun Telegram Mini App orqali menyuni ko\'rish, taomlarni tanlash va geo-lokatsiya bo\'yicha buyurtma berish imkoniyatiga ega avtomatlashtirilgan tizim.',
    tech: ['Telegram WebApp API', 'React', 'Node.js', 'Fastify', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://t.me/example_delivery_bot',
    githubUrl: 'https://github.com/muhammadsalim/telegram-delivery-webapp',
    createdAt: '2026-03-20'
  },
  {
    id: 'proj-4',
    title: 'DevTask - Jamoaviy Loyihalar Boshqaruvi',
    category: 'frontend',
    description: 'Trello va Jira uslubidagi interaktiv Kanban doskasi. Drag-and-drop vazifalar boshqaruvi, filtrlar va qorong\'i/yorug\' mavzu qo\'llab-quvvatlovi.',
    tech: ['React', 'Next.js', 'HTML5 Drag & Drop', 'Zustand', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://demo-kanban.example.com',
    githubUrl: 'https://github.com/muhammadsalim/devtask-kanban',
    createdAt: '2026-04-05'
  },
  {
    id: 'proj-5',
    title: 'CryptoPulse - Kriptovalyuta Kurslari va Yangiliklar Portali',
    category: 'frontend',
    description: 'CoinGecko API orqali real vaqtdagi 500+ kriptovalyutalarning narxlari, jonli grafiklar va bozor tahlillarini ko\'rsatuvchi portal.',
    tech: ['Next.js', 'REST API', 'TradingView Widgets', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://cryptopulse.example.com',
    githubUrl: 'https://github.com/muhammadsalim/cryptopulse-tracker',
    createdAt: '2026-04-18'
  },
  {
    id: 'proj-6',
    title: 'EduCore - Onlayn Ta\'lim Platformasi',
    category: 'fullstack',
    description: 'O\'quvchilar va o\'qituvchilar uchun video darsliklar, testlar topshirish, reyting tizimi va sertifikat generatsiyasi mavjud ta\'lim platformasi.',
    tech: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://educore.example.com',
    githubUrl: 'https://github.com/muhammadsalim/educore-learning',
    createdAt: '2026-05-02'
  }
];

export function getStoredProjects(): Project[] {
  if (typeof window === 'undefined') return DEFAULT_PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading projects', e);
    return DEFAULT_PROJECTS;
  }
}

export function saveNewProject(projectData: Omit<Project, 'id' | 'createdAt'>): Project {
  const current = getStoredProjects();
  const newProj: Project = {
    ...projectData,
    id: 'proj-' + Date.now(),
    createdAt: new Date().toISOString().split('T')[0]
  };
  const updated = [newProj, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newProj;
}

export function removeProject(id: string): Project[] {
  const current = getStoredProjects();
  const filtered = current.filter(p => p.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
  return filtered;
}

export function resetDefaultProjects(): Project[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  }
  return DEFAULT_PROJECTS;
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function loginAdmin(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(AUTH_KEY, 'true');
  }
}

export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_KEY);
  }
}
