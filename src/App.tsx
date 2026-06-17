import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, Variants, useTransform, useMotionValue, useMotionTemplate } from 'motion/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Code2, 
  GraduationCap, 
  Briefcase, 
  User,
  ArrowUpRight,
  Menu,
  X,
  MessageCircle,
  ArrowUp,
  Gauge,
  Laptop,
  Lightbulb,
  Rocket,
  Sun,
  Moon,
  Atom,
  Globe,
  Cpu,
  Database,
  Layers,
  Terminal,
  Settings,
  Users,
  Zap,
  Wind,
  Monitor,
  CheckCircle2,
  Trello,
  Server,
  Sparkles,
  Play,
  Info,
  BarChart2,
  FileText,
  Kanban
} from 'lucide-react';
import { PROJECTS, EDUCATION, SKILLS, Project } from './constants';
import { cn } from './lib/utils';
import { submitContactForm } from './firebase';
import { ProjectDetailPanel } from './components/ProjectDetailPanel';
import { ProjectCard } from './components/ProjectCard';
import { Particle3DField } from './components/Particle3DField';
import { SuccessConfetti } from './components/SuccessConfetti';
import { HoverPreviewTooltip } from './components/HoverPreviewTooltip';
import { playNavClickSound, playResumeChime, playHoverSound } from './lib/sounds';

const Navbar = ({ theme, toggleTheme }: { theme: string, toggleTheme: (e?: React.MouseEvent) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-4",
      isScrolled 
        ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200/50 dark:border-white/5 py-3" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const element = document.getElementById('about');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="text-xl font-serif italic font-bold tracking-tight text-neutral-950 dark:text-white cursor-pointer select-none"
        >
          Dhaval<span className="text-emerald-500">.</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={playNavClickSound}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors animate-fade-in"
            >
              {link.name}
            </motion.a>
          ))}
          
          <button
            onClick={(e) => {
              playNavClickSound();
              toggleTheme(e);
            }}
            className="relative p-2 w-9 h-9 flex items-center justify-center overflow-hidden rounded-full hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all shadow-sm border border-neutral-200 dark:border-white/10"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ opacity: 0, scale: 0.6, rotate: -45, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.6, rotate: 45, filter: "blur(4px)" }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex items-center justify-center shrink-0"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>

          <motion.a
            href="https://drive.google.com/file/d/1JSKxzXl2HKSGffpkCo5HuOnyy8Mnoeyt/view?usp=drive_link"
            download="Dhaval_Panchal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={playResumeChime}
            className="px-5 py-2 rounded-full bg-emerald-500 text-neutral-950 text-sm font-bold hover:bg-emerald-400 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            Resume
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={(e) => {
              playNavClickSound();
              toggleTheme(e);
            }}
            className="relative p-2 w-9 h-9 flex items-center justify-center overflow-hidden rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5 active:scale-95 transition-all border border-neutral-200/40 dark:border-white/5"
            aria-label="Toggle theme mobile"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ opacity: 0, scale: 0.6, rotate: -45, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.6, rotate: 45, filter: "blur(4px)" }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex items-center justify-center shrink-0"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>

          <button 
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5 active:scale-95 transition-all border border-neutral-200/40 dark:border-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Full Utility Suit & Backdrop Blur */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="md:hidden absolute top-[calc(100%-8px)] left-4 right-4 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-lg border border-neutral-200/50 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-40 mt-2"
          >
            <div className="flex flex-col gap-3 p-5">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => {
                    playNavClickSound();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-base font-bold text-neutral-700 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 py-1.5 transition-colors border-b border-neutral-100 dark:border-white/5 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight size={14} className="text-neutral-400" />
                </motion.a>
              ))}
              
              <div className="pt-2 flex flex-col gap-3">
                {/* Mobile resume quick link */}
                <a
                  href="https://drive.google.com/file/d/1JSKxzXl2HKSGffpkCo5HuOnyy8Mnoeyt/view?usp=drive_link"
                  download="Dhaval_Panchal_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playResumeChime}
                  className="w-full text-center py-3 rounded-xl bg-emerald-500 text-neutral-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/10 cursor-pointer active:scale-98 transition-transform"
                >
                  <GraduationCap size={16} />
                  Download Resume
                </a>
                
                {/* Quick Social Contacts in mobile panel */}
                <div className="flex items-center justify-center gap-5 pt-3 border-t border-neutral-100 dark:border-white/5 text-neutral-500 dark:text-neutral-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <a href="https://github.com/Wrap15" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">GitHub</a>
                  <span className="text-neutral-300 dark:text-white/10">•</span>
                  <a href="https://www.linkedin.com/in/dhaval-panchal-726a0625b/" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">LinkedIn</a>
                  <span className="text-neutral-300 dark:text-white/10">•</span>
                  <a href="https://wa.me/919875161613" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">WhatsApp</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface HeroSlabProps {
  label: string;
  title: string;
  icon: React.ComponentType<any>;
  color: 'emerald' | 'sky' | 'purple' | 'pink';
  targetTag: string;
  onSlabClick: (tag: string) => void;
}

const HeroSlab: React.FC<HeroSlabProps> = ({ label, title, icon: Icon, color, targetTag, onSlabClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHoverSound();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    playResumeChime();
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.vibrate) {
      // Subtle single vibration tick for professional tactile confirmation
      navigator.vibrate(15);
    }
    onSlabClick(targetTag);
  };

  const colors = {
    emerald: {
      border: 'border-emerald-500/10 hover:border-emerald-500/35 dark:border-emerald-500/10 dark:hover:border-emerald-400/30',
      text: 'text-emerald-500 dark:text-emerald-400',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/15',
      spotlight: 'rgba(16, 185, 129, 0.12)',
      shadow: 'hover:shadow-[0_12px_32px_rgba(16,185,129,0.08)] dark:hover:shadow-[0_12px_32px_rgba(16,185,129,0.05)]'
    },
    sky: {
      border: 'border-sky-500/10 hover:border-sky-500/35 dark:border-sky-500/10 dark:hover:border-sky-400/30',
      text: 'text-sky-500 dark:text-sky-400',
      iconBg: 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-500/15',
      spotlight: 'rgba(14, 165, 233, 0.12)',
      shadow: 'hover:shadow-[0_12px_32px_rgba(14,165,233,0.08)] dark:hover:shadow-[0_12px_32px_rgba(14,165,233,0.05)]'
    },
    purple: {
      border: 'border-purple-500/10 hover:border-purple-500/35 dark:border-purple-500/10 dark:hover:border-purple-400/30',
      text: 'text-purple-500 dark:text-purple-400',
      iconBg: 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/15',
      spotlight: 'rgba(168, 85, 247, 0.12)',
      shadow: 'hover:shadow-[0_12px_32px_rgba(168, 85, 247, 0.08)] dark:hover:shadow-[0_12px_32px_rgba(168, 85, 247, 0.05)]'
    },
    pink: {
      border: 'border-pink-500/10 hover:border-pink-500/35 dark:border-pink-500/10 dark:hover:border-pink-400/30',
      text: 'text-pink-500 dark:text-pink-400',
      iconBg: 'bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 border-pink-500/15',
      spotlight: 'rgba(236, 72, 153, 0.12)',
      shadow: 'hover:shadow-[0_12px_32px_rgba(236, 72, 153, 0.08)] dark:hover:shadow-[0_12px_32px_rgba(236, 72, 153, 0.05)]'
    }
  }[color];

  const spotlightBackground = useMotionTemplate`radial-gradient(100px circle at ${mouseX}px ${mouseY}px, ${colors.spotlight}, transparent 80%)`;

  return (
    <motion.div
      whileHover={{ y: -1.5, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-lg sm:rounded-xl p-1.5 min-[375px]:p-2 sm:p-2.5 text-left border bg-white/40 dark:bg-neutral-900/15 backdrop-blur-md transition-all duration-300 shadow-2xs flex items-center gap-1.5 min-[375px]:gap-2 sm:gap-2.5 w-full self-stretch select-none",
        colors.border,
        colors.shadow
      )}
    >
      {/* Interactive Spotlight background filter */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" 
        style={{ background: spotlightBackground }}
      />

      {/* Decorative accent background blob */}
      <div className={cn(
        "absolute -right-4 -bottom-4 w-12 h-12 rounded-full blur-xl pointer-events-none opacity-10 dark:opacity-5 transition-opacity duration-300 z-0",
        color === 'emerald' && 'bg-emerald-500',
        color === 'sky' && 'bg-sky-500',
        color === 'purple' && 'bg-purple-500',
        color === 'pink' && 'bg-pink-500'
      )} />

      {/* Left side: Icon Container */}
      <div className={cn(
        "w-5 h-5 min-[375px]:w-5.5 min-[375px]:h-5.5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-105 relative z-10",
        colors.iconBg
      )}>
        <Icon className={cn(
          "size-2.5 min-[375px]:size-3 sm:size-4 transition-transform duration-300",
          color === 'sky' && 'animate-[spin_8s_linear_infinite]',
          color === 'purple' && 'animate-pulse',
          color === 'pink' && 'group-hover:animate-[bounce_1s_infinite]'
        )} />
      </div>

      {/* Right side: Inner content */}
      <div className="flex-1 min-w-0 relative z-10 flex flex-col justify-center">
        <p className={cn(
          "text-[5.5px] min-[375px]:text-[6px] sm:text-[7.5px] font-bold font-mono uppercase tracking-[0.14em] leading-none mb-0.5 sm:mb-1 transition-all select-none opacity-80 dark:opacity-85",
          colors.text
        )}>
          {label}
        </p>
        <p className="text-[9.5px] min-[375px]:text-[10px] sm:text-[11.5px] md:text-[12px] font-display font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight leading-none min-[375px]:leading-snug truncate group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
          {title}
        </p>
      </div>

      {/* Ultra subtle hover shortcut cue on desktop */}
      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 pointer-events-none hidden md:block">
        <ArrowUpRight size={12} className={cn("transition-transform", colors.text)} />
      </div>
    </motion.div>
  );
};

