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
  Gauge,
  TrendingUp,
  Award
} from 'lucide-react';
import { Project } from '../constants';
import { HoverPreviewTooltip } from './HoverPreviewTooltip';
import { cn } from '../lib/utils';

interface ProjectDetailPanelProps {
  project: Project;
  onClose: () => void;
  highlightedTag?: string | null;
  onTagClick?: (tag: string) => void;
}

export const ProjectDetailPanel: React.FC<ProjectDetailPanelProps> = ({ 
  project, 
  onClose,
  highlightedTag,
  onTagClick
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'Overview' | 'Problem' | 'Solution' | 'Architecture' | 'Challenges' | 'Results'>('Overview');

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

  const handleCopyLink = async () => {
    const url = project.link || project.githubLink || window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.15 } }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dynamic backdrop under-layer with premium blurring blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/40 dark:bg-black/70 backdrop-blur-sm cursor-pointer"
        id="project-drawer-backdrop"
      />

      {/* Slide-in engineering log drawer panel */}
      <motion.div
        initial={{ x: '100%', opacity: 0.95 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0.95 }}
        transition={{ type: 'spring', damping: 30, stiffness: 220, mass: 1 }}
        className="relative z-10 w-full max-w-3xl h-full bg-white dark:bg-neutral-950 shadow-2xl flex flex-col border-l border-neutral-200/60 dark:border-white/[0.04]"
        id="project-drawer-panel"
      >
        {/* Visual Header status accent bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />

        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200/50 dark:border-white/[0.04] bg-neutral-50/50 dark:bg-neutral-900/[0.15]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <Award size={20} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-neutral-400 dark:text-neutral-500 block">Engineering Case Study</span>
              <h2 className="text-xl font-serif font-bold text-neutral-950 dark:text-white leading-tight">
                {project.title}
              </h2>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors border border-neutral-200/40 dark:border-white/[0.04] cursor-pointer"
            aria-label="Close Case Study"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Document log content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 select-text flex flex-col">
          
          {/* Main Hero Shot & Release Info */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/50 dark:border-white/[0.05] shadow-xs shrink-0 mb-2">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent flex items-end p-6">
              <div className="flex items-center gap-2 text-white text-xs font-mono bg-neutral-950/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Calendar size={13} className="text-emerald-400 animate-pulse" />
                <span>Production Release: {project.date}</span>
              </div>
            </div>
          </div>

          {/* Interactive Case Study Navigation Tabs - Sticky list inside body */}
          <div className="flex items-center gap-1 border-b border-neutral-200/60 dark:border-white/[0.05] pb-0.5 overflow-x-auto no-scrollbar scroll-smooth shrink-0 sticky top-0 bg-white dark:bg-neutral-950 z-20 pt-1 -mx-6 px-6 sm:-mx-8 sm:px-8">
            {(['Overview', 'Problem', 'Solution', 'Architecture', 'Challenges', 'Results'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all select-none border-b-2 -mb-[2px] focus:outline-none",
                    isActive 
                      ? "text-emerald-500 border-emerald-550 font-extrabold" 
                      : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 border-transparent"
                  )}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="activeCaseStudyTabUnderline"
                      className="absolute bottom-0 inset-x-0 h-[2.5px] bg-emerald-500"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Tab Page Content Frame */}
          <div className="flex-1 mt-2">
            <AnimatePresence mode="wait">
              {activeTab === 'Overview' && (
                <motion.div
                  key="overview-page"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400 dark:text-neutral-500 font-mono block">Project Summary</h3>
                    <p className="text-neutral-700 dark:text-neutral-300 text-[15px] leading-relaxed font-sans">
                      {project.description}
                    </p>
                  </div>

                  {project.features && project.features.length > 0 && (
                    <div className="space-y-4 pt-5 border-t border-neutral-100 dark:border-white/[0.04]">
                      <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400 dark:text-neutral-500 font-mono block">Key Features & Deliverables</h3>
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

                  {/* Technical Specifications / Tech Tags */}
                  <div className="space-y-3 pt-5 border-t border-neutral-100 dark:border-white/[0.04]">
                    <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400 dark:text-neutral-500 font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span>Integrated Technology Stack</span>
                      <span className="text-[9px] text-neutral-400 dark:text-neutral-500 normal-case font-mono flex items-center gap-1 font-normal">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        Click tag to highlight matching projects
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => {
                        const isHighlighted = highlightedTag === tag;
                        return (
                          <button
                            key={tag}
                            onClick={() => onTagClick?.(tag)}
                            className={cn(
                              "text-xs font-mono font-medium px-2.5 py-1 rounded transition-all cursor-pointer hover:scale-[1.05] active:scale-[0.98] select-none flex items-center gap-1.5 focus:outline-none border",
                              isHighlighted 
                                ? "bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/50 dark:border-emerald-400/50 text-emerald-600 dark:text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)] font-semibold"
                                : "bg-neutral-50 dark:bg-white/[0.03] border-neutral-200/50 dark:border-white/[0.05] text-neutral-600 dark:text-neutral-400 hover:border-emerald-500/30 dark:hover:border-emerald-400/30 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-500/[0.03]"
                            )}
                            title={isHighlighted ? "Click to clear highlight" : `Highlight other projects with ${tag}`}
                          >
                            {tag}
                            {isHighlighted && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'Problem' && (
                <motion.div
                  key="problem-page"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-red-500 dark:text-red-400 font-mono block">The Engineering Problem</h3>
                    {project.problemStatement ? (
                      <div className="p-5 rounded-2xl bg-red-500/[0.02] dark:bg-red-500/[0.01] border border-red-500/15 dark:border-red-500/10 flex gap-4">
                        <div className="h-8 w-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 border border-red-500/10 mt-0.5">
                          <Zap size={15} />
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed font-sans">
                          {project.problemStatement}
                        </p>
                      </div>
                    ) : (
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs font-mono italic py-4 text-center">
                        No critical bottlenecks stored for this record.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'Solution' && (
                <motion.div
                  key="solution-page"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-500 dark:text-emerald-400 font-mono block">The Architectural Solution</h3>
                    {project.solutionProvided ? (
                      <div className="p-5 rounded-2xl bg-emerald-500/[0.02] dark:bg-emerald-500/[0.01] border border-emerald-500/15 dark:border-emerald-500/10 flex gap-4">
                        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/10 mt-0.5">
                          <CheckCircle2 size={15} />
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed font-sans">
                          {project.solutionProvided}
                        </p>
                      </div>
                    ) : (
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs font-mono italic py-4 text-center">
                        No custom architectural description logged for this record.
                      </p>
                    )}
                  </div>

                  {project.performanceDetails && (
                    <div className="space-y-3 pt-5 border-t border-neutral-100 dark:border-white/[0.04]">
                      <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-sky-500 dark:text-sky-400 font-mono flex items-center gap-1.5">
                        <Gauge size={14} className="text-sky-500 animate-pulse" />
                        <span>Performance Audits & Benchmarks</span>
                      </h3>
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed font-sans">
                        {project.performanceDetails}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'Architecture' && (
                <motion.div
                  key="architecture-page"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400 dark:text-neutral-500 font-mono flex items-center gap-2">
                      <Cpu size={15} className="text-teal-500 shrink-0" />
                      <span>Systemic Flow & Structural Elements</span>
                    </h3>
                    {project.architecture && project.architecture.length > 0 ? (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {project.architecture.map((step, idx) => {
                          const parts = step.split(':');
                          const headerText = parts[0] || '';
                          const bodyText = parts[1] || '';
                          return (
                            <div key={idx} className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/40 dark:border-white/[0.04] hover:bg-neutral-100/30 dark:hover:bg-white/[0.04] transition-all flex flex-col gap-1.5">
                              <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
                                <span className="h-4 w-4 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px] font-bold shrink-0">{idx + 1}</span>
                                {headerText}
                              </span>
                              {bodyText && (
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                                  {bodyText.trim()}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs font-mono italic py-4 text-center">
                        Architecture parameters not charted for this record.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'Challenges' && (
                <motion.div
                  key="challenges-page"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400 dark:text-neutral-500 font-mono flex items-center gap-2">
                      <Sparkles size={15} className="text-purple-500 shrink-0" />
                      <span>Engineering Hurdles & Takeaways</span>
                    </h3>
                    {project.challenges ? (
                      <div className="space-y-4">
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed font-sans">
                          {project.challenges}
                        </p>
                        {project.learnings && (
                          <div className="p-4.5 rounded-xl bg-purple-500/[0.01] dark:bg-purple-500/[0.01] border border-purple-500/10 dark:border-purple-500/5 text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed font-sans flex gap-3">
                            <span className="text-purple-500 shrink-0 select-none">💜</span>
                            <span className="text-xs font-serif italic text-neutral-600 dark:text-neutral-400">
                              <strong>Key Takeaway:</strong> {project.learnings}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs font-mono italic py-4 text-center">
                        Takeaways of development not stored.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'Results' && (
                <motion.div
                  key="results-page"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400 dark:text-neutral-500 font-mono block">Quantitative Real-World Results</h3>
                    
                    {project.metrics && project.metrics.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="flex flex-col gap-1 p-4.5 rounded-xl border bg-emerald-500/[0.02] dark:bg-emerald-500/[0.01] border-emerald-500/15 dark:border-emerald-500/10 shadow-3xs hover:scale-[1.02] transition-transform">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
                              {metric.label}
                            </span>
                            <span className="text-2xl font-mono font-bold text-emerald-500 dark:text-emerald-400 tracking-tight leading-none mt-1">
                              {metric.value}
                            </span>
                            {metric.description && (
                              <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 pb-0.5 leading-snug">
                                {metric.description}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs font-mono italic py-4 text-center">
                        Results data not formally stored for this project yet.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Panel Footer Toolbar */}
        <div className="px-6 py-5 border-t border-neutral-200/50 dark:border-white/[0.04] bg-neutral-50/50 dark:bg-neutral-900/[0.15] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          <button
            onClick={handleCopyLink}
            className="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-300 text-xs font-bold flex items-center justify-center gap-2 border border-neutral-200/40 dark:border-white/[0.04] cursor-pointer"
          >
            <Layers size={14} />
            <span>Copy Project URL</span>
          </button>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {project.githubLink && (
              <HoverPreviewTooltip project={project} isGithub={true}>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial py-3 px-5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] text-neutral-900 dark:text-white text-xs font-bold flex items-center justify-center gap-2 border border-neutral-200/40 dark:border-white/[0.05] active:scale-95 transition-all cursor-pointer shadow-sm text-center font-serif"
                >
                  <Github size={15} />
                  Browse Source
                </a>
              </HoverPreviewTooltip>
            )}
            {project.link && (
              <HoverPreviewTooltip project={project}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-neutral-950 dark:text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-lg shadow-emerald-500/10 dark:shadow-none text-center font-serif"
                >
                  <span>Launch Live</span>
                  <ExternalLink size={15} />
                </a>
              </HoverPreviewTooltip>
            )}
          </div>
        </div>

        {/* Copy confirmation toast */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 15, x: "-50%" }}
              className="absolute bottom-24 left-1/2 z-50 px-4 py-2.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-bold flex items-center gap-2 shadow-xl border border-white/10 dark:border-black/5"
            >
              <span>📋 Link copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
