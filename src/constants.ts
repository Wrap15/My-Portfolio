export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image: string;
  date: string;
  githubLink?: string;
  architecture?: string[];
  challenges?: string;
  features?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills' | 'Other';
}

export const PROJECTS: Project[] = [
  {
    id: '6',
    title: 'OnlyProfit',
    date: 'May 2026',
    description: 'A high-performance financial market intelligence simulator for tracking Indian equities and mutual funds. Combines live stock quotes, interactive TradingView-style charts, thematic portfolio baskets, mutual fund CAGR comparisons, and a custom SIP & Lumpsum return yield calculator with zero UI lag using skeleton loaders and CLS optimization.',
    tags: ['Next.js 14', 'React', 'Zustand', 'Tailwind CSS', 'Axios', 'TradingView Charts', 'Yahoo Finance API', 'AMFI API'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fonlyprofit-stock-analyzer.vercel.app%2F?w=800&h=600',
    link: 'https://onlyprofit-stock-analyzer.vercel.app/',
    githubLink: 'https://github.com/Wrap15/OnlyProfit-Stock_Analyzer',
    features: [
      '📊 Real-time NSE Stock Tracking & Interactive Charts — Provides simulated real-time ticks supporting 20-day Simple Moving Average (SMA-20) overlays.',
      '📦 Thematic Investment Baskets — Curated smallcase-style baskets (e.g., Green Energy, Digital India, Infrastructure) with customized company allocations.',
      '📈 Mutual Fund Analytics — Highlights top small-cap, index, and flexi-cap growth funds with CAGR return comparisons and live NAV quotes.',
      '💰 SIP & Lumpsum Return Simulator — Computes estimated returns dynamically using high-precision calculations accompanied by interactive SVG charts.',
      '⚡ Ultra-Fast Cache Orchestration — Implements Axios deduplication and dual-layer cache engines (client state and server memory) reducing API calls from 40+ to minimal counts.'
    ],
    architecture: [
      'Smart Request Deduplication: Merges overlapping endpoints dynamically to preserve API throughput.',
      'Lighthouse Peak Optimization: Implements asynchronous shimmer blocks to eliminate Cumulative Layout Shift (CLS).',
      'Dual-Layer Memory Cache: Synchronizes 15-second stock arrays and 1-hour mutual fund values with fallback algorithms.',
      'SEO Structured Schema: Dynamic JSON-LD structured mappings (WebSite & FinancialProduct) and automated route sitemaps.'
    ],
    challenges: 'High-Concurrency Public API Limits — Resolving severe rate-limit blocking when loading simultaneous live stock quotes and historical tickers. Solved by decoupling query sequences, layering client-side Zustand store states with server-side response caching, and designing mathematically consistent seed metrics fallbacks to maintain 100% service availability.'
  },
  {
    id: '1',
    title: 'Shreeji Furniture',
    date: 'April 2026',
    description: 'An elegant furniture showcase website with a focus on interior design and craftsmanship. Features a interactive product catalog and responsive layout.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS','React 18 (Vite)','TypeScript','Framer Motion','Lucide React' ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    link: 'https://shreeji-furniture-bay.vercel.app/',
    features: [
      'Interactive visual catalogs with high-resolution responsive showcases.',
      'Advanced filtering by category, wood type, and design era.',
      'Immersive micro-interactions during viewport scrolling and detail expansion.',
      'Optimized lightweight asset delivery leveraging next-generation formats.'
    ],
    architecture: [
      'Vite & Single-Page Architecture: Enabled instantaneous sub-second render transitions.',
      'Framer Motion Springs: Drives custom spatial navigation vectors and list reorder animations.',
      'Declarative Tailwind Design: High-contrast layouts adjusting dynamically to modern viewports.'
    ],
    challenges: 'Seamless Image Loading & Visual Layout Fluidity — The major challenge lay in presenting ultra-high-resolution imagery across product galleries without introducing layout shifts (CLS) or slowing down load speeds. This was resolved by implementing blurred placeholder steps coupled with state-driven lazy loading, maintaining an impressive Lighthouse Performance rating (98+).'
  },
  {
    id: '2',
    title: 'IMDB Clone',
    date: 'March 2025',
    description: 'Designed and implemented a IMDB Clone using HTML, CSS, JavaScript and Tailwind CSS. Uses OMDB API to fetch movie details and allows users to search and save to favorites.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'OMDB API'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fvishaal98.github.io%2FIMDBClone%2F?w=800&h=600',
    link: 'https://vishaal98.github.io/IMDBClone/',
    features: [
      'Real-time keyword-based movie search linked directly to search indexing queries.',
      'Persistent "Favorites Room" leveraging client-side LocalStorage cache mechanics.',
      'Rich movie cards showcasing runtime duration, IMDB scores, casts, and storylines.',
      'Responsive masonry viewgrids for fluid mobile viewing.'
    ],
    architecture: [
      'Modular DOM Handlers: Vanilla state containers structuring asynchronous search loops.',
      'OMDB Endpoint Interceptors: Standard clean fetches mapping incoming movie objects safely.',
      'Tailwind CSS: Implements an immersive cinema-dark layout with elegant typography.'
    ],
    challenges: 'Search Debouncing & API Optimization — Avoiding API rate warnings when searching keyword fragments in real-time. Implemented a custom client-side debounce wrapper that delays API calls during active user keystrokes, dropping pending asynchronous queries when search values shift down rapidly.'
  },
  {
    id: '3',
    title: 'BuyBusy E-Commerce App',
    date: 'January 2025',
    description: 'A React-based e-commerce platform with Firebase integration for CRUD operations on cart items. Features a well-organized folder structure for scalability.',
    tags: ['React.js', 'Firebase', 'JavaScript', 'Tailwind CSS'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Ftangerine-gingersnap-3c8b63.netlify.app%2F?w=800&h=600',
    link: 'https://tangerine-gingersnap-3c8b63.netlify.app/',
    features: [
      'Real-time Firestore synchronization of catalog inventories and shopping cart items.',
      'Frictionless user authentication supporting persistent and secure session cookies.',
      'Complex multi-criteria filter bars supporting price range bars and dynamic brand checkboxes.',
      'Clean interactive CRUD cart updates with toast notifications.'
    ],
    architecture: [
      'React Context: Handles active global cart states, product catalogs, and search contexts.',
      'Firebase Firestore SDK: Integrates real-time snapshot sync boundaries with minimal query latency.',
      'Modular Directory Layout: Clean absolute division between views, components, and hooks.'
    ],
    challenges: 'Real-time Distributed Database Synchronization — Managing atomic count updates for high-concurrency cart additions. Solved by integrating standard Firestore transactional checks, which evaluate backend warehouse quotas safely before updating individual client collections.'
  },
  {
    id: '4',
    title: 'Stock Market Analysis',
    date: 'November 2024',
    description: 'A web application that displays available stocks in a portfolio and their data over different time ranges using fetch API and dynamic charts.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Fetch API'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Funrivaled-croissant-a85fe9.netlify.app%2F?w=800&h=600',
    link: 'https://unrivaled-croissant-a85fe9.netlify.app/',
    features: [
      'Dynamic charts rendering stock performance indexes over dynamic time ranges.',
      'Simulated live quote updates refreshing stock values recursively.',
      'High contrast data grid showing opening, closing, and volume details.',
      'Smooth interaction with detailed visual hover points on chart trends.'
    ],
    architecture: [
      'HTML Canvas: Renders complex grid baselines and trendlines manually to eliminate heavy chart library weight.',
      'Dynamic Fetch API: Fetches, parses, and maps stock vectors asynchronously.',
      'Timeframe State Managers: Filters historical coordinate metrics instantly without flashing the viewport.'
    ],
    challenges: 'High-DPI Canvas Scaling — Keeping the dynamic trend charts crisp on modern Retina displays without causing layout shifts or fuzzy lines. Solved by monitoring window resizing actions and applying canvas context scaling ratios linked to active device pixel ratios.'
  },
  {
    id: '5',
    title: 'Music Player App',
    date: 'December 2024',
    description: 'A robust music player system to manage songs with functionalities like play, pause, update, and search. Includes a dark/light mode toggle.',
    tags: ['HTML', 'CSS', 'JavaScript', 'API Integration'],
    image: 'https://files.codingninjas.in/music-player-29857.gif',
    link: 'https://unrivaled-croissant-a85fe9.netlify.app/',
    features: [
      'Polished audio timeline scrubber supporting manual seeking and buffered display indices.',
      'Search index mapping song title, album name, and vocal artists on the fly.',
      'Playlists and queue list modifiers to reorder dynamically.',
      'Instant dark and light user interface toggle theme controls.'
    ],
    architecture: [
      'HTML5 Audio API: Standard raw media buffer management linked directly to browser audio streams.',
      'Event Dispatcher: Maps continuous playback streams to reactive range progress bar inputs.',
      'Stateful Queues: Backed by custom audio controls preserving item indexes across tracks.'
    ],
    challenges: 'Audio Loop Synchronization & Memory Cleanups — Preventing multiple audio threads from loading concurrently or leaking memory buffers on rapid track transitions. Handled by strictly binding audio streams to a centralized singleton instance that releases previous listeners and disposes background buffers before spawning new track threads.'
  }
];

export const EDUCATION: Education[] = [
  {
    id: '1',
    institution: 'Sardar Patel University',
    degree: 'B.S.c (Computer Application & Information Technology)',
    period: '2021 — 2024',
    description: 'Graduated with a CGPA of 8.28. Focused on core computer science concepts and information technology.',
  },
  {
    id: '2',
    institution: 'Coding Ninjas',
    degree: 'Full Stack Web Development Training',
    period: 'Aug 2024 — May 2025',
    description: 'Comprehensive training covering Front-End, Back-End, Data Structures & Algorithms, and Python.',
  }
];

export const SKILLS: Skill[] = [
  { name: 'React.js', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'HTML/CSS', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Bootstrap', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'MongoDB', category: 'Backend' },
  { name: 'Firebase', category: 'Backend' },
  { name: 'MySQL', category: 'Backend' },
  { name: 'VS Code', category: 'Tools' },
  { name: 'Postman', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'DSA', category: 'Other' },
  { name: 'OOPS', category: 'Other' },
  { name: 'Detail-Oriented', category: 'Soft Skills' },
  { name: 'Quick-learner', category: 'Soft Skills' },
  { name: 'Work Ethic', category: 'Soft Skills' },
];
