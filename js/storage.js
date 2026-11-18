// Storage management for projects
const STORAGE_KEY = 'muhammadsalim_portfolio_projects';

// Default initial projects for Muhammadsalim's portfolio
const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'SavdoHub - Zamonaviy E-Commerce Platformasi',
    category: 'ecommerce',
    description: 'Katta hajmdagi tovarlar katalogi, interaktiv savat, online to\'lov tizimlari (Payme, Click) va boshqaruv paneli bilan to\'liq ta\'minlangan onlayn savdo platformasi.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Redux Toolkit'],
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
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Chart.js', 'Tailwind CSS'],
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
    tech: ['Telegram WebApp API', 'JavaScript', 'Node.js', 'Fastify', 'PostgreSQL'],
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
    tech: ['React', 'HTML5 Drag & Drop', 'Zustand', 'CSS Modules'],
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
    tech: ['JavaScript (ES6+)', 'REST API', 'TradingView Widgets', 'SCSS'],
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://cryptopulse.example.com',
    githubUrl: 'https://github.com/muhammadsalim/cryptopulse-tracker',
    createdAt: '2026-04-18'
  },
  {
    id: 'proj-6',
    title: 'EduCore - Onlayn Ta\'lim va Kurslar Veb-Sayti',
    category: 'fullstack',
    description: 'O\'quvchilar va o\'qituvchilar uchun video darsliklar, testlar topshirish, reyting tizimi va sertifikat generatsiyasi mavjud ta\'lim platformasi.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1000&q=80',
    demoUrl: 'https://educore.example.com',
    githubUrl: 'https://github.com/muhammadsalim/educore-learning',
    createdAt: '2026-05-02'
  }
];

// Initialize storage if empty
function initializeStorage() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  }
}

// Get all projects
function getProjects() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return [...DEFAULT_PROJECTS];
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading projects from storage', e);
    return [...DEFAULT_PROJECTS];
  }
}

// Add a new project
function addProject(project) {
  const projects = getProjects();
  const newProject = {
    id: 'proj-' + Date.now(),
    title: project.title.trim(),
    category: project.category || 'frontend',
    description: project.description.trim(),
    tech: Array.isArray(project.tech) ? project.tech : project.tech.split(',').map(t => t.trim()).filter(Boolean),
    image: project.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
    demoUrl: project.demoUrl?.trim() || '',
    githubUrl: project.githubUrl?.trim() || '',
    createdAt: new Date().toISOString().split('T')[0]
  };
  projects.unshift(newProject);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return newProject;
}

// Delete project by ID
function deleteProject(id) {
  let projects = getProjects();
  projects = projects.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return projects;
}

// Reset to default seed projects
function resetProjectsToDefaults() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  return [...DEFAULT_PROJECTS];
}

// Auto initialize on script load
initializeStorage();
