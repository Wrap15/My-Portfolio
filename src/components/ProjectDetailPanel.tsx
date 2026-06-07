import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Calendar, 
  Layers,
  Server,
  Sliders,
  Globe,
  Layout,
  Image,
  Sparkles,
  Timer,
  Database,
  RefreshCw,
  ShieldCheck,
  Key,
  TrendingUp,
  Gauge,
  Music,
  Volume2,
  PlayCircle,
  Share2,
  MessageCircle,
  Twitter
} from 'lucide-react';
import { Project } from '../constants';

interface ProjectDetailPanelProps {
  project: Project;
  onClose: () => void;
}

const getArchitecturalHighlights = (project: Project) => {
  const normalizedTitle = project.title.toLowerCase();
  
  if (normalizedTitle.includes('onlyprofit')) {
    return [
      {
        icon: <Server className="text-emerald-500" size={18} />,
        title: "API Caching & Interceptors",
        text: "Dual server-side memory caching layers with timed fallback mechanisms minimize network load from public APIs and guarantee fluid uptime."
      },
      {
        icon: <Sliders className="text-teal-500" size={18} />,
        title: "Dynamic Compound Calculator",
        text: "Calculates mathematical rates in React state dynamically, bridging mutual fund CAGR directly into custom interactive SVG doughnut charts."
      },
      {
        icon: <Globe className="text-blue-500" size={18} />,
        title: "SEO & Serialization Layout",
        text: "Utilizes Next.js directory sitemaps, robust robot directives, and automated JSON-LD structured schemas to boost indexing."
      },
      {
        icon: <Cpu className="text-purple-500" size={18} />,
        title: "Lightweight Technical Charts",
        text: "Integrates specialized TradingView visual graphs on customized HTML5 viewports to avoid unnecessary network API payloads."
      }
    ];
  }
  
  if (normalizedTitle.includes('furniture')) {
    return [
      {
        icon: <Layout className="text-amber-500" size={18} />,
        title: "Lightweight Showcase Matrix",
        text: "Designed with an advanced modular sorting structure enabling seamless product filtering by wood styles and historical eras."
      },
      {
        icon: <Image className="text-orange-500" size={18} />,
        title: "Optimized Visual Pipelines",
        text: "Leverages blurred placeholder layers and viewport lazy load handlers to display crisp imagery without Cumulative Layout Shifts."
      },
      {
        icon: <Sparkles className="text-indigo-500" size={18} />,
        title: "Spring-Physics Animations",
        text: "Utilizes precise Framer Motion animation constants to structure responsive and natural interface transitions."
      }
    ];
  }

  if (normalizedTitle.includes('imdb')) {
    return [
      {
        icon: <Timer className="text-amber-500" size={18} />,
        title: "Asynchronous Search Debounce",
        text: "Delays user typing input loops by 300ms, effectively throttling query density to respect limited public API rate caps."
      },
      {
        icon: <Database className="text-teal-500" size={18} />,
        title: "LocalStorage Stateful Cache",
        text: "Integrates persistent browser variables ensuring favorited movie titles load instantly even upon refresh or reload."
      }
    ];
  }

  if (normalizedTitle.includes('buybusy') || normalizedTitle.includes('commerce') || normalizedTitle.includes('e-commerce')) {
    return [
      {
        icon: <RefreshCw className="text-sky-500" size={18} />,
        title: "Socket Synchronization Sync",
        text: "Maintains absolute inventory parity through continuous database triggers and direct cloud snapshot subscriptions."
      },
      {
        icon: <ShieldCheck className="text-emerald-500" size={18} />,
        title: "Atomic Purchase Interceptors",
        text: "Evaluates storage buffers in transaction checks safely before writing cart additions, securing accurate concurrency control."
      },
      {
        icon: <Key className="text-purple-500" size={18} />,
        title: "Session Auth Persistence",
        text: "Manages active user context transparently with secure login cookies and lightweight React authentication hooks."
      }
    ];
  }

  if (normalizedTitle.includes('portfolio') || normalizedTitle.includes('stock')) {
    return [
      {
        icon: <TrendingUp className="text-emerald-500" size={18} />,
        title: "High-DPI Drawing Engine",
        text: "Standardizes high-DPI coordinates manually to assure crisp render vectors on dense mobile displays and desktop viewports."
      },
      {
        icon: <Gauge className="text-blue-500" size={18} />,
        title: "Direct Canvas Rendering",
        text: "Eliminates bloated third-party charting libraries by writing canvas path matrices directly to the web viewport."
      }
    ];
  }

  if (normalizedTitle.includes('music') || normalizedTitle.includes('player')) {
    return [
      {
        icon: <Music className="text-rose-500" size={18} />,
        title: "Centralized Media Singleton",
        text: "Caps global audio instances to a solid single thread, avoiding overlapping tracks or background audio memory leaks."
      },
      {
        icon: <Volume2 className="text-indigo-500" size={18} />,
        title: "Precision Time Scrubbers",
        text: "Translates high-frequency media buffer feeds into interactive range markers, keeping slide coordinates fluid."
      },
      {
        icon: <PlayCircle className="text-emerald-500" size={18} />,
        title: "Stateful Playback Indexes",
        text: "Maintains deep history lists and next-track track lines locally to preserve listening context."
      }
    ];
  }

  // Generic backup highlights
  return [
    {
      icon: <Server className="text-emerald-500" size={18} />,
      title: "Optimized Static Asset Delivery",
      text: "Assets are routed and rendered progressively to achieve sub-second content rendering velocities."
    },
    {
      icon: <Cpu className="text-teal-500" size={18} />,
      title: "Modular Component Architecture",
      text: "Isolates application concerns transparently across custom state hooks and performant container styles."
    }
  ];
};

