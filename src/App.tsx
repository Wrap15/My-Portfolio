import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
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
  Gauge,
  Laptop,
  Lightbulb,
  Rocket
} from 'lucide-react';
import { PROJECTS, EDUCATION, SKILLS } from './constants';
import { cn } from './lib/utils';
import { submitContactForm } from './firebase';

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
            href="https://drive.google.com/file/d/1JSKxzXl2HKSGffpkCo5HuOnyy8Mnoeyt/view?usp=drive_link"
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
              <a href="https://github.com/Wrap15" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/dhaval-panchal-726a0625b/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
              <a href="https://wa.me/919875161613" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors"><MessageCircle size={24} /></a>
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

const SectionHeader = ({ title, subtitle, icon: Icon, centered = false }: { title: string, subtitle: string, icon?: any, centered?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={cn("mb-16", centered && "text-center flex flex-col items-center")}
  >
    <div className={cn("flex items-center gap-3 text-emerald-500 mb-4", centered && "justify-center")}>
      {Icon && <Icon size={20} />}
      <span className="text-sm font-bold uppercase tracking-[0.2em]">{title}</span>
    </div>
    <h2 className="text-4xl md:text-5xl font-serif font-bold relative inline-block">
      {subtitle}
      {centered && <div className="mt-4 h-1 w-24 bg-white mx-auto rounded-full" />}
    </h2>
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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6">
                  <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <h3 className="text-lg font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-5 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a 
                      href="https://github.com/Wrap15" 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full bg-white text-neutral-950 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Github size={18} />
                    </a>
                  </div>
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
              <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
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
  const categories = ['Frontend', 'Backend', 'Tools', 'Soft Skills', 'Other'];
  
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Expertise" 
          subtitle="Technical & Soft Skills" 
          icon={Code2} 
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
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
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      borderColor: "rgba(16, 185, 129, 0.3)" 
                    }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: (catIndex * 0.1) + (i * 0.03) 
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium transition-colors cursor-default"
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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
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
           
          subtitle="CONTACT" 
          centered 
        />
        
        <div className="text-center mb-12">
          <p className="text-emerald-400 font-medium mb-2">Please provide your feedback</p>
          <p className="text-neutral-400 max-w-2xl mx-auto">
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
              <h3 className="text-3xl font-serif font-bold text-white mb-4">Message Sent!</h3>
              <p className="text-neutral-300 mb-8 max-w-md mx-auto">
                Thanks for reaching out, <span className="text-emerald-400 font-bold">Dhaval</span> has received your message and will get back to you within 24 hours.
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
                  className="w-full bg-transparent border border-white/20 px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all rounded-xl hover:border-white/40"
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
                  className="w-full bg-transparent border border-white/20 px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all rounded-xl hover:border-white/40"
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
                  className="w-full bg-transparent border border-white/20 px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all rounded-xl hover:border-white/40 resize-none"
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

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8 px-6 py-4 glass rounded-full border border-white/5">
            <a href="mailto:dhavalpanchal1775@gmail.com" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group">
              <Mail size={20} />
              <span className="text-sm font-medium group-hover:text-emerald-400 transition-colors">work.dhaval72@gmail.com</span>
            </a>
            <div className="flex items-center gap-6">
              <a href="https://github.com/Wrap15" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/dhaval-panchal-726a0625b/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
              <a href="https://wa.me/919875161613" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors"><MessageCircle size={24} /></a>
            </div>
          </div>
          
          <footer className="text-neutral-500 text-xs tracking-widest uppercase pb-10 font-bold">
            © {new Date().getFullYear()} Dhaval Panchal. All rights reserved.
          </footer>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: 'Fast',
      description: 'Fast load times and lag free interaction, my highest priority.',
      icon: Gauge,
    },
    {
      title: 'Responsive',
      description: 'My layouts will work on any device, big or small.',
      icon: Laptop,
    },
    {
      title: 'Intuitive',
      description: 'Strong preference for easy to use, intuitive UX/UI.',
      icon: Lightbulb,
    },
    {
      title: 'Dynamic',
      description: "Websites don't have to be static, I love making pages come to life.",
      icon: Rocket,
    },
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">My Websites are</h2>
          <div className="h-1.5 w-32 bg-white mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div 
                className="w-24 h-28 bg-emerald-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-110 transition-transform duration-300"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}
              >
                <feature.icon size={40} className="text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-[200px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
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
      <Features />
      <Projects />
      <Education />
      <Skills />
      <Contact />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[60] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
