import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../constants';
import { cn } from '../lib/utils';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

interface HoverPreviewTooltipProps {
  project: Project;
  isGithub?: boolean;
  children: React.ReactNode;
  className?: string;
}

const AIPlaceholderImage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden p-4 select-none">
      {/* Blueprint grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:12px_12px]" />
      
      {/* Glowing tech radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_70%)]" />
      
      {/* Abstract vector tech lines and node connectors */}
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Draw a subtle network grid */}
        <path d="M 10,25 L 50,25 L 60,45 L 90,45" stroke="#10b981" strokeWidth="0.5" strokeDasharray="1,1" fill="none" />
        <path d="M 0,75 L 40,75 L 55,60 L 100,60" stroke="#059669" strokeWidth="0.5" fill="none" />
        <line x1="50" y1="25" x2="40" y2="75" stroke="#047857" strokeWidth="0.25" strokeDasharray="2,2" />
        
        {/* Glowing node pulses */}
        <circle cx="50" cy="25" r="2" className="fill-emerald-400 animate-pulse" />
        <circle cx="60" cy="45" r="1.5" className="fill-emerald-500" />
        <circle cx="40" cy="75" r="2" className="fill-emerald-400 animate-pulse" />
      </svg>
      
      {/* Centered identity tag */}
      <div className="relative z-10 flex flex-col items-center gap-1 text-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 shadow-inner">
          <Sparkles size={14} className="text-emerald-400 animate-spin-slow" />
        </div>
        <p className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-400/80">AI Model Sandbox</p>
        <p className="text-[10px] font-mono leading-tight font-bold text-neutral-300 max-w-[120px] truncate">{title}</p>
      </div>

      {/* Cyberpunk subtext */}
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between z-10 text-[7px] font-mono font-bold tracking-wider text-emerald-500/35 uppercase">
        <span>PREVIEW MATRIX</span>
        <span>SECURE</span>
      </div>
    </div>
  );
};

export const HoverPreviewTooltip: React.FC<HoverPreviewTooltipProps> = ({
  project,
  isGithub = false,
  children,
  className,
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Tooltip offset: slightly above and to the right of the cursor
    let x = e.clientX + 16;
    let y = e.clientY - 186;

    // Safety guard rails for browser screen boundaries (240px tooltip width, 170px height)
    if (typeof window !== 'undefined') {
      if (x + 248 > window.innerWidth) {
        x = e.clientX - 256; // Render to the left
      }
      if (y < 12) {
        y = e.clientY + 20; // Render below
      }
    }
    setCoords({ x, y });
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    handleMouseMove(e);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    
    // Add brief 150ms delay to prevent flickering on fast sweeps
    hoverTimerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 120);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsVisible(false);
  };

  // Check if image is blank/missing or placeholder
  const hasCustomPreview = project.image && project.image.trim() !== '' && !project.image.includes('placeholder-empty');

  const destinationLabel = isGithub 
    ? 'github.com/Wrap15' 
    : (project.link ? new URL(project.link).hostname : 'live-demo');

  return (
    <div 
      className={cn("relative inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 280 }}
            style={{
              position: 'fixed',
              left: coords.x,
              top: coords.y,
              zIndex: 9999,
            }}
            className="pointer-events-none w-60 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-xl overflow-hidden backdrop-blur-md"
          >
            {/* Image Preview Field */}
            <div className="relative aspect-[16/10] w-full border-b border-neutral-100 dark:border-white/5 overflow-hidden">
              {hasCustomPreview ? (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover filter saturate-85"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <AIPlaceholderImage title={project.title} />
              )}

              {/* Status badge */}
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs border border-white/10 text-[8px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                {isGithub ? (
                  <>
                    <Github size={8} />
                    <span>View Repository</span>
                  </>
                ) : (
                  <>
                    <ExternalLink size={8} className="text-emerald-400" />
                    <span className="text-emerald-400">View Deployment</span>
                  </>
                )}
              </div>
            </div>

            {/* Subtext info panel */}
            <div className="p-3.5 space-y-1 bg-white/95 dark:bg-neutral-950/95">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                {project.title}
              </h4>
              <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 truncate">
                {destinationLabel}
              </p>
              
              {/* Micro specs bullet row */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-neutral-100 dark:border-white/5 mt-1.5">
                {project.tags.slice(0, 2).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-white/10 text-neutral-500 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="text-[8px] font-bold text-neutral-400">
                    +{project.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