export const ProjectDetailPanel: React.FC<ProjectDetailPanelProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `Check out "${project.title}" — a stellar software build by Dhaval Panchal! 💜`;
  const shareUrl = project.link || project.githubLink || window.location.href;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\nLink: ${shareUrl}`)}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

  // Disable body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleShare = async () => {
    const urlToCopy = project.link || project.githubLink || window.location.href;
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const highlights = getArchitecturalHighlights(project);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop with blurring effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/50 backdrop-blur-md dark:bg-black/65 cursor-pointer animate-fade-in"
        id="project-drawer-backdrop"
      />

      {/* Slide-in side drawer panel */}
      <motion.div
        initial={{ x: '100%', opacity: 0.9, scale: 0.97 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: '100%', opacity: 0.9, scale: 0.97 }}
        transition={{ type: 'spring', damping: 28, stiffness: 200, mass: 0.9 }}
        className="relative z-10 w-full max-w-2xl h-full bg-white dark:bg-neutral-950 shadow-2xl flex flex-col border-l border-neutral-200/55 dark:border-white/5"
        id="project-drawer-panel"
      >
        {/* Floating Glowing Top Edge Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400" />

        {/* Drawer Header Navbar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200/60 dark:border-white/5 bg-neutral-50/50 dark:bg-neutral-900/10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <Layers size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 block mb-0.5">Project Overview</span>
              <h2 className="text-lg font-serif font-bold text-neutral-950 dark:text-white leading-tight">
                {project.title}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all border border-neutral-200/40 dark:border-white/5 cursor-pointer"
              aria-label="Close details panel"
              id="project-drawer-close-btn"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Panel Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 select-text">
          {/* Main Visual Header Hero */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/40 dark:border-white/10 group shadow-md">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent flex items-end p-6">
              <div className="flex items-center gap-2 text-white/95 text-xs font-mono bg-neutral-950/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Calendar size={12} className="text-emerald-400" />
                <span>Released {project.date}</span>
              </div>
            </div>
          </div>

          {/* Project Summary Description */}
          <div className="space-y-3">
            <h3 className="text-sm uppercase tracking-wider font-extrabold text-neutral-400 block">Description</h3>
            <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Architectural System Highlights list with custom icons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 pb-1 border-b border-neutral-100 dark:border-neutral-900">
              <Sparkles size={16} className="text-emerald-500 animate-pulse" />
              <h3 className="text-sm uppercase tracking-wider font-extrabold text-neutral-800 dark:text-neutral-200">Architectural Highlights</h3>
            </div>
            <div className="grid grid-cols-1 gap-4.5">
              {highlights.map((highlight, idx) => (
                <div 
                  key={idx} 
                  className="flex gap-4 p-4 rounded-2xl bg-neutral-50/60 dark:bg-neutral-900/40 hover:bg-neutral-100/40 dark:hover:bg-neutral-900/65 border border-neutral-200/45 dark:border-white/[0.03] transition-all group"
                >
                  <div className="h-10 w-10 rounded-xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-neutral-200/30 dark:border-white/5 shadow-sm group-hover:scale-105 transition-transform">
                    {highlight.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-sans leading-none">
                      {highlight.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                      {highlight.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enriched Details - Technical Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 pb-1 border-b border-neutral-100 dark:border-neutral-900">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <h3 className="text-sm uppercase tracking-wider font-extrabold text-neutral-800 dark:text-neutral-200">Key Deliverables & Features</h3>
              </div>
              <ul className="grid gap-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Architecture */}
          {project.architecture && project.architecture.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 pb-1 border-b border-neutral-100 dark:border-neutral-900">
                <Cpu size={16} className="text-teal-500" />
                <h3 className="text-sm uppercase tracking-wider font-extrabold text-neutral-800 dark:text-neutral-200">System Architecture</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.architecture.map((step, idx) => {
                  const parts = step.split(':');
                  const headerText = parts[0] || '';
                  const bodyText = parts[1] || '';
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-100 dark:border-white/5 flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wide">
                        {headerText}
                      </span>
                      {bodyText && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          {bodyText.trim()}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Hardest Technical Challenges */}
          {project.challenges && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 pb-1 border-b border-neutral-100 dark:border-neutral-900">
                <Zap size={16} className="text-amber-500 fill-amber-500/10" />
                <h3 className="text-sm uppercase tracking-wider font-extrabold text-neutral-800 dark:text-neutral-200">The Hardest Technical Challenge</h3>
              </div>
              <p className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-400/5 text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed border border-amber-500/10 dark:border-amber-400/10">
                {project.challenges}
              </p>
            </div>
          )}

          {/* Project Technology Tags Grid */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm uppercase tracking-wider font-extrabold text-neutral-400 block">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Footer Actions */}
        <div className="px-6 py-5 border-t border-neutral-200/60 dark:border-white/5 bg-neutral-50/50 dark:bg-neutral-900/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Social Share Toolbar (WhatsApp Primary Default) */}
          <div className="flex flex-wrap items-center gap-2">
            {/* WhatsApp - Default/Primary option */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 xs:flex-initial py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-sans flex items-center justify-center gap-2 border border-emerald-500/25 dark:border-emerald-500/20 active:scale-95 transition-all cursor-pointer shadow-sm hover:translate-y-[-1px] whitespace-nowrap animate-pulse"
              id="project-drawer-share-whatsapp"
              title="Share on WhatsApp (Default)"
            >
              <MessageCircle size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>Share WhatsApp</span>
            </a>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto flex-1 justify-end">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial py-3 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-900 dark:text-white text-xs font-bold font-sans flex items-center justify-center gap-2 border border-neutral-200/40 dark:border-white/10 active:scale-95 transition-all cursor-pointer shadow-sm text-center"
                id="project-drawer-github"
              >
                <Github size={15} />
                Browse Code
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-neutral-950 dark:text-white text-xs font-bold font-sans flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-md shadow-emerald-500/10 dark:shadow-none text-center"
                id="project-drawer-live"
              >
                <span>Visit Website</span>
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Floating Copied Toast Notification */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: 15, scale: 0.95, x: "-50%" }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="absolute bottom-24 left-1/2 z-50 px-5 py-3 rounded-full bg-neutral-900/90 dark:bg-white/95 text-white dark:text-neutral-950 text-xs font-bold flex items-center gap-2 shadow-xl border border-white/10 dark:border-black/5 backdrop-blur-md"
            >
              <span className="inline-block text-purple-500 dark:text-purple-400 text-[14px] leading-none animate-[pulse_1s_infinite]">💜</span>
              <span>Link copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

