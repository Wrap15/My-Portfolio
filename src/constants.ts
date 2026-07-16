export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'FinTech' | 'AI Integration' | 'Web Application' | 'Interactive Experience';
  description: string;
  tags: string[];
  link?: string;
  image: string;
  date: string;
  githubLink?: string;
  architecture?: string[];
  challenges?: string;
  features?: string[];
  metrics?: ProjectMetric[];
  problemStatement?: string;
  solutionProvided?: string;
  performanceDetails?: string;
  learnings?: string;
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
  category: 'Frontend' | 'Backend' | 'State Management' | 'AI & Tools' | 'Soft Skills';
}

export const PROJECTS: Project[] = [
  {
    id: '6',
    title: 'Only Profit',
    category: 'FinTech',
    date: 'May 2026',
    description: 'A high-performance financial intelligence platform and stock market tracking simulator for Indian equities. Integrates simulated real-time ticks, thematic baskets, mutual fund CAGR comparisons, and interactive, high-fidelity metrics with zero UI lag and optimized layout stability.',
    tags: ['Next.js 14', 'React 18', 'Zustand', 'Tailwind CSS', 'Axios', 'TradingView', 'AMFI API', 'Lighthouse Opt.'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fonlyprofit-stock-analyzer.vercel.app%2F?w=800&h=600',
    link: 'https://onlyprofit-stock-analyzer.vercel.app/',
    githubLink: 'https://github.com/Wrap15/OnlyProfit-Stock_Analyzer',
    metrics: [
      { label: 'Lighthouse Performance', value: '99', description: 'Zero Cumulative Layout Shift (CLS)' },
      { label: 'Network Requests Reduced', value: '92%', description: 'Axios auto-deduplication & in-memory caching' },
      { label: 'Core Web Vital LCP', value: '0.2s', description: 'Optimized server-side data fetching pipelines' }
    ],
    problemStatement: 'Public stock queries suffer from aggressive rate limits (AMFI & NSE data clusters). Simultaneous lookup on 20+ tickers caused cascading network blocking, slow page mounting, and severe rendering layover shifts.',
    solutionProvided: 'Architected an automated query-bundling engine. Developed a dual-tier in-memory caching system inside Zustand mapped with parallel request queues, preventing visual popping and preserving API throughput under rapid-fire client session interaction.',
    performanceDetails: 'Used granular memoization to avoid redundant charting math renders. Shifted historic dataset calculation into non-blocking render idle loops. Added dynamic CSS aspect-ratio frames for heavy SVG charting containers, bringing CLS metrics down to 0.00.',
    learnings: 'Built a deep understanding of rate-limiting handling, the value of client-side cache layers as network shock-absorbers, and clean UX loading states like shimmer blocks.',
    features: [
      '📊 Real-Time Ticker & Moving Averages — Implements lag-free SMA-20 trend overlays on interactive viewports.',
      '📦 Curated Thematic Portfolios — Auto-allocates customized company baskets (Green Energy, AI Leaders) with dynamic weights.',
      '📈 Mutual Fund CAGR Analytics — Runs direct speed-ranked comparison grids across small-cap and flexi-cap benchmarks.',
      '💰 SIP & Lumpsum Yield Predictor — Formulates precise mathematical growth matrices rendered on native SVG doughnut models.'
    ],
    architecture: [
      'Optimized Request Deduplication: Intercepts and merges concurrent duplicated routes instantly.',
      'Dual-Layer Persistence: Synchronizes local state maps with an adaptive 15-second memory refresh timer.',
      'Hardware-Accelerated Plots: Offloads custom visual charts directly to sub-pixel GPU composition paths.'
    ],
    challenges: 'Preventing client-side UI lockups when evaluating massive historical price trends in real-time. Handled by creating sliding-window mathematical reductions, only feeding active plot points to rendering vectors.'
  },
  {
    id: '5',
    title: 'Keshav Restro',
    category: 'Web Application',
    date: 'June 2026',
    description: 'A premium, highly interactive digital dining and restaurant layout system styled for 100% pure vegetarian cuisine. Integrates custom circular filters, allergen alerts, dynamic table layout selection, invoices synced via LocalStorage, and professional fluid animations.',
    tags: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'LocalStorage', 'Component-Driven UI'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fkeshav-veg-restro.vercel.app%2F?w=800&h=600',
    link: 'https://keshav-veg-restro.vercel.app/',
    githubLink: 'https://github.com/Wrap15/KeshavVegRestro',
    metrics: [
      { label: 'Menu Catalog Size', value: '150+ Items', description: 'Extensive range of premium dishes and localized street food items' },
      { label: 'Dine-In Table Selector', value: '12 Tables', description: 'Visual map coordinating customer seat layouts with invoices' },
      { label: 'Fast Animation Curves', value: '60 FPS', description: 'Hardware-accelerated item flips, heart beats, and hover shine sweeps' }
    ],
    problemStatement: 'Digital menus are frequently static and lack real-world customer convenience. Customers cannot visualize table allocations, verify ingredient warnings dynamically, or reorder instantly from localized past invoices.',
    solutionProvided: 'Built an elegant React platform featuring Swiggy-style circular filters, an interactive dine-in table mapping system, and a robust cart panel with promo codes. Created automatic allergen logic recognizing Gluten (bread/pav) and Dairy (butter) loadouts, plus an incremental preparation timer dashboard.',
    performanceDetails: 'Structured clean Tailwind CSS styles for rapid rendering with sub-second lazy shimmers. Offloaded menu list modifications and detailed modals directly to state blocks, implementing custom Spring physics loops on all hover states and button scaling interactions.',
    learnings: 'Aquired knowledge on responsive viewport mapping (bottom-left scroll bounds), full multi-column layout footers, and storing invoice caches successfully offline first.',
    features: [
      '🍽️ Fluid Table Grid — Renders a custom seat reservation dashboard syncing order lists directly to occupied stations.',
      '🌶️ Circular Swiggy Filter — Fast, responsive category dials featuring custom street food items (Dabeli, Frankie, Moong Dal Chilla).',
      '🥗 Smart Allergen Warnings — Instant detection dynamically highlights Gluten and Dairy ingredients to ensure dietary safety.',
      '⚡ Order Preparation Tracker — Real-time progress timeline simulating master chef preparations, packaging, and serving stages.'
    ],
    architecture: [
      'Component Isolation: Keeps CartSidebars, custom filters, and detail grids perfectly responsive.',
      'Persistent Invoice Cache: Keeps client purchase history cached inside local browser storage.',
      'Active Touch Feedback: Includes subtle vibrate patterns on mobile to provide clear tactile responses.'
    ],
    challenges: 'Handling large-scale lists (150+ items) without causing mobile redraw lag. Resolved by building light SVG placeholder shimmers and offloading complex filter triggers into isolated render loops.'
  },
  {
    id: '2',
    title: 'CineVault',
    category: 'Web Application',
    date: 'July 2026',
    description: 'A high-performance, client-side cinematic discovery and digital asset management platform. CineVault is engineered with zero-latency in-memory caching, multi-tiered fuzzy query routing, active API abort pipelines, and adaptive CSS layouts. It represents a masterclass in modern vanilla JavaScript optimization, ensuring reliable, fluid, desktop-grade performances across all standard user devices and varied network conditions.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'OMDb API', 'LRU Cache', 'AbortController', 'Fuzzy Search', 'Deep Linking', 'User Experience', 'Performance Optimization'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwrap15.github.io%2FCineVault%2F?w=800&h=600',
    link: 'https://wrap15.github.io/CineVault/',
    githubLink: 'https://github.com/Wrap15/CineVault',
    metrics: [
      { label: 'In-Memory Cache', value: '50 Items', description: 'Native Map-driven LRU cache providing instantaneous query retrievals' },
      { label: 'Debounce Threshold', value: '260ms', description: 'Intelligent keystroke throttling that reduces API flooding by up to 80%' },
      { label: 'Query Fallback Rate', value: '4-Tier', description: 'Advanced spelling/parsing router ensuring zero-error search precision' },
      { label: 'Layout Shift Index', value: '0.00 CLS', description: 'Strict layout geometry frames with animated skeleton shimmers' }
    ],
    problemStatement: 'Standard public search tools suffer from high input-field API flooding, network race conditions from fast typing speeds, lookup failures due to regional accents or minor subtitle spelling mismatches, and severe performance bottlenecks on resource-constrained mobile devices running continuous graphics or particle loops.',
    solutionProvided: 'Designed and deployed a highly integrated, client-only search optimization suite. It features an active 260ms debouncing handler, an AbortController instance manager to aggressively cancel redundant queries, a 4-level query fallback search router (Exact Match ➔ First Word Tokenization ➔ Special Character Strip ➔ Suffix Token Fallback), and an auto-evicting 50-item in-memory LRU cache alongside CPU-aware rendering schedules.',
    performanceDetails: 'Features CPU-aware drawing lifecycles where active background animations and canvas-based ambient particle fields enter sleep states automatically when the user blurs the browser tab (via visibilitychange listeners), conserving up to 95% of standby GPU and battery resources. Achieved absolute Cumulative Layout Shift (CLS) scores of zero by implementing robust skeleton placeholder cards and aspect-ratio locked media containers.',
    learnings: 'Mastered the mechanics of JavaScript event cancellation and AbortSignal bindings, designed custom cache eviction strategies (Least Recently Used) utilizing key-ordering in ES6 Maps, structured deep-linking state machines via URLSearchParams synchronization, and achieved fluid DOM renders with zero library overhead.',
    features: [
      '🎬 4-Tier Fuzzy Fallback Engine — Resolves complex, Hinglish, or mistyped query entries with multi-stage tokenization backups.',
      '📦 Zero-Latency LRU Cache — Bypasses active network roundtrips for recently viewed search indexes with an auto-evicting 50-item Map.',
      '🔗 Deep Linking & Share Sync — Syncs movie selection state into URL query strings (`?id=tt...`) with single-click clipboard copying.',
      '🌓 Adaptive Lighting System — Transitions across highly tailored dark and light viewport aesthetics, persisting user style selection locally.',
      '✨ Responsive Shimmer Layouts — Delivers immediate visual feedback via hardware-accelerated CSS shimmer skeletons during data fetch events.',
      '🟢 Score Color-Coding — Highlights ratings dynamically (Green >= 8.0, Gold 6.0-7.9, Red < 6.0) for visual decision-making.'
    ],
    architecture: [
      'LRU Cache Engine: High-speed native Map structure with active item capping.',
      'Query Cancellation Loop: AbortController hooks destroying incomplete fetch streams.',
      'Battery Saver Routine: GPU loop sleep mode triggered by page visibility signals.',
      'State Route Manager: Two-way dynamic synchronization of view states with URL parameter objects.'
    ],
    challenges: 'Preventing async race conditions where an older, delayed network fetch resolves after a newer query, causing severe search UI flickering and incorrect listings. Resolved by binding a unique tracking token and an active AbortController signal to each keystroke event, instantly terminating stale requests and resolving the latest query with absolute precision.'
  },
  {
    id: '1',
    title: 'Shreeji Furniture',
    category: 'Interactive Experience',
    date: 'April 2026',
    description: 'A premium, high-converting interior design showcase and digital catalog. Engages visitors with spatial product sorting, custom filtering, and tactile, physics-based scroll animation cascades.',
    tags: ['React 18', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    link: 'https://shreeji-furniture-bay.vercel.app/',
    githubLink: 'https://github.com/Wrap15/Shreeji-Furniture',
    metrics: [
      { label: 'Rendering FPS', value: '60 FPS', description: 'Hardware-accelerated layout springs' },
      { label: 'Lighthouse SEO', value: '100', description: 'Fully semantically-structured index sheets' },
      { label: 'LCP (Largest Contentful Paint)', value: '0.4s', description: 'Advanced next-gen image pipeline' }
    ],
    problemStatement: 'Rich furniture portfolio portals depend heavily on raw, high-resolution photographs. Heavy uncompressed renders resulted in sluggish pagination jumps and a degraded initial mobile experience.',
    solutionProvided: 'Integrated dynamic lazy loading based on active intersection observers, alongside CSS-level blur overlays. Styled fluid structural transitions using hardware-accelerated Framer Motion vectors to make catalog browsing feel instantaneous.',
    performanceDetails: 'Configured fluid responsive breakpoints with Tailwind CSS utility configurations, bypassing unnecessary style calculations and offloading layout transformations directly to GPU-composited layers.',
    learnings: 'Refined visual layout engineering, asset loading strategies, and how physical movement animations improve digital buyer satisfaction.',
    features: [
      '🪵 High-Definition Gallery matrix — Seamless layout transitions adapting with pixel-perfection across all viewport sizes.',
      '🔍 Modular Taxonomy Filters — Instantly sorts luxury assets by wood textures, fabrication eras, and room designs.',
      '✨ Inertial Parallax Scrolling — Leverages viewport indicators to trigger gorgeous, staggered product card entrances.'
    ],
    architecture: [
      'Single-Page Architecture: Vite-powered modular build structure for sub-second rendering updates.',
      'Spring Physics Pipelines: Standardizes spatial motion vectors to simulate organic inertia.'
    ],
    challenges: 'Coordinating staggered transition steps across deep grid layout changes. Solved by standardizing layout-id propagation in Framer Motion to animate items naturally as they move.'
  },
  {
    id: '3',
    title: 'BuyBusy',
    category: 'Web Application',
    date: 'January 2025',
    description: 'A cloud-synchronized retail platform. Integrates authenticated checkout procedures, real-time catalog snapshots, and robust transactional shopping carts with zero loss of state.',
    tags: ['React.js', 'Firebase Auth', 'Firestore DB', 'Zustand', 'Tailwind CSS', 'Postman'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Ftangerine-gingersnap-3c8b63.netlify.app%2F?w=800&h=600',
    link: 'https://tangerine-gingersnap-3c8b63.netlify.app/',
    githubLink: 'https://github.com/Wrap15/BuyBusy-Ecommerce',
    metrics: [
      { label: 'Sync Latency', value: 'Sub-90ms', description: 'Real-time client-to-cloud sync pipeline' },
      { label: 'Cart Collision Rate', value: '0.00%', description: 'Atomic transactional locks on checkout' },
      { label: 'Asset Load Time', value: '0.3s', description: 'Leveraged dynamic module imports' }
    ],
    problemStatement: 'Distributed database updates caused cart pricing discrepancies and race conditions when multiple users selected low-stock items simultaneously.',
    solutionProvided: 'Implemented atomic transactional triggers within Firebase Firestore. Cart totals are computed securely server-side before confirming changes to client profiles.',
    performanceDetails: 'Utilized React Context and Zustand modules in combination to split global global state from local UI updates, keeping render overhead confined to active elements.',
    learnings: 'Gained solid knowledge of NoSQL database schema design, Firebase security rules, and real-time state synchronization.',
    features: [
      '⚡ Real-time Stock Sync — Catalog updates instantly on the client as items are bought.',
      '🔑 Frictionless Auth — Implements persistent user sessions with built-in OAuth support.',
      '🏷️ Multi-Criteria Filters — Allows users to narrow down products dynamically by pricing, brand, and type.'
    ],
    architecture: [
      'Firestore Active Observer: Establishes a listener connection to stream inventory updates directly.',
      'Modular Hooks Pattern: Encourages code reusability by packaging cart actions into clear hooks.'
    ],
    challenges: 'Handling network disconnection states. Addressed by configuring local persistence layers inside Firebase to cache writes locally and upload them when connectivity resumes.'
  },
  {
    id: '4',
    title: 'Stock Market Analytics Portfolio',
    category: 'FinTech',
    date: 'November 2024',
    description: 'An analytical dashboard engineered with high-density data visualizations. Renders customizable historical price vectors with direct frame manipulations and low CPU utilization.',
    tags: ['HTML5 Canvas', 'Vanilla JS', 'Fetch API', 'CSS Grid', 'Data Visualization'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Funrivaled-croissant-a85fe9.netlify.app%2F?w=800&h=600',
    link: 'https://unrivaled-croissant-a85fe9.netlify.app/',
    githubLink: 'https://github.com/Wrap15/Stockmarket-Chart',
    metrics: [
      { label: 'Drawn Frame Latency', value: '0.8ms', description: 'Direct 2D Context rendering' },
      { label: 'JS Bundle Added', value: '0.0KB', description: 'Engineered entirely with zero external library weight' },
      { label: 'DPI Scaling Ratio', value: '2.0x', description: 'retina-display custom coordinates scale' }
    ],
    problemStatement: 'Traditional charting packages are heavy and introduce layout lag. Drawing 10,000+ stock tickers over multiple layout grids resulted in visible lag on mobile viewport screens.',
    solutionProvided: 'Developed a custom 2D Canvas rendering engine from scratch. Hand-coded custom trendline paths, background grids, hover lines, and coordinates scaling calculations.',
    performanceDetails: 'Used offscreen canvases to buffer grid baselines, so only active stock lines are updated during zoom and scroll events, saving up to 85% CPU execution cycles.',
    learnings: 'Built a deep understanding of low-level graphics layout calculations, device pixel ratios, and performance optimization in HTML5 Canvas.',
    features: [
      '📈 High-Fidelity Rendering — Visualizes historical data vectors with custom coordinate ranges.',
      '⏱️ Dynamic Slices — Filters historic coordinates instantly without reloading the page.',
      '🎯 Precise Coordinates Reader — Tracks screen cursor coordinates to highlight exact stock pricing on hover.'
    ],
    architecture: [
      'Offscreen Render Pipeline: Minimizes browser redraw overhead by buffering background elements.',
      'Interpolation Formulas: Scales coordinate numbers to exact canvas pixel layouts smoothly.'
    ],
    challenges: 'Keeping line graphics sharp on Retina displays. Handled by multiplying canvas dimensions by the active device pixel ratio and adjusting the scale settings accordingly.'
  }
];

export const EDUCATION: Education[] = [
  {
    id: '1',
    institution: 'Sardar Patel University',
    degree: 'Bachelor of Science (Computer Application & IT)',
    period: '2021 — 2024',
    description: 'Graduated with a CGPA of 8.28. Formed a strong foundation in core software engineering, operational algorithms, networks, and advanced data structures.',
  },
  {
    id: '2',
    institution: 'Coding Ninjas',
    degree: 'Full-Stack Software Architecture Certification',
    period: 'Aug 2024 — May 2025',
    description: 'Comprehensive software engineering program focused on production MERN architectures, database optimization, system design, and algorithmic problem-solving.',
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'HTML5/CSS3', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },
  
  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'MongoDB', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'MySQL', category: 'Backend' },
  { name: 'RESTful APIs', category: 'Backend' },

  // State Management
  { name: 'Zustand', category: 'State Management' },
  { name: 'Redux Toolkit', category: 'State Management' },
  { name: 'React Context', category: 'State Management' },

  // AI & Tools
  { name: 'GenAI Integrations', category: 'AI & Tools' },
  { name: 'Git & GitHub', category: 'AI & Tools' },
  { name: 'Postman', category: 'AI & Tools' },
  { name: 'Docker', category: 'AI & Tools' },
  { name: 'Vercel / Vite', category: 'AI & Tools' },

  // Soft Skills
  { name: 'Detail Oriented', category: 'Soft Skills' },
  { name: 'Quick Learner', category: 'Soft Skills' },
  { name: 'Work Ethic', category: 'Soft Skills' }
];
