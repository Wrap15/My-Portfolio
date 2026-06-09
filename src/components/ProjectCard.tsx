import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { Project } from '../constants';
import { ExternalLink, Github } from 'lucide-react';
import { HoverPreviewTooltip } from './HoverPreviewTooltip';
import { playHoverSound } from '../lib/sounds';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Motion values for 3D rotation tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Motion values for actual cursor coordinates (glow spotlight)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Interpolation ranges maps normalized mouse position to angles of rotation
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  // Spring animations for a fluid, natural feel with momentum
  const springConfig = { damping: 20, stiffness: 150, mass: 0.6 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothScale = useSpring(useMotionValue(1), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalizing coordinates coordinates to ranges [-0.5, 0.5]
    const normX = (event.clientX - rect.left) / width - 0.5;
    const normY = (event.clientY - rect.top) / height - 0.5;

    x.set(normX);
    y.set(normY);

    // Pixel tracking coordinates for the spotlight effect
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);

    smoothScale.set(1.035);
  };

  const handleMouseEnter = () => {
    playHoverSound();
    smoothScale.set(1.035);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    smoothScale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
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
      onClick={onClick}
      className="group relative cursor-pointer bg-white dark:bg-neutral-900/10 p-4 rounded-3xl border border-neutral-100 dark:border-white/[0.02] hover:border-emerald-500/20 dark:hover:border-emerald-500/15 transition-all duration-300 shadow-sm hover:shadow-[0_20px_48px_-12px_rgba(16,185,129,0.08)] dark:hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.5)] dark:hover:bg-neutral-900/40 select-none will-change-transform overflow-hidden"
      id={`project-card-${project.id}`}
    >
      {/* Spotlight glow layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.12), transparent 80%)`,
        }}
      />

      {/* 3D Translation on nested elements for real depth feel */}
      <div style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }} className="w-full h-full relative z-10">
        
        {/* Main image container */}
        <div 
          style={{ transform: 'translateZ(10px)' }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/40 dark:border-white/5"
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          
          {/* Overlay with details */}
          <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6">
            <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400">Architecture Specs Included</span>
              <h3 className="text-lg font-bold text-white leading-tight">
                {project.title}
              </h3>
              <p className="text-xs text-neutral-300 line-clamp-5 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="flex justify-end items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
              <div className="flex gap-2.5" onClick={(e) => e.stopPropagation()}>
                {project.link && (
                  <HoverPreviewTooltip project={project}>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                      title="Open live website"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </HoverPreviewTooltip>
                )}
                <HoverPreviewTooltip project={project} isGithub={true}>
                  <a 
                    href={project.githubLink || "https://github.com/Wrap15"} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    title="Open repository code"
                  >
                    <Github size={16} />
                  </a>
                </HoverPreviewTooltip>
              </div>
            </div>
          </div>
        </div>
        
        {/* Keywords and tags */}
        <div style={{ transform: 'translateZ(5px)' }} className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-md bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-400">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-neutral-500 shrink-0">{project.date}</span>
        </div>
        
        {/* Title and footer of card */}
        <div style={{ transform: 'translateZ(8px)' }} className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold group-hover:text-emerald-500 transition-colors">
            {project.title}
          </h3>
          <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 group-hover:text-emerald-500 transition-colors shrink-0 flex items-center gap-1 pt-1">
            More info &rarr;
          </span>
        </div>
        
        <p style={{ transform: 'translateZ(3px)' }} className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};