const AnimatedCounter = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsedTime = timestamp - startTimestamp;
      const progress = Math.min(elapsedTime / duration, 1);
      
      setCount(Math.floor(easeOutCubic(progress) * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrame);
  }, [value, duration]);

  return <>{count}%</>;
};

const Hero = ({ onSlabClick }: { onSlabClick: (tag: string) => void }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dashboardTab, setDashboardTab] = useState<'profile' | 'terminal' | 'metrics'>('profile');
  const [tabDirection, setTabDirection] = useState<-1 | 1>(1);
  const [activeCmd, setActiveCmd] = useState<'cat bio.md' | 'npm test' | 'coffee --status'>('cat bio.md');
  const [indianTime, setIndianTime] = useState("");
  const [consoleState, setConsoleState] = useState<'normal' | 'minimized' | 'fullwidth' | 'closed'>('closed');
  const profileCardRef = useRef<HTMLDivElement>(null);
  
  // Rotating headline index
  const highlights = [
    "High-Performance Fintech Apps",
    "Intelligent AI Web Workspaces",
    "Tailwind & Pixel Perfect Interfaces",
    "Sub-100ms Core Web Vitals"
  ];

  // Rotate tagline highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Live IST clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setIndianTime(new Date().toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Interactive 3D mouse tracking for Right Profile Card
  const profX = useMotionValue(0);
  const profY = useMotionValue(0);
  const profMouseX = useMotionValue(0);
  const profMouseY = useMotionValue(0);

  // Map mouse positions to 3D rotation angles
  const profRotateX = useTransform(profY, [-0.5, 0.5], [10, -10]);
  const profRotateY = useTransform(profX, [-0.5, 0.5], [-10, 10]);

  const profSpringConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const smoothProfRotateX = useSpring(profRotateX, profSpringConfig);
  const smoothProfRotateY = useSpring(profRotateY, profSpringConfig);
  const smoothProfScale = useSpring(useMotionValue(1), profSpringConfig);
  const spotlightBg = useMotionTemplate`radial-gradient(180px circle at ${profMouseX}px ${profMouseY}px, rgba(16, 185, 129, 0.12), transparent 85%)`;

  const tabVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 380, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 380, damping: 30 },
        opacity: { duration: 0.15 }
      }
    })
  };

  const handleProfMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!profileCardRef.current) return;
    const rect = profileCardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const normX = (event.clientX - rect.left) / width - 0.5;
    const normY = (event.clientY - rect.top) / height - 0.5;

    profX.set(normX);
    profY.set(normY);

    profMouseX.set(event.clientX - rect.left);
    profMouseY.set(event.clientY - rect.top);
  };

  const handleProfMouseEnter = () => {
    smoothProfScale.set(1.02);
  };

  const handleProfMouseLeave = () => {
    profX.set(0);
    profY.set(0);
    smoothProfScale.set(1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Subtle magnetic attraction force
    const x = (clientX - centerX) * 0.35;
    const y = (clientY - centerY) * 0.35;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  const handleTabChange = (tab: 'profile' | 'terminal' | 'metrics') => {
    const tabIndices = {
      profile: 0,
      terminal: 1,
      metrics: 2
    };
    const currentIdx = tabIndices[dashboardTab];
    const targetIdx = tabIndices[tab];
    setTabDirection(targetIdx > currentIdx ? 1 : -1);
    setDashboardTab(tab);
    playHoverSound();
  };

  const handleCmdClick = (cmd: 'cat bio.md' | 'npm test' | 'coffee --status') => {
    setActiveCmd(cmd);
    playHoverSound();
  };

  const handleConsoleAction = (action: 'close' | 'minimize' | 'fullwidth') => {
    if (action === 'close') {
      setConsoleState('closed');
      playNavClickSound();
    } else if (action === 'minimize') {
      setConsoleState(prev => prev === 'minimized' ? 'normal' : 'minimized');
      playNavClickSound();
    } else if (action === 'fullwidth') {
      setConsoleState(prev => prev === 'fullwidth' ? 'normal' : 'fullwidth');
      playNavClickSound();
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="relative lg:min-h-screen flex items-center pt-14 sm:pt-28 pb-8 sm:pb-20 overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Background Decorative Grid and Glow Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_30%_50%,#000_75%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-emerald-500/[0.08] dark:bg-emerald-500/[0.05] rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.06] dark:bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      
      {/* 3D Parallax Particle Field Overlay */}
      <Particle3DField />
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text & Info Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={cn(
               "flex flex-col items-start text-left max-w-3xl transition-all duration-350",
              consoleState === 'fullwidth' ? "lg:col-span-12 xl:col-span-12 max-w-full" : "lg:col-span-7 xl:col-span-8",
              consoleState === 'closed' ? "lg:col-span-12 xl:col-span-12 max-w-full" : ""
            )}
          >
            {/* Status Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-400/10 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[7px] min-[360px]:text-[8px] sm:text-[9.5px] font-bold font-mono uppercase tracking-wider min-[360px]:tracking-widest select-none cursor-default mb-6 sm:mb-9 shrink-0 shadow-sm"
            >
              <span className="relative flex h-1 w-1 sm:h-1.5 sm:w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1 w-1 sm:h-1.5 sm:w-1.5 bg-emerald-500"></span>
              </span>
              Available for Full-Time Roles &amp; Freelance Core Projects
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl min-[360px]:text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6rem] font-serif font-extrabold leading-[0.9] mb-4 sm:mb-6 text-neutral-950 dark:text-white tracking-tight relative select-none"
            >
              Dhaval 
              <span className="block bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-400 bg-clip-text text-transparent italic mt-1.5 pb-1 pr-4 drop-shadow-[0_2px_10px_rgba(16,185,129,0.15)]">Panchal</span>
              {/* Technical aesthetic coordinates overlay */}
              <span className="absolute -top-3.5 right-6 text-[8px] font-mono text-neutral-400/50 dark:text-neutral-500/30 tracking-[0.25em] select-none hidden sm:inline-block">
                SYS_LOC [23° N, 72° E]
              </span>
            </motion.h1>

            {/* Premium Interactive Bento-Style Slabs */}
            <motion.div
              variants={itemVariants}
              className="mb-4 sm:mb-6 mt-2 sm:mt-3 w-full"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 w-full">
                <HeroSlab 
                  label="Architecting" 
                  title="FullStack Developer" 
                  icon={Code2} 
                  color="emerald" 
                  targetTag="Next.js 14"
                  onSlabClick={onSlabClick}
                />
                <HeroSlab 
                  label="Specializing" 
                  title="React Specialist" 
                  icon={Atom} 
                  color="sky" 
                  targetTag="React 18"
                  onSlabClick={onSlabClick}
                />
                <HeroSlab 
                  label="Integrating" 
                  title="GenAI Integrator" 
                  icon={Sparkles} 
                  color="purple" 
                  targetTag="Zustand"
                  onSlabClick={onSlabClick}
                />
                <HeroSlab 
                  label="Vibing" 
                  title="Vibe Coder" 
                  icon={Rocket} 
                  color="pink" 
                  targetTag="Framer Motion"
                  onSlabClick={onSlabClick}
                />
              </div>
            </motion.div>

            <AnimatePresence>
              {consoleState === 'closed' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mb-4 sm:mb-6"
                >
                  <button
                    onClick={() => {
                      setConsoleState('normal');
                      playResumeChime();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold tracking-tight shadow-xs cursor-pointer transition-all"
                  >
                    <Sparkles size={11} className="animate-pulse" />
                    Restore Interactive Workspace Console
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div 
              variants={itemVariants}
              className="text-xs sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mb-5 sm:mb-7 leading-relaxed text-left font-sans"
            >
              {/* Interactive Smooth Tagline Rotator */}
              <div className="h-5 sm:h-7 mb-1 overflow-hidden flex items-center">
                <span className="text-neutral-950 dark:text-white font-serif italic mr-1.5 shrink-0 text-xs sm:text-lg">I craft</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIndex}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="text-emerald-500 dark:text-emerald-400 font-extrabold tracking-tight text-xs sm:text-lg"
                  >
                    {highlights[currentIndex]}.
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-[10.5px] min-[360px]:text-xs sm:text-sm md:text-base mt-1.5 sm:mt-2">
                Frontend-focused Full Stack Developer specializing in MERN, client rendering engine design, intelligent GenAI interfaces, and sub-100ms Core Web Vitals optimization.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-start gap-2.5 sm:gap-3.5 w-full"
            >
              {/* Primary View Projects */}
              <motion.a 
                animate={{ x: coords.x, y: coords.y }}
                transition={{ type: "spring", stiffness: 120, damping: 10, mass: 0.8 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileTap={{ scale: 0.98 }}
                href="#projects" 
                onClick={(e) => {
                  e.preventDefault();
                  playNavClickSound();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-5 py-2.5 sm:px-6.5 sm:py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold dark:bg-white dark:hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5 group shadow-md shadow-emerald-500/10 dark:shadow-white/5 text-xs sm:text-sm cursor-pointer whitespace-nowrap"
              >
                <span>View Projects</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
              

              <div className="w-full sm:w-auto flex items-center justify-center gap-4 bg-neutral-100/50 dark:bg-neutral-900/25 px-4.5 py-2.5 sm:px-5 sm:py-3 rounded-full border border-neutral-200/40 dark:border-white/5 backdrop-blur-sm shadow-2xs md:ml-2">
                <a href="https://github.com/Wrap15" target="_blank" rel="noreferrer" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-200" title="GitHub"><Github size={16} /></a>
                <div className="w-px h-3 bg-neutral-300 dark:bg-white/10" />
                <a href="https://www.linkedin.com/in/dhaval-panchal-726a0625b/" target="_blank" rel="noreferrer" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-200" title="LinkedIn"><Linkedin size={16} /></a>
                <div className="w-px h-3 bg-neutral-300 dark:bg-white/10" />
                <a href="https://wa.me/919875161613" target="_blank" rel="noreferrer" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-200" title="WhatsApp"><MessageCircle size={16} /></a>
                <div className="w-px h-3 bg-neutral-300 dark:bg-white/10" />
                <a href="mailto:dhavalpanchal1775@gmail.com" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-200" title="Email"><Mail size={16} /></a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Premium Interactive Developer Console Board (3D Rotation) */}
          <AnimatePresence>
            {consoleState !== 'closed' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={cn(
                  "block relative mt-6 lg:mt-0 transition-all duration-350",
                  consoleState === 'fullwidth' 
                    ? "col-span-1 lg:col-span-12 xl:col-span-12 w-full flex justify-center" 
                    : "col-span-1 lg:col-span-15 xl:col-span-4 lg:col-span-5"
                )}
              >
                <motion.div
                  ref={profileCardRef}
                  style={{
                    rotateX: consoleState === 'fullwidth' ? 0 : smoothProfRotateX,
                    rotateY: consoleState === 'fullwidth' ? 0 : smoothProfRotateY,
                    scale: smoothProfScale,
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                  }}
                  onMouseMove={handleProfMouseMove}
                  onMouseEnter={handleProfMouseEnter}
                  onMouseLeave={handleProfMouseLeave}
                  className={cn(
                    "relative w-full rounded-3xl bg-neutral-55 sm:bg-neutral-50 dark:bg-neutral-900/35 border border-neutral-200/60 dark:border-white/10 shadow-xl shadow-neutral-200/50 dark:shadow-neutral-900/30 backdrop-blur-md flex flex-col overflow-hidden group select-none cursor-default will-change-transform transition-all duration-350",
                    consoleState === 'fullwidth' 
                      ? "max-w-full md:h-[360px]" 
                      : consoleState === 'minimized'
                        ? "max-w-[420px] lg:max-w-[370px] h-[46px]"
                        : "max-w-[420px] lg:max-w-[370px] aspect-[4/3] min-[450px]:aspect-square"
                  )}
                >
                  {/* Option B Spotlight glow reflection layer */}
                  <motion.div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    style={{
                      background: spotlightBg,
                    }}
                  />

                  {/* Console Dashboard Header Command Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-neutral-100/80 dark:bg-neutral-950/40 border-b border-neutral-200/50 dark:border-white/5 shrink-0 z-10">
                    {/* Traffic System dots */}
                    <div className="flex gap-1.5 group/dots items-center">
                      <button
                        onClick={() => handleConsoleAction('close')}
                        className="w-2.5 h-2.5 rounded-full bg-red-400 dark:bg-red-500/80 hover:bg-red-500 flex items-center justify-center text-[7px] font-extrabold text-red-950/10 hover:text-red-900 dark:text-red-950/10 dark:hover:text-red-950 transition-all select-none cursor-pointer h-2.5 border-0 p-0 relative"
                        title="Close"
                        style={{ outline: 'none' }}
                      >
                        <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity mb-[0.2px] pointer-events-none">×</span>
                      </button>
                      <button
                        onClick={() => handleConsoleAction('minimize')}
                        className="w-2.5 h-2.5 rounded-full bg-yellow-405 dark:bg-yellow-500/80 hover:bg-yellow-500 flex items-center justify-center text-[7px] font-extrabold text-yellow-955/10 hover:text-yellow-900 dark:text-yellow-955/10 dark:hover:text-yellow-950 transition-all select-none cursor-pointer h-2.5 border-0 p-0 relative"
                        title="Minimize"
                        style={{ outline: 'none' }}
                      >
                        <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity mb-[1.2px] leading-none pointer-events-none">-</span>
                      </button>
                      <button
                        onClick={() => handleConsoleAction('fullwidth')}
                        className="w-2.5 h-2.5 rounded-full bg-emerald-405 dark:bg-emerald-500/80 hover:bg-emerald-500 flex items-center justify-center text-[5px] font-extrabold text-emerald-955/10 hover:text-emerald-900 dark:text-emerald-955/10 dark:hover:text-emerald-950 transition-all select-none cursor-pointer h-2.5 border-0 p-0 relative"
                        title="Toggle Full Width"
                        style={{ outline: 'none' }}
                      >
                        <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity mb-[0.2px] pointer-events-none">↕</span>
                      </button>
                    </div>
                
                {/* Micro Tabs Interface */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleTabChange('profile')}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-[10px] font-mono transition-all font-semibold cursor-pointer",
                      dashboardTab === 'profile' 
                        ? "bg-white dark:bg-neutral-800 text-emerald-500 dark:text-emerald-400 shadow-xs border border-neutral-200 dark:border-white/5" 
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                    )}
                  >
                    profile.json
                  </button>
                  <button
                    onClick={() => handleTabChange('terminal')}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-[10px] font-mono transition-all font-semibold cursor-pointer",
                      dashboardTab === 'terminal' 
                        ? "bg-white dark:bg-neutral-800 text-emerald-500 dark:text-emerald-400 shadow-xs border border-neutral-200 dark:border-white/5" 
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                    )}
                  >
                    terminal.sh
                  </button>
                  <button
                    onClick={() => handleTabChange('metrics')}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-[10px] font-mono transition-all font-semibold cursor-pointer",
                      dashboardTab === 'metrics' 
                        ? "bg-white dark:bg-neutral-800 text-emerald-500 dark:text-emerald-400 shadow-xs border border-neutral-200 dark:border-white/5" 
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                    )}
                  >
                    metrics.live
                  </button>
                </div>
              </div>

              {consoleState !== 'minimized' && (
                <>
                  {/* Grid abstract background panel */}
                  <div className="absolute inset-x-0 top-12 bottom-0 bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-[0.05] pointer-events-none" />

                  {/* 3D Translation of elements for real structural depth feel */}
                  <div style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }} className="flex-1 p-5 relative z-10 flex flex-col justify-between overflow-y-auto">
                
                <AnimatePresence mode="wait" custom={tabDirection}>
                  {dashboardTab === 'profile' && (
                    <motion.div
                      key="tab-profile"
                      custom={tabDirection}
                      variants={tabVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex flex-col h-full justify-between"
                    >
                      {/* Avatar Identity Info */}
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/25 flex items-center justify-center font-serif text-emerald-500 font-bold text-xl shadow-xs shrink-0 select-none">
                          D
                        </div>
                        <div>
                          <h3 className="font-extrabold text-neutral-800 dark:text-white text-base tracking-tight leading-none mb-1">Dhaval Panchal</h3>
                          <div className="flex items-center gap-1.5 font-mono text-[9px] text-neutral-500 dark:text-neutral-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                            <span>GUJARAT, INDIA</span>
                          </div>
                        </div>
                      </div>

                      {/* Line decorative divider */}
                      <div className="w-full h-px bg-neutral-200/50 dark:bg-white/5 mb-3" />

                      {/* Styled JSON Viewer with syntax highlights */}
                      <div className="bg-neutral-900/5 dark:bg-neutral-950/50 border border-neutral-200/30 dark:border-white/5 rounded-xl p-3.5 font-mono text-[10.5px] leading-relaxed text-left shrink-0 max-w-full">
                        <div className="text-zinc-600 dark:text-neutral-500">{"{"}</div>
                        
                        <div className="pl-4">
                          <span className="text-indigo-500 dark:text-sky-400">"role"</span>: <span className="text-amber-600 dark:text-amber-300">"FullStack & React Expert"</span>,
                        </div>
                        
                        <div className="pl-4">
                          <span className="text-indigo-500 dark:text-sky-400">"available"</span>: <span className="text-emerald-500 dark:text-emerald-400 font-bold">true</span>,
                        </div>
                        
                        <div className="pl-4">
                          <span className="text-indigo-500 dark:text-sky-400">"location"</span>: <span className="text-amber-600 dark:text-amber-300">"Gujarat, India"</span>,
                        </div>
                        
                        <div className="pl-4 flex items-center gap-1.5 flex-wrap">
                          <span className="text-indigo-500 dark:text-sky-400">"local_time"</span>:{" "}
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-900 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold shadow-inner">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {indianTime || "12:00:00 PM"}
                          </span>
                        </div>
                        
                        <div className="text-zinc-600 dark:text-neutral-500">{"}"}</div>
                      </div>
                    </motion.div>
                  )}

                  {dashboardTab === 'terminal' && (
                    <motion.div
                      key="tab-terminal"
                      custom={tabDirection}
                      variants={tabVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex flex-col h-full justify-between gap-3 text-left"
                    >
                      {/* Action command selectors */}
                      <div className="flex flex-wrap gap-1.5 shrink-0 z-10">
                        <button
                          onClick={() => handleCmdClick('cat bio.md')}
                          className={cn(
                            "px-2 py-1 rounded-md text-[9px] font-mono transition-all border font-semibold cursor-pointer",
                            activeCmd === 'cat bio.md'
                              ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                              : "bg-neutral-100 dark:bg-neutral-900 border-neutral-200/40 dark:border-white/5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                          )}
                        >
                          cat bio.md
                        </button>
                        <button
                          onClick={() => handleCmdClick('npm test')}
                          className={cn(
                            "px-2 py-1 rounded-md text-[9px] font-mono transition-all border font-semibold cursor-pointer",
                            activeCmd === 'npm test'
                              ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                              : "bg-neutral-100 dark:bg-neutral-900 border-neutral-200/40 dark:border-white/5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                          )}
                        >
                          npm test
                        </button>
                        <button
                          onClick={() => handleCmdClick('coffee --status')}
                          className={cn(
                            "px-2 py-1 rounded-md text-[9px] font-mono transition-all border font-semibold cursor-pointer",
                            activeCmd === 'coffee --status'
                              ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                              : "bg-neutral-100 dark:bg-neutral-900 border-neutral-200/40 dark:border-white/5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                          )}
                        >
                          coffee.sh
                        </button>
                      </div>

                      {/* Display shell execution area */}
                      <div className="flex-1 flex flex-col justify-center bg-neutral-950 border border-neutral-800/80 rounded-xl p-3.5 font-mono text-[10px] leading-normal text-neutral-300 min-h-[140px] overflow-y-auto">
                        <div className="flex items-center gap-1.5 mb-1.5 text-zinc-500 select-none text-[9px]">
                          <span>dhaval@portfolio:~$</span>
                          <span className="text-amber-400">{activeCmd}</span>
                        </div>

                        <div className="animate-fade-in flex-1">
                          {activeCmd === 'cat bio.md' && (
                            <div className="text-zinc-300">
                              <span className="text-emerald-400 font-bold block mb-1">=== DEVSPEC ===</span>
                              <p className="leading-relaxed text-zinc-400">
                                Driven to architect bulletproof full-stack engines, optimize client bundles to absolute limits, and design memorable interactive journeys.
                              </p>
                            </div>
                          )}

                          {activeCmd === 'npm test' && (
                            <div className="space-y-1 text-zinc-400">
                              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                                <CheckCircle2 size={11} className="shrink-0" />
                                <span>ALL SUITES GREEN [3/3]</span>
                              </div>
                              <div className="space-y-0.5 text-zinc-500 pl-1">
                                <p>✓ type checking: strict checks passed</p>
                                <p>✓ page speed: lighthouse index 100/100</p>
                                <p>✓ bundles: treeshaking optimized to 1.8MB</p>
                              </div>
                            </div>
                          )}

                          {activeCmd === 'coffee --status' && (
                            <div className="text-[10px] text-zinc-400 leading-normal">
                              <span className="text-purple-400 font-bold block mb-1">=== TELEMETRY ===</span>
                              <p>Brain Status: <span className="text-emerald-400 font-semibold animate-pulse">Compiling Next Idea</span></p>
                              <p>MERN State: <span className="text-sky-400 font-semibold">Fully Syncing</span></p>
                              <p>Coffee Cup: <span className="text-amber-500">100% Full (Inexhaustible)</span></p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {dashboardTab === 'metrics' && (
                    <motion.div
                      key="tab-metrics"
                      custom={tabDirection}
                      variants={tabVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex flex-col h-full justify-between gap-4 text-left"
                    >
                      {/* Competency metric visual bars */}
                      <div className="space-y-3 flex-1 justify-center flex flex-col">
                        <div>
                          <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-400 mb-1">
                            <span>MERN / REACT STACK</span>
                            <span className="text-emerald-500">
                              <AnimatedCounter value={98} duration={800} />
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-950 rounded-full overflow-hidden border border-neutral-200/30 dark:border-white/5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "98%" }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-400 mb-1">
                            <span>FINTECH ARCHITECTURE</span>
                            <span className="text-indigo-400">
                              <AnimatedCounter value={94} duration={800} />
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-950 rounded-full overflow-hidden border border-neutral-200/30 dark:border-white/5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "94%" }}
                              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-400 mb-1">
                            <span>PERFORMANCE &amp; CORE WEB VITALS</span>
                            <span className="text-amber-500">
                              <AnimatedCounter value={99} duration={800} />
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-950 rounded-full overflow-hidden border border-neutral-200/30 dark:border-white/5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "99%" }}
                              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-amber-500 to-rose-400 rounded-full"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Smooth CPU compiling frequency wave animations */}
                      <div className="w-full shrink-0">
                        <div className="text-[8px] font-mono text-neutral-400 dark:text-neutral-500 tracking-wider mb-1.5 uppercase select-none font-bold">
                          Live Active CPU Compilation Waveform:
                        </div>
                        <div className="flex items-end justify-center gap-1.5 h-11 w-full bg-neutral-100/50 dark:bg-neutral-950/40 rounded-xl p-2 border border-neutral-200/40 dark:border-white/5 overflow-hidden">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((k) => (
                            <motion.div
                              key={k}
                              className="w-[3px] rounded-full bg-emerald-500/75 dark:bg-emerald-400/70"
                              animate={{
                                height: [12, Math.random() * 26 + 4, 12]
                              }}
                              transition={{
                                duration: 0.7 + (k * 0.04) % 0.6,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Extra outer decorative floaters */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
                </>
              )}
            </motion.div>

            {/* Small floating particles around the card */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
              className="absolute -top-4 left-1/4 w-3 h-3 rounded-full bg-emerald-400/45 dark:bg-emerald-500/20 blur-[1px] pointer-events-none hidden lg:block"
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                x: [0, -8, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-12 -left-6 w-2.5 h-2.5 rounded-full bg-blue-400/45 dark:bg-blue-500/20 blur-[1px] pointer-events-none hidden lg:block"
            />
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle, icon: Icon, centered = false }: { title: string, subtitle: string, icon?: any, centered?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track this header's scroll progress through the viewport for interactive parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate dynamic 3D rotational tilt and scale based on scroll position
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.15, 0.9]);
  
  // Apply a smooth spring transition to the tilt values
  const springRotateX = useSpring(rotateX, { stiffness: 80, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 80, damping: 22 });
  const springScale = useSpring(scale, { stiffness: 80, damping: 22 });

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn("mb-16", centered && "text-center flex flex-col items-center")}
    >
      <div className={cn("flex items-center gap-3 text-emerald-500 mb-4", centered && "justify-center")}>
        {Icon && (
          <div style={{ perspective: "600px" }} className="inline-block">
            <motion.div
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                scale: springScale,
                transformStyle: "preserve-3d"
              }}
              className="flex items-center justify-center p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-150 dark:border-white/[0.04] shadow-xs hover:border-emerald-500/20 hover:dark:border-emerald-400/20 transition-all duration-300"
            >
              <Icon size={20} className="text-emerald-500" />
            </motion.div>
          </div>
        )}
        <span className="text-sm font-bold uppercase tracking-[0.2em]">{title}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-serif font-bold relative inline-block text-neutral-950 dark:text-white">
        {subtitle}
        {centered && <div className="mt-4 h-1 w-24 bg-neutral-950 dark:bg-white mx-auto rounded-full" />}
      </h2>
    </motion.div>
  );
};

const Shimmer = () => (
  <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: "100%" }}
    transition={{
      repeat: Infinity,
      duration: 1.6,
      ease: "linear",
    }}
    className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-200/50 dark:via-white/5 to-transparent"
  />
);

const ProjectSkeleton = () => (
  <div className="w-full relative overflow-hidden rounded-2xl">
    {/* Image container skeleton */}
    <div className="relative aspect-[4/3] rounded-2xl bg-neutral-100/60 dark:bg-neutral-900/40 overflow-hidden mb-6 border border-neutral-200/20 dark:border-white/5">
      <Shimmer />
    </div>
    
    {/* Tags & Date line skeleton */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-2">
        <div className="relative w-12 h-5 rounded bg-neutral-100/60 dark:bg-neutral-900/40 overflow-hidden border border-neutral-200/20 dark:border-white/5">
          <Shimmer />
        </div>
        <div className="relative w-16 h-5 rounded bg-neutral-100/60 dark:bg-neutral-900/40 overflow-hidden border border-neutral-200/20 dark:border-white/5">
          <Shimmer />
        </div>
      </div>
      <div className="relative w-16 h-4 rounded bg-neutral-100/60 dark:bg-neutral-900/40 overflow-hidden">
        <Shimmer />
      </div>
    </div>

    {/* Title skeleton */}
    <div className="relative h-7 w-2/3 bg-neutral-100/60 dark:bg-neutral-900/40 rounded mb-3 overflow-hidden">
      <Shimmer />
    </div>

    {/* Description skeleton */}
    <div className="space-y-2">
      <div className="relative h-4 w-full bg-neutral-100/60 dark:bg-neutral-900/40 rounded overflow-hidden">
        <Shimmer />
      </div>
      <div className="relative h-4 w-5/6 bg-neutral-100/60 dark:bg-neutral-900/40 rounded overflow-hidden">
        <Shimmer />
      </div>
    </div>
  </div>
);

const Projects = ({ 
  highlightedTag, 
  setHighlightedTag 
}: { 
  highlightedTag: string | null; 
  setHighlightedTag: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const featuredProjects = PROJECTS.filter(project => project.id !== '4');
  const archivedProjects = PROJECTS.filter(project => project.id === '4');

  return (
    <section id="projects" className="py-16 md:py-32 px-4 sm:px-6 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Portfolio" 
          subtitle="Selected Projects" 
          icon={Briefcase} 
        />

        <AnimatePresence>
          {highlightedTag && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between gap-3 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-5 py-3 rounded-2xl text-xs font-mono w-full max-w-md mx-auto mb-10 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Showing matches for tech: <strong>{highlightedTag}</strong></span>
              </div>
              <button
                onClick={() => setHighlightedTag(null)}
                className="hover:bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[10px] uppercase font-bold flex items-center gap-1"
                title="Clear highlight"
              >
                <span>Clear</span>
                <X size={10} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-16 w-full">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="projects-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {[1, 2, 3].map((n) => (
                  <ProjectSkeleton key={n} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="projects-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {featuredProjects.map((project, i) => (
                  <ProjectCard 
                    key={project.id}
                    project={project}
                    index={i}
                    onClick={() => setSelectedProject(project)}
                    highlightedTag={highlightedTag}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Older & Archived Projects Area */}
          {!isLoading && archivedProjects.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-12 border-t border-neutral-100 dark:border-white/[0.04]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">Historical & Older Work</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">A collection of early software experiments and archived builds.</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                {archivedProjects.map((project) => {
                  const isRowMatching = highlightedTag ? project.tags.includes(highlightedTag) : false;
                  const hasRowHighlight = !!highlightedTag;
                  return (
                    <HoverPreviewTooltip key={project.id} project={project} className="w-full block">
                      <div 
                        onClick={() => setSelectedProject(project)}
                        className={cn(
                          "group flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/10 border transition-all cursor-pointer shadow-sm",
                          !hasRowHighlight
                            ? "border-neutral-100 dark:border-white/[0.02] hover:border-neutral-200 dark:hover:border-white/5 hover:bg-neutral-100/40 dark:hover:bg-neutral-900/30"
                            : isRowMatching
                              ? "border-emerald-500/70 dark:border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.12)] ring-1 ring-emerald-500/10 scale-[1.005]"
                              : "border-neutral-150/10 dark:border-white/[0.01] opacity-35 dark:opacity-20"
                        )}
                        id={`archived-project-row-${project.id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 shrink-0 border border-neutral-200/40 dark:border-white/5 shadow-sm">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover filter saturate-50 group-hover:saturate-100 transition-all duration-300"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                                {project.title}
                              </h4>
                              <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-white/5 px-2 py-0.5 rounded-full border border-neutral-200/35 dark:border-white/5">
                                {project.date}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 max-w-xl">
                              {project.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 justify-between md:justify-end border-t md:border-none pt-3 md:pt-0 border-neutral-150 dark:border-white/[0.02]">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map(tag => {
                              const isTagHighlighted = highlightedTag === tag;
                              return (
                                <button
                                  key={tag}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setHighlightedTag(prev => prev === tag ? null : tag);
                                  }}
                                  className={cn(
                                    "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded transition-all cursor-pointer border focus:outline-none",
                                    isTagHighlighted
                                      ? "bg-emerald-500/10 border-emerald-500/60 text-emerald-600 dark:text-emerald-400 font-extrabold"
                                      : "bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-400 hover:text-emerald-500 hover:border-emerald-500/30"
                                  )}
                                  title={isTagHighlighted ? "Click to clear highlight" : `Highlight other projects with ${tag}`}
                                >
                                  {tag}
                                </button>
                              );
                            })}
                          </div>
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <a 
                              href={project.link} 
                              target="_blank"  
                              rel="noreferrer"
                              className="p-1.5 rounded-lg text-neutral-400 dark:text-neutral-500 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-white/5 transition-all"
                              title="Open archived live demo"
                            >
                              <ExternalLink size={15} />
                            </a>
                            <a 
                              href={project.githubLink || "https://github.com/Wrap15"} 
                              target="_blank" 
                              rel="noreferrer"
                              className="p-1.5 rounded-lg text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-all"
                              title="Open repository code"
                            >
                              <Github size={15} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </HoverPreviewTooltip>
                  );
                })}
              </div>
            </motion.div>
          )}

        </div>

        {/* Sliding Technical Case Detail Panel */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailPanel 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
              highlightedTag={highlightedTag}
              onTagClick={(tag) => setHighlightedTag(prev => prev === tag ? null : tag)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const EducationItemSkeleton = () => (
  <div className="relative pl-8 border-l border-neutral-200 dark:border-white/10">
    <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-neutral-200 dark:bg-neutral-800" />
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
      <div className="space-y-2 w-full md:w-2/3">
        <div className="relative h-7 w-1/2 bg-neutral-150 dark:bg-neutral-900/40 rounded overflow-hidden">
          <Shimmer />
        </div>
        <div className="relative h-5 w-1/3 bg-neutral-150 dark:bg-neutral-900/40 rounded overflow-hidden">
          <Shimmer />
        </div>
      </div>
      <div className="relative h-7 w-24 rounded-full bg-neutral-150 dark:bg-neutral-900/40 overflow-hidden border border-neutral-200/20 dark:border-white/5 self-start md:self-center">
        <Shimmer />
      </div>
    </div>
    <div className="space-y-2">
      <div className="relative h-4 w-full bg-neutral-150 dark:bg-neutral-900/40 rounded overflow-hidden">
        <Shimmer />
      </div>
      <div className="relative h-4 w-5/6 bg-neutral-150 dark:bg-neutral-900/40 rounded overflow-hidden">
        <Shimmer />
      </div>
    </div>
  </div>
);

const Education = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="education" className="py-16 md:py-32 px-4 sm:px-6 bg-neutral-50 dark:bg-neutral-900/30 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Academic" 
          subtitle="Education History" 
          icon={GraduationCap} 
        />
        
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="education-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {[1, 2].map((n) => (
                  <EducationItemSkeleton key={n} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="education-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.15 }}
                className="space-y-12"
              >
                {EDUCATION.map((edu, i) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -30, filter: "blur(5px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    className="relative pl-8 border-l border-neutral-200 dark:border-white/10"
                  >
                    <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">{edu.institution}</h3>
                        <p className="text-emerald-500 font-medium">{edu.degree}</p>
                      </div>
                      <div className="text-sm font-mono text-neutral-500 bg-neutral-100 dark:bg-white/5 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 self-start md:self-center">
                        {edu.period}
                      </div>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};



const SkillGroupSkeleton = () => (
  <div className="relative w-full">
    {/* Category header skeleton */}
    <div className="relative h-6 w-32 bg-neutral-100/60 dark:bg-neutral-900/40 rounded-lg mb-8 overflow-hidden border border-neutral-200/20 dark:border-white/5">
      <Shimmer />
    </div>
    
    {/* Tags wrapper skeleton */}
    <div className="flex flex-col gap-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="relative h-9 w-32 rounded-xl bg-neutral-100/60 dark:bg-neutral-900/40 overflow-hidden border border-neutral-200/20 dark:border-white/5 font-mono">
          <Shimmer />
        </div>
      ))}
    </div>
  </div>
);

const Skills = () => {
  const categories = ['Frontend', 'Backend', 'State Management', 'AI & Tools', 'Soft Skills'];
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setHasHover(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setHasHover(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.skills-category-header')) {
        setHoveredCategory(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(3px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const categoryDescriptions: Record<string, string> = {
    'Frontend': 'Interfaces and user experience using modern frameworks.',
    'Backend': 'Server-side logic, APIs, and database management.',
    'State Management': 'Robust schemas and high-performance client state stores.',
    'AI & Tools': 'Development tools, AI integrations, and deployment environments.',
    'Soft Skills': 'Professional execution, communications, and cooperative problem solving.'
  };
  
  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('react')) return Atom;
    if (n.includes('javascript') || n.includes('typescript')) return Code2;
    if (n.includes('html') || n.includes('css') || n.includes('api')) return Globe;
    if (n.includes('tailwind')) return Wind;
    if (n.includes('bootstrap')) return Trello;
    if (n.includes('node') || n.includes('express')) return Server;
    if (n.includes('python')) return Terminal;
    if (n.includes('mongo') || n.includes('mysql') || n.includes('firebase') || n.includes('postgres')) return Database;
    if (n.includes('github') || n.includes('git')) return Github;
    if (n.includes('postman')) return Settings;
    if (n.includes('vscode') || n.includes('vercel') || n.includes('vite')) return Monitor;
    if (n.includes('dsa') || n.includes('genai')) return Cpu;
    if (n.includes('oops') || n.includes('docker') || n.includes('zustand') || n.includes('redux')) return Layers;
    if (n.includes('detail') || n.includes('oriented')) return CheckCircle2;
    if (n.includes('learner') || n.includes('quick')) return Rocket;
    if (n.includes('ethic') || n.includes('work')) return Sparkles;
    return Zap;
  };
  
  return (
    <section id="skills" className="py-16 md:py-32 px-4 sm:px-6 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Expertise" 
          subtitle="Technical & Soft Skills" 
          icon={Code2} 
        />
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="skills-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-8"
            >
              {categories.map((cat) => (
                <SkillGroupSkeleton key={cat} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="skills-content"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-8"
            >
              {categories.map((cat, catIndex) => {
                const catColors: Record<string, { bg: string; border: string; text: string; shadow: string; hoverText: string; indicator: string; borderTop: string }> = {
                  'Frontend': {
                    bg: "rgba(16, 185, 129, 0.08)",
                    border: "rgba(16, 185, 129, 0.35)",
                    text: "text-emerald-500 dark:text-emerald-400",
                    shadow: "0 10px 20px -8px rgba(16, 185, 129, 0.3)",
                    hoverText: "group-hover:text-emerald-400",
                    indicator: "bg-emerald-500",
                    borderTop: "border-emerald-500/40 dark:border-emerald-500/50"
                  },
                  'Backend': {
                    bg: "rgba(99, 102, 241, 0.08)",
                    border: "rgba(99, 102, 241, 0.35)",
                    text: "text-indigo-500 dark:text-indigo-400",
                    shadow: "0 10px 20px -8px rgba(99, 102, 241, 0.3)",
                    hoverText: "group-hover:text-indigo-400",
                    indicator: "bg-indigo-500",
                    borderTop: "border-indigo-500/40 dark:border-indigo-500/50"
                  },
                  'State Management': {
                    bg: "rgba(14, 165, 233, 0.08)",
                    border: "rgba(14, 165, 233, 0.35)",
                    text: "text-sky-500 dark:text-sky-400",
                    shadow: "0 10px 20px -8px rgba(14, 165, 233, 0.3)",
                    hoverText: "group-hover:text-sky-400",
                    indicator: "bg-sky-500",
                    borderTop: "border-sky-500/40 dark:border-sky-500/50"
                  },
                  'AI & Tools': {
                    bg: "rgba(168, 85, 247, 0.08)",
                    border: "rgba(168, 85, 247, 0.35)",
                    text: "text-purple-500 dark:text-purple-400",
                    shadow: "0 10px 20px -8px rgba(168, 85, 247, 0.3)",
                    hoverText: "group-hover:text-purple-400",
                    indicator: "bg-purple-500",
                    borderTop: "border-purple-500/40 dark:border-purple-500/50"
                  },
                  'Soft Skills': {
                    bg: "rgba(244, 63, 94, 0.08)",
                    border: "rgba(244, 63, 94, 0.35)",
                    text: "text-rose-500 dark:text-rose-400",
                    shadow: "0 10px 20px -8px rgba(244, 63, 94, 0.3)",
                    hoverText: "group-hover:text-rose-400",
                    indicator: "bg-rose-500",
                    borderTop: "border-rose-500/40 dark:border-rose-500/50"
                  }
                };

                const colors = catColors[cat] || catColors['Frontend'];

                return (
                  <motion.div 
                    key={cat}
                    variants={cardVariants}
                    className="relative p-6 pt-8 rounded-[24px] border border-neutral-100 dark:border-white/[0.03] bg-neutral-50/30 dark:bg-neutral-900/5 hover:border-neutral-200/50 dark:hover:border-white/10 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/10 transition-all duration-300 overflow-hidden"
                  >
                    {/* Visual Card Accent Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-[2.5px] opacity-70 dark:opacity-55 ${colors.indicator}`} />

                    <div className="relative inline-block mb-6 skills-category-header">
                      <h3 
                        className="text-lg font-bold flex items-start gap-2 cursor-help group select-none font-serif"
                        onMouseEnter={() => hasHover && setHoveredCategory(cat)}
                        onMouseLeave={() => hasHover && setHoveredCategory(null)}
                        onClick={() => setHoveredCategory(hoveredCategory === cat ? null : cat)}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${colors.indicator} mt-2 group-hover:scale-150 transition-transform duration-300 shrink-0`} />
                        <span className="flex items-center gap-1.5 flex-wrap">
                          {cat}
                          <Info size={14} className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors opacity-60 group-hover:opacity-100 shrink-0 mt-0.5" />
                        </span>
                      </h3>
                      
                      <AnimatePresence>
                        {hoveredCategory === cat && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute z-20 left-0 top-full mt-2 w-48 p-3 rounded-lg bg-white dark:bg-neutral-800 shadow-xl border border-neutral-200 dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-300 pointer-events-none"
                          >
                            <div className="absolute -top-1 left-4 w-2 h-2 bg-white dark:bg-neutral-800 border-t border-l border-neutral-200 dark:border-white/10 rotate-45" />
                            {categoryDescriptions[cat]}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-col gap-3 items-start animate-fade-in w-full">
                      {SKILLS.filter(s => s.category === cat).map((skill, i) => {
                        const Icon = getIcon(skill.name);

                        return (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            whileHover={hasHover ? { 
                              scale: 1.05, 
                              rotate: i % 2 === 0 ? 1.5 : -1.5,
                              x: 4,
                              backgroundColor: colors.bg,
                              borderColor: colors.border,
                              boxShadow: colors.shadow
                            } : {}}
                            whileTap={{ scale: 0.95 }}
                            viewport={{ once: true }}
                            transition={{ 
                              type: "spring",
                              stiffness: 260,
                              damping: 18,
                              delay: (catIndex * 0.05) + (i * 0.02) 
                            }}
                            className="group flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-neutral-100/50 dark:bg-white/5 border border-neutral-200/50 dark:border-white/10 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer select-none shadow-sm hover:z-10 w-fit animate-fade-in"
                          >
                            <motion.div
                              whileHover={hasHover ? { rotate: [0, -15, 15, -10, 0], scale: 1.2 } : {}}
                              transition={{ duration: 0.4 }}
                              className={`${colors.text} ${colors.hoverText} pb-0.5 transition-colors`}
                            >
                              <Icon size={13} />
                            </motion.div>
                            {skill.name}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const TECH_ITEMS = [
  {
    name: "React",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6 stroke-[#61DAFB]" fill="none" strokeWidth="1.2">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#06B6D4">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.9 2.29 1.62C13.7 10.6 15.3 12 18.5 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.9-2.29-1.62-1.21-1.21-2.8-2.58-6-2.58zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.9 2.29 1.62 1.21 1.21 2.8 2.61 6 2.61 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.9-2.29-1.62-1.21-1.22-2.8-2.61-6-2.61z" />
      </svg>
    )
  },
  {
    name: "Firebase",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <path d="M3.89 15.55L11.52 2.22c.24-.42.85-.42 1.09 0l2.36 4.13" stroke="#FFCA28" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M20.07 15.55L12.45 2.22c-.24-.42-.85-.42-1.09 0L8.99 6.35" stroke="#F57C00" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M3 17.5h18" stroke="#FF7043" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 3v13.5" stroke="#FFA000" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <rect width="24" height="24" rx="4.5" fill="#3178C6" />
        <text x="12" y="16.5" fill="white" fontSize="11" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle">TS</text>
      </svg>
    )
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#339933" strokeWidth="2">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" strokeLinejoin="round" />
        <path d="M12 7l4 2.5v5L12 17l-4-2.5v-5L12 7z" fill="#339933" fillOpacity="0.2" />
      </svg>
    )
  },
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 15V9h2.5l3.5 4.5V9h1.5v6h-2.5L10 10.5V15H8z" />
      </svg>
    )
  },
  {
    name: "Vite",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <path d="M12 2L2 21h20L12 2z" stroke="#646CFF" strokeWidth="2" fill="#646CFF" fillOpacity="0.1" />
        <path d="M12 2l4 7-6 1 4 11-10-8 6-1-4-10z" fill="#FFD600" />
      </svg>
    )
  },
  {
    name: "Framer Motion",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M0 0h12l12 12H12L0 0zm0 12h12l12 12H12L0 12z" fill="#F43F5E" />
      </svg>
    )
  },
  {
    name: "Git",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#F05032" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22l10-10L12 2 2 12z" />
        <circle cx="12" cy="12" r="1.5" fill="#F05032" />
        <circle cx="12" cy="8" r="1.5" fill="#F05032" />
        <circle cx="8" cy="12" r="1.5" fill="#F05032" />
        <path d="M12 9.5v5" />
        <path d="M9.5 12h5" />
      </svg>
    )
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const footerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const footerItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const socialContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const socialItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85, y: 12 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 18
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    console.log('Sending message:', formData);
    try {
      const result = await submitContactForm(formData);
      console.log('Message sent successfully. Document ID:', result.id);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success status after 5 seconds to allow for new submission
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 px-4 sm:px-6 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Confetti animation on successful form submission */}
      <SuccessConfetti active={status === 'success'} />

      {/* Animated background particles effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-500/20"
            style={{
              width: Math.random() * 20 + 5,
              height: Math.random() * 20 + 5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeader 
          title="Connect" 
          subtitle="CONTACT" 
          centered 
        />
        
        <div className="text-center mb-12">
          <p className="text-emerald-500 font-medium mb-2">Please provide your feedback</p>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Have a project for me? I'd love to hear from you, give me a shout by email or by using the form below.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 rounded-[32px] text-center border border-emerald-500/30 bg-emerald-500/5"
            >
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <MessageCircle size={40} className="text-emerald-500" />
                </motion.div>
              </div>
              <h3 className="text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-4">Message Sent!</h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-8 max-w-md mx-auto">
                Thanks for reaching out, <span className="text-emerald-500 font-bold">Dhaval</span> has received your message and will get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-emerald-500 hover:text-white transition-all transform active:scale-95"
              >
                SEND ANOTHER MESSAGE
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-transparent border border-neutral-200 dark:border-white/20 px-6 py-4 text-neutral-950 dark:text-white focus:outline-none focus:border-emerald-500 transition-all rounded-xl hover:border-neutral-950/20 dark:hover:border-white/40"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-transparent border border-neutral-200 dark:border-white/20 px-6 py-4 text-neutral-950 dark:text-white focus:outline-none focus:border-emerald-500 transition-all rounded-xl hover:border-neutral-950/20 dark:hover:border-white/40"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="relative group">
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="w-full bg-transparent border border-neutral-200 dark:border-white/20 px-6 py-4 text-neutral-950 dark:text-white focus:outline-none focus:border-emerald-500 transition-all rounded-xl hover:border-neutral-950/20 dark:hover:border-white/40 resize-none"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="flex flex-col items-center gap-6">
                <button
                  id="submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-12 py-4 bg-emerald-500 text-black font-black tracking-[0.2em] hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase rounded-xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.4)] active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT MESSAGE</span>
                      <ArrowUpRight size={20} />
                    </>
                  )}
                </button>
                
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="flex items-center gap-2 text-rose-400 text-sm font-bold bg-rose-400/10 px-4 py-2 rounded-lg border border-rose-400/20"
                  >
                    <X size={16} />
                    <span>Something went wrong. Please try again.</span>
                  </motion.div>
                )}
              </div>
            </form>
          )}
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={footerContainerVariants}
          className="mt-24 pt-16 border-t border-neutral-200/60 dark:border-white/10 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 w-full text-left">
            {/* Column 1: Brand & Status ticker */}
            <motion.div 
              variants={footerItemVariants}
              className="md:col-span-8 flex flex-col gap-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span 
                  className="text-2xl font-serif italic font-bold tracking-tight text-neutral-950 dark:text-white cursor-pointer hover:opacity-85 transition-opacity"
                  onClick={() => {
                    const element = document.getElementById('about');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  Dhaval<span className="text-emerald-500">.</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/10">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-[ping_1.5s_infinite]"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  Available For Projects
                </span>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
                Frontend-Focused Full Stack Developer specializing in React &amp; performance optimization<br />
                Crafting modern, high-performance web apps with seamless UX and AI-powered experiences
              </p>
            </motion.div>

            {/* Column 2: Contact details & Socials */}
            <motion.div 
              variants={footerItemVariants}
              className="md:col-span-4 flex flex-col gap-4"
            >
              <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">Get In Touch</h4>
              <motion.div 
                variants={socialContainerVariants}
                className="flex items-center gap-3 mt-1"
              >
                {[
                  {
                    label: 'Gmail',
                    url: 'mailto:work.dhaval72@gmail.com',
                    customSvg: (
                      <svg 
                        className="size-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="3" y="5" width="18" height="14" rx="1.5" className="fill-neutral-200 dark:fill-neutral-800" />
                        <path d="M3 7V18C3 18.55 3.45 19 4 19H7V9.5L3 7Z" fill="#4285F4" />
                        <path d="M17 9.5V19H20C20.55 19 21 18.55 21 18V7L17 9.5Z" fill="#34A853" />
                        <path d="M12 13L7 9.5V19H17V9.5L12 13Z" fill="#FBBC05" />
                        <path d="M3 7L12 13L21 7V5.5L12 11.5L3 5.5V7Z" fill="#EA4335" />
                      </svg>
                    )
                  },
                  { icon: Github, url: 'https://github.com/Wrap15', label: 'GitHub' },
                  { icon: Linkedin, url: 'https://www.linkedin.com/in/dhaval-panchal-726a0625b/', label: 'LinkedIn' },
                  { icon: MessageCircle, url: 'https://wa.me/919875161613', label: 'WhatsApp' }
                ].map((social) => (
                  <motion.a 
                    key={social.label}
                    variants={socialItemVariants}
                    href={social.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 sm:p-2.5 rounded-full border border-neutral-200 dark:border-white/5 bg-neutral-100/35 dark:bg-neutral-900/35 text-neutral-600 dark:text-neutral-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 dark:hover:bg-emerald-500 dark:hover:text-emerald-500 transition-all duration-300 shadow-xs flex items-center justify-center group"
                    aria-label={social.label}
                  >
                    {social.customSvg ? (
                      social.customSvg
                    ) : (
                      social.icon && <social.icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Tech Stack Marquee Carousel */}
          <motion.div 
            variants={footerItemVariants}
            className="mt-12 pt-8 pb-4 border-t border-neutral-200/40 dark:border-white/[0.04] w-full overflow-hidden"
          >
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-6 text-center">
              CORE TECHNOLOGIES &amp; TOOLKIT
            </h4>
            
            <div className="relative w-full overflow-hidden">
              {/* Fade out masks on the sides */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-10" />
              
              <style>{`
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                  animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                  animation-play-state: paused;
                }
              `}</style>
              
              <div className="flex w-max animate-marquee gap-6 py-2 select-none">
                {/* First cycle and second cycle for seamless seamless loops */}
                {[...TECH_ITEMS, ...TECH_ITEMS].map((tech, idx) => (
                  <div 
                    key={`tech-item-${idx}`}
                    className="group/tech flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl border border-neutral-100 dark:border-white/[0.03] bg-neutral-50/40 dark:bg-neutral-900/5 hover:bg-white dark:hover:bg-neutral-900/30 hover:border-neutral-200 dark:hover:border-white/10 hover:shadow-xs transition-all duration-300 cursor-default"
                  >
                    <div className="transition-all duration-300 filter grayscale opacity-45 group-hover/tech:grayscale-0 group-hover/tech:opacity-100 group-hover/tech:scale-105 flex items-center justify-center">
                      {tech.icon}
                    </div>
                    <span className="text-xs font-bold text-neutral-400 group-hover/tech:text-neutral-800 dark:group-hover/tech:text-neutral-200 transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sub Footer row */}
          <motion.div 
            variants={footerItemVariants}
            className="pt-8 border-t border-neutral-200/50 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 pb-12"
          >
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="px-6 py-2.5 rounded-full bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-white/[0.03] hover:border-emerald-500/20 hover:dark:border-emerald-400/20 transition-all duration-300 flex items-center gap-2 flex-wrap justify-center text-center shadow-xs cursor-default select-none group/footer"
            >
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold">
                Designed &amp; Engineered with
              </span>
              <motion.span 
                animate={{ 
                  scale: [1, 1.2, 1, 1.2, 1],
                  filter: ["drop-shadow(0 0 1px rgba(168,85,247,0.3))", "drop-shadow(0 0 4px rgba(168,85,247,0.6))", "drop-shadow(0 0 1px rgba(168,85,247,0.3))"]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.6,
                  ease: "easeInOut"
                }}
                className="inline-block text-purple-500 text-sm mx-0.5"
              >
                💜
              </motion.span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold">
                by
              </span>
              <span className="font-sans text-xs sm:text-[13px] tracking-widest ml-1 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-emerald-500 dark:from-purple-400 dark:via-emerald-400 dark:to-blue-400 uppercase transition-all duration-300 group-hover/footer:brightness-110">
                DHAVAL PANCHAL
              </span>
            </motion.div>
            
            <div className="text-[11px] font-mono font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-widest text-center sm:text-right">
              © {new Date().getFullYear()} All rights reserved.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const competencies = [
    {
      title: 'Performance-First Philosophy',
      description: 'Deep focus on Core Web Vitals, Cumulative Layout Shift (CLS), and sub-200ms Largest Contentful Paint (LCP) benchmarks.',
      icon: Gauge,
      badge: '99 Score'
    },
    {
      title: 'Clean UI/UX Architecture',
      description: 'Designing functional, high-contrast, friction-free interfaces with responsive spring-interpolated animations.',
      icon: Layers,
      badge: '60 FPS'
    },
    {
      title: 'Real-World Production Experience',
      description: 'Shipping complete, reactive client-server architectures featuring optimal data modeling and robust security policies.',
      icon: Briefcase,
      badge: 'Full-Stack'
    },
    {
      title: 'API Optimization & Caching',
      description: 'Advanced throttle/debounce mechanics, custom storage fallbacks, and request deduplication to save network transit.',
      icon: Cpu,
      badge: '92% Saved'
    },
    {
      title: 'Generative AI Capabilities',
      description: 'Orchestrating robust model prompts, async streaming brokers, and context retrieval directly inside client layouts.',
      icon: Sparkles,
      badge: 'GenAI'
    },
    {
      title: 'Robust Code Hygiene',
      description: 'Exacting type safety using pure TypeScript, modular directory architectures, and systematic resource cleanups.',
      icon: Code2,
      badge: 'TypeScript'
    }
  ];

  return (
    <section id="why-hire-me" className="py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      <div className="absolute inset-0 bg-neutral-50/50 dark:bg-neutral-950/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-[10px] uppercase font-extrabold font-mono tracking-widest text-emerald-500 mb-2 block">Value Proposition</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-950 dark:text-white">Why Hire Me</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-3 max-w-lg mx-auto">
            Combining rigorous software engineering, clean performance constraints, and UI elegance to build elite digital products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {competencies.map((comp, i) => (
            <motion.div
              key={comp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="relative p-6 rounded-[24px] border border-neutral-200/50 dark:border-white/[0.04] bg-white dark:bg-neutral-900/10 hover:border-emerald-500/20 dark:hover:border-emerald-500/15 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.05)] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200/30 dark:border-white/5 flex items-center justify-center text-neutral-800 dark:text-emerald-400 shrink-0 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <comp.icon size={18} />
                  </div>
                  <span className="text-[9px] font-mono font-extrabold px-2.5 py-1 rounded bg-neutral-50 dark:bg-white/5 text-neutral-500 dark:text-neutral-400 uppercase tracking-widest border border-neutral-200/30 dark:border-white/5">
                    {comp.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 font-serif group-hover:text-emerald-500 transition-colors">
                  {comp.title}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {comp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const projectsEl = document.getElementById('projects');
      let isOverlappingProjects = false;
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        // Include a buffer area (e.g., 80px) to prevent button from clipping or overlapping card edges
        const BUFFER_PX = 80;
        const isProjectsInView = rect.top < (window.innerHeight - BUFFER_PX) && rect.bottom > BUFFER_PX;
        if (isProjectsInView) {
          isOverlappingProjects = true;
        }
      }

      if (window.scrollY > 200 && !isOverlappingProjects) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    // Execute a quick check coordinates immediately
    toggleVisibility();
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, backgroundColor: '#10b981' }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-neutral-900 dark:bg-emerald-500 text-white shadow-2xl border border-white/10 dark:border-none flex items-center justify-center transition-colors group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} className="group-hover:animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [highlightedTag, setHighlightedTag] = useState<string | null>(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  const toggleTheme = (e?: React.MouseEvent) => {
    const changeTheme = () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    };

    if (
      typeof document === 'undefined' ||
      typeof window === 'undefined' ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      document.documentElement.classList.add('theme-transitioning');
      changeTheme();
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 750);
      return;
    }

    let x = window.innerWidth - 40;
    let y = 40;

    if (e && e.clientX !== undefined && e.clientY !== undefined) {
      x = e.clientX;
      y = e.clientY;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      changeTheme();
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 650,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [theme]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const cursorOuterX = useSpring(cursorX, { stiffness: 120, damping: 22, mass: 0.6 });
  const cursorOuterY = useSpring(cursorY, { stiffness: 120, damping: 22, mass: 0.6 });

  const cursorInnerX = useSpring(cursorX, { stiffness: 450, damping: 30, mass: 0.1 });
  const cursorInnerY = useSpring(cursorY, { stiffness: 450, damping: 30, mass: 0.1 });

  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouchDevice(hasTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!showCursor) setShowCursor(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnterWindow = () => setShowCursor(true);
    const handleMouseLeaveWindow = () => setShowCursor(false);

    if (!isTouchDevice) {
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.addEventListener('mouseenter', handleMouseEnterWindow);
      document.body.addEventListener('mouseleave', handleMouseLeaveWindow);
    }

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.body.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [isTouchDevice, showCursor]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable = target.closest('a, button, [role="button"], .cursor-pointer, input, select, textarea');
      setIsHoveringLink(!!isClickable);
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice]);

  const [activeSection, setActiveSection] = useState('About');
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScrollPercentage = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent(Math.round((window.scrollY / totalHeight) * 100));
      }
    };
    window.addEventListener('scroll', handleScrollPercentage, { passive: true });
    handleScrollPercentage();

    const sections = [
      { id: 'about', label: 'About' },
      { id: 'projects', label: 'Projects' },
      { id: 'education', label: 'Education' },
      { id: 'skills', label: 'Skills' },
      { id: 'contact', label: 'Contact' }
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matched = sections.find(s => s.id === entry.target.id);
          if (matched) {
            setActiveSection(matched.label);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScrollPercentage);
      observer.disconnect();
    };
  }, []);

  return (
    <HelmetProvider>
      <div className={cn(
        "min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300",
        !isTouchDevice && showCursor && "cursor-none"
      )}>
        <Helmet>
          <title>Dhaval Panchal | Full-Time FullStack Developer &amp; React Specialist</title>
          <meta name="description" content="Portfolio of Dhaval Panchal, an ambitious FullStack Developer and React Specialist based in Gujarat, India. Specializing in elegant UX, production MERN apps, and GenAI integrations." />
          <meta name="keywords" content="Dhaval Panchal, Portfolio, FullStack Developer, MERN Stack, React Specialist, Gujarat India UI Web Developer" />
          
          {/* OpenGraph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://ais-pre-m3mprso6f5z7riitd2tpxt-403389390217.asia-southeast1.run.app" />
          <meta property="og:title" content="Dhaval Panchal | Full-Time FullStack Developer &amp; React Specialist" />
          <meta property="og:description" content="Explore Dhaval Panchal's portfolio. Specializing in front-end refinement, MERN backend stacks, and GenAI integrations." />
          <meta property="og:image" content="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://ais-pre-m3mprso6f5z7riitd2tpxt-403389390217.asia-southeast1.run.app" />
          <meta name="twitter:title" content="Dhaval Panchal | Full-Time FullStack Developer &amp; React Specialist" />
          <meta name="twitter:description" content="Explore Dhaval Panchal's portfolio. Specializing in front-end refinement, MERN backend stacks, and GenAI integrations." />
          <meta name="twitter:image" content="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" />
          
          <link rel="canonical" href="https://ais-pre-m3mprso6f5z7riitd2tpxt-403389390217.asia-southeast1.run.app" />
        </Helmet>

        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Hero onSlabClick={(tag) => {
          setHighlightedTag(tag);
          const el = document.getElementById('projects');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }} />
        
        <Features />
        <Projects highlightedTag={highlightedTag} setHighlightedTag={setHighlightedTag} />
        <Education />
        <Skills />
        <Contact />

        <ScrollToTop />
        
        {/* Reading Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[60] select-none pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1.5px] bg-emerald-500 origin-left"
            style={{ scaleX }}
          />
        </div>

        {/* Custom premium cursor with lagging effect */}
        {!isTouchDevice && showCursor && (
          <>
            {/* Lagging outer ring */}
            <motion.div
              style={{
                x: cursorOuterX,
                y: cursorOuterY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className={cn(
                "fixed top-0 left-0 rounded-full border border-emerald-500/80 pointer-events-none z-[9999] transition-[width,height,background-color] duration-300 ease-out",
                isHoveringLink ? "w-12 h-12 bg-emerald-500/8 dark:bg-emerald-400/[0.05] border-emerald-400" : "w-7 h-7",
                isClicking ? "scale-90 bg-emerald-500/15" : "scale-100"
              )}
            />
            {/* Focal inner dot */}
            <motion.div
              style={{
                x: cursorInnerX,
                y: cursorInnerY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className={cn(
                "fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-emerald-500 pointer-events-none z-[9999] transition-transform duration-200",
                isHoveringLink ? "scale-125 bg-emerald-400" : "scale-100"
              )}
            />
          </>
        )}
      </div>
    </HelmetProvider>
  );
}
