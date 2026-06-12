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
    title: 'OnlyProfit',
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
    id: '2',
    title: 'IMDB Movie Intelligence',
    category: 'Web Application',
    date: 'March 2025',
    description: 'An immersive cinematic search engine and ratings comparison center. Leverages real-time API integrations and persistent query caching to deliver instant reviews, metadata, and playlist tools.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'OMDB API', 'LocalStorage'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fvishaal98.github.io%2FIMDBClone%2F?w=800&h=600',
    link: 'https://vishaal98.github.io/IMDBClone/',
    githubLink: 'https://github.com/Wrap15/IMDBClone',
    metrics: [
      { label: 'Fetch Debouncing', value: '300ms', description: 'Prevents redundant keypress network calls' },
      { label: 'Cache Hit Ratio', value: '98%', description: 'Persistent LocalStorage favorites room' },
      { label: 'Average Query Latency', value: '110ms', description: 'Direct API endpoints proxy' }
    ],
    problemStatement: 'Typing letters into search inputs fired excessive back-to-back API queries, invoking rate warnings and causing old responses to clobber newer ones.',
    solutionProvided: 'Build an elegant asynchronous debounce handler that safely cancels redundant queries and resolves the latest relevant promise matching the current search input.',
    performanceDetails: 'Designed a lightweight vanilla state store that syncs directly with LocalStorage, satisfying requirements for instant bookmark access without triggering remote server delays.',
    learnings: 'Mastered JavaScript promise resolutions, proper input throttling/debouncing techniques, and memory cleanup patterns.',
    features: [
      '🎥 Predictive Keyword Indexing — Suggests corresponding movie titles fluidly while typing.',
      '🍿 Favorites Room — Bookmark and organize lists persistently with an offline-first cache.',
      '📊 Deep Metadata Display — Renders precise screen durations, cast directories, and ratings comparisons.'
    ],
    architecture: [
      'Vanilla State Handlers: Simplifies DOM modifications to eliminate layout-reflow overhead.',
      'Error Interceptors: Captures empty search states or network errors, rendering fallback indicators.'
    ],
    challenges: 'Handling out-of-order asynchronous responses. Solved by binding an incrementing transaction ID to active queries so the client rejects stale returns.'
  },

  {
    id: '3',
    title: 'BuyBusy Cloud Commerce',
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
