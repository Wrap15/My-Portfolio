import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Code2, 
  GraduationCap, 
  Briefcase, 
  User,
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';
import { PROJECTS, EDUCATION, SKILLS } from './constants';
import { cn } from './lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-neutral-950/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-serif italic font-bold tracking-tight"
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
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="/resume.pdf"
            download="Dhaval_Panchal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2 rounded-full bg-emerald-500 text-neutral-950 text-sm font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
          >
            Resume
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-neutral-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-900 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-neutral-400 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for new projects
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-8">
            Dhaval 
            <span className="block text-gradient italic">Panchal</span>
          </h1>
          
          <p className="text-lg text-neutral-400 max-w-lg mb-10 leading-relaxed">
            Proficient <span className="text-white font-medium">Front-end Developer</span> skilled in building responsive UIs with HTML, CSS, Bootstrap, and React.js. Dedicated to effective problem solving and crafting digital experiences.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 rounded-full bg-white text-neutral-950 font-bold hover:bg-neutral-200 transition-all flex items-center gap-2 group">
              View Projects
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4 px-4">
              <a href="https://github.com/Wrap15" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
              <a href="https://www.linkedin.com/in/dhaval-panchal-726a0625b/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.474-2.236-1.668-2.236-1.156 0-1.842.779-2.145 1.532-.11.269-.138.645-.138 1.022v5.251h-3.554s.047-8.514 0-9.396h3.554v1.328c1.014-1.563 2.833-3.788 6.907-3.788 5.048 0 8.836 3.301 8.836 10.4v9.456zM5.337 9.341c-1.141 0-1.889-.762-1.889-1.715 0-.954.748-1.716 1.933-1.716 1.185 0 1.89.761 1.91 1.716 0 .953-.725 1.715-1.954 1.715zm1.58 11.111H3.734V9.956h3.183v10.496zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0" /></svg></a>
              <a href="mailto:dhavalpanchal1775@gmail.com" className="text-neutral-400 hover:text-white transition-colors"><Mail size={24} /></a>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 glass p-4">
            <img 
              src="/profile.jpg" 
              alt="Dhaval Panchal" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://plus.unsplash.com/premium_vector-1728553012443-3cf619e7579d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
              }}
              className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-neutral-950">
                <Code2 size={24} />
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase font-bold tracking-widest">Experience</p>
                <p className="text-xl font-bold">2+ Years</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle: string, icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mb-16"
  >
    <div className="flex items-center gap-3 text-emerald-500 mb-4">
      <Icon size={20} />
      <span className="text-sm font-bold uppercase tracking-[0.2em]">{title}</span>
    </div>
    <h2 className="text-4xl md:text-5xl font-serif font-bold">{subtitle}</h2>
  </motion.div>
);

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Portfolio" 
          subtitle="Selected Projects" 
          icon={Briefcase} 
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="group relative"
            >
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-white text-neutral-950 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-white text-neutral-950 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-neutral-500">{project.date}</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-32 px-6 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Academic" 
          subtitle="Education History" 
          icon={GraduationCap} 
        />
        
        <div className="space-y-12">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -30, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="relative pl-8 border-l border-white/10"
            >
              <div className="absolute -left-1.25 top-0 w-2.25 h-2.25 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{edu.institution}</h3>
                  <p className="text-emerald-400 font-medium">{edu.degree}</p>
                </div>
                <div className="text-sm font-mono text-neutral-500 bg-white/5 px-3 py-1 rounded-full border border-white/10 self-start md:self-center">
                  {edu.period}
                </div>
              </div>
              <p className="text-neutral-400 max-w-3xl leading-relaxed">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = ['Frontend', 'Backend', 'Tools', 'Other'];
  
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Expertise" 
          subtitle="Technical Skills" 
          icon={Code2} 
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {categories.map((cat, catIndex) => (
            <motion.div 
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {cat}
              </h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS.filter(s => s.category === cat).map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (catIndex * 0.1) + (i * 0.05), ease: "easeOut" }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all cursor-default"
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass rounded-[40px] p-8 md:p-20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                Let's build something <span className="italic text-emerald-500">extraordinary</span> together.
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 mb-12">
                Have a project in mind? I'm currently available for freelance work and collaborations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <a 
                  href="mailto:dhavalpanchal1775@gmail.com"
                  className="w-full sm:w-auto px-6 sm:px-8 py-4 rounded-full bg-emerald-500 text-neutral-950 font-bold text-center hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 text-sm sm:text-base overflow-hidden"
                >
                  <Mail size={16} className="shrink-0" />
                  <span className="truncate">work.dhaval72@gmail.com</span>
                </a>
                <div className="flex items-center justify-center gap-6 py-2">
                  <a href="https://github.com/Wrap15" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                  <a href="https://www.linkedin.com/in/dhaval-panchal-726a0625b/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.474-2.236-1.668-2.236-1.156 0-1.842.779-2.145 1.532-.11.269-.138.645-.138 1.022v5.251h-3.554s.047-8.514 0-9.396h3.554v1.328c1.014-1.563 2.833-3.788 6.907-3.788 5.048 0 8.836 3.301 8.836 10.4v9.456zM5.337 9.341c-1.141 0-1.889-.762-1.889-1.715 0-.954.748-1.716 1.933-1.716 1.185 0 1.89.761 1.91 1.716 0 .953-.725 1.715-1.954 1.715zm1.58 11.111H3.734V9.956h3.183v10.496zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0" /></svg></a>
                </div>
              </div>
            </div>
          </motion.div>
        
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-sm"
        >
          <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
         
        </motion.footer>
      </div>
    </section>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Projects />
      <Education />
      <Skills />
      <Contact />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-60 origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
