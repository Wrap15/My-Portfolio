import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { Project } from '../constants';
import { ExternalLink, Github, ArrowRight, Gauge, Layers, Cpu } from 'lucide-react';
import { HoverPreviewTooltip } from './HoverPreviewTooltip';
import { playHoverSound } from '../lib/sounds';
import { cn } from '../lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
  highlightedTag?: string | null;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick, highlightedTag }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isIntersected, setIsIntersected] = React.useState(false);

  React.useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          // Stop observing once visible to retain visibility
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12, // slightly higher threshold for intentional scroll placement
        rootMargin: '0px 0px -40px 0px', // triggers animation as it comes up from bottom
      }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Motion values for 3D rotation tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Motion values for actual cursor coordinates (glow spotlight)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Interpolation ranges maps normalized mouse position to angles of rotation
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  // Spring animations for a fluid, natural feel with momentum
  const springConfig = { damping: 25, stiffness: 140, mass: 0.6 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothScale = useSpring(useMotionValue(1), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalizing coordinates to ranges [-0.5, 0.5]
    const normX = (event.clientX - rect.left) / width - 0.5;
    const normY = (event.clientY - rect.top) / height - 0.5;

    x.set(normX);
    y.set(normY);

    // Pixel tracking coordinates for the spotlight effect
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    playHoverSound();
    smoothScale.set(1.015);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    smoothScale.set(1);
  };

  // Assign nice badge colors based on category
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'FinTech':
        return 'bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'AI Integration':
        return 'bg-purple-500/10 dark:bg-purple-500/5 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'Web Application':
        return 'bg-sky-500/10 dark:bg-sky-500/5 text-sky-600 dark:text-sky-400 border-sky-500/20';
      default:
        return 'bg-neutral-500/10 dark:bg-neutral-500/5 text-neutral-600 dark:text-neutral-400 border-neutral-500/20';
    }
  };

  const hasActiveHighlight = !!highlightedTag;
  const isMatching = highlightedTag ? project.tags.includes(highlightedTag) : false;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.96, y: 35 }}
      animate={isIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ 
        duration: 0.75, 
        delay: index * 0.12, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        scale: smoothScale,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative cursor-pointer bg-white dark:bg-neutral-900/10 p-5 rounded-[24px] border transition-all duration-300 shadow-sm select-none will-change-transform overflow-hidden",
        !hasActiveHighlight
          ? "border-neutral-200/60 dark:border-white/[0.04] hover:border-emerald-500/20 dark:hover:border-emerald-500/15 hover:shadow-[0_24px_50px_-12px_rgba(16,185,129,0.06)] dark:hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.4)]"
          : isMatching
            ? "border-emerald-500/70 dark:border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.15)] ring-2 ring-emerald-500/20 z-10 scale-[1.01]"
            : "border-neutral-200/40 dark:border-white/[0.02] opacity-35 dark:opacity-25"
      )}
      id={`project-card-${project.id}`}
    >
      {/* Spotlight light-beam reflective layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.08), transparent 85%)`,
        }}
      />

      <div style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }} className="w-full h-full relative z-20 flex flex-col justify-between">
        
        {/* Card Header: Category & Date (Visible statically) */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border uppercase tracking-widest ${getCategoryColor(project.category)}`}>
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 font-medium">
            {project.date}
          </span>
        </div>

        {/* Thumbnail Screen Mockup Frame */}
        <div 
          onClick={onClick}
          className="relative aspect-[16/10] rounded-[16px] overflow-hidden mb-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/50 dark:border-white/5 shadow-xs shrink-0 group-hover:border-neutral-300 dark:group-hover:border-white/10 transition-colors"
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between p-4" />
        </div>

        {/* Title & Description */}
        <div onClick={onClick} className="flex-1 mb-5">
          <h3 className="text-xl font-serif font-bold text-neutral-900 dark:text-white group-hover:text-emerald-500 transition-colors duration-200 leading-tight mb-2">
            {project.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Premium Recruiter-Facing Metrics Row */}
        {project.metrics && project.metrics.length > 0 && (
          <div 
            onClick={onClick}
            className="grid grid-cols-3 gap-2 py-3 px-4 rounded-[14px] bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/40 dark:border-white/[0.03] mb-5 items-center justify-center"
          >
            {project.metrics.slice(0, 3).map((metric, i) => (
              <div key={i} className="text-center overflow-hidden border-r last:border-r-0 border-neutral-200/40 dark:border-white/5 px-1 flex flex-col justify-center">
                <span className="text-[14px] sm:text-[15px] font-mono font-bold text-emerald-500 dark:text-emerald-400 leading-none">
                  {metric.value}
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mt-1 truncate block" title={metric.label}>
                  {metric.label.replace('Lighthouse', '')}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action Button Strip: Live, GitHub, and Case Study triggers */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-neutral-100 dark:border-white/[0.04]">
          {/* Primary Core Action: Case Study Trigger */}
          <button
            onClick={onClick}
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer group/btn"
          >
            <span>Read Case Study</span>
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>

          {/* Icon Access Links */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {project.githubLink && (
              <HoverPreviewTooltip project={project} isGithub={true}>
                <a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-all border border-neutral-200/40 dark:border-white/5 shrink-0"
                  title="Browse Source Repository"
                >
                  <Github size={14} />
                </a>
              </HoverPreviewTooltip>
            )}

            {project.link && (
              <HoverPreviewTooltip project={project}>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-neutral-950 dark:bg-white/[0.03] dark:hover:bg-emerald-500 dark:text-emerald-400 dark:hover:text-neutral-950 flex items-center justify-center transition-all border border-emerald-500/20 dark:border-white/5 shrink-0"
                  title="Open Live Website"
                >
                  <ExternalLink size={14} />
                </a>
              </HoverPreviewTooltip>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
