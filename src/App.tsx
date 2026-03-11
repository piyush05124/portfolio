/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Terminal, 
  Database, 
  Cpu, 
  BarChart3, 
  GraduationCap, 
  Award, 
  BookOpen,
  FileText,
  ChevronRight,
  Download,
  Menu,
  X
} from "lucide-react";
import { resumeData } from "./data";
import NeuralBackground from "./components/NeuralBackground";

const Section = ({ title, children, id }: { title: string, children: React.ReactNode, id?: string }) => (
  <motion.section 
    id={id} 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="py-16 md:py-24 border-t border-white/10"
  >
    <div className="flex flex-col md:flex-row gap-8 md:gap-12">
      <div className="md:w-1/4">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-2xl md:text-3xl md:sticky md:top-24 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-6 md:mb-0"
        >
          {title}
        </motion.h2>
      </div>
      <div className="md:w-3/4">
        {children}
      </div>
    </div>
  </motion.section>
);

const SkillBadge = ({ name, delay = 0 }: { name: string, delay?: number, key?: string | number }) => (
  <motion.span 
    initial={{ opacity: 0.6, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)", borderColor: "#3b82f6", color: "#60a5fa" }}
    className="px-4 py-1.5 bg-slate-800/15 border border-white/10 rounded-full text-xs font-mono text-gray-300 transition-all cursor-default shadow-sm backdrop-blur-sm"
  >
    {name}
  </motion.span>
);

const SkillCard = ({ title, skills, icon: Icon, className = "" }: { title: string, skills: string[], icon: any, className?: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`p-6 glass-card group ${className}`}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
        <Icon size={20} />
      </div>
      <h4 className="text-sm font-mono uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">{title}</h4>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((s, i) => <SkillBadge key={s} name={s} delay={i * 0.05} />)}
    </div>
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = ['experience', 'skills', 'projects', 'research', 'education'];

  return (
    <div className="min-h-screen selection:bg-blue-500/30">
      <NeuralBackground />
      <div className="fixed inset-0 grid-pattern pointer-events-none" />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[70] origin-left shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono font-bold tracking-tighter text-lg text-blue-400"
          >
            Piyush Keshari
          </motion.span>
          
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest opacity-60">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                className="hover:opacity-60 hover:text-blue-400 transition-all"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden sm:flex gap-4">
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href={resumeData.contact.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 hover:text-blue-400 transition-colors"
              >
                <Github size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href={resumeData.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 hover:text-blue-400 transition-colors"
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              href={resumeData.contact.resume}
              className="hidden xs:flex px-4 md:px-5 py-2 glass-card text-[10px] md:text-xs font-mono uppercase tracking-widest text-blue-400 border-blue-500/30 items-center gap-2 hover:border-blue-400 transition-all"
            >
              <Download size={14} /> <span className="hidden sm:inline">Download CV</span><span className="sm:hidden">CV</span>
            </motion.a>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {navItems.map((item) => (
                  <a 
                    key={item} 
                    href={`#${item}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-mono uppercase tracking-[0.2em] text-gray-400 hover:text-blue-400 transition-all"
                  >
                    {item}
                  </a>
                ))}
                <div className="h-px w-full bg-white/5 my-2" />
                <div className="flex gap-6">
                  <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                    <Github size={24} />
                  </a>
                  <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                    <Linkedin size={24} />
                  </a>
                  <a href={`mailto:${resumeData.contact.email}`} className="text-gray-400 hover:text-blue-400">
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 relative z-10">
        {/* Hero Section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-40"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-[0.3em] mb-6"
              >
                Available for opportunities
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 20 }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-4 leading-[0.85] text-white"
              >
                {resumeData.name.split(' ')[0]}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  {resumeData.name.split(' ')[1]}
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl sm:text-2xl md:text-4xl font-serif italic text-gray-400 max-w-2xl mt-8"
              >
                {resumeData.title}
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm font-mono text-gray-500"
            >
              <a href={`mailto:${resumeData.contact.email}`} className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-slate-800/15 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <Mail size={14} />
                </div>
                {resumeData.contact.email}
              </a>
              <a href={`tel:${resumeData.contact.phone}`} className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-slate-800/15 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <Phone size={14} />
                </div>
                {resumeData.contact.phone}
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="mt-16 md:mt-24 p-6 md:p-12 glass-card"
          >
            <p className="text-lg md:text-2xl leading-relaxed text-gray-300 font-light">
              {resumeData.summary}
            </p>
          </motion.div>
        </motion.header>

        {/* Experience */}
        <Section title="Experience" id="experience">
          <div className="space-y-20">
            {resumeData.experience.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-12 border-l border-white/10 group"
              >
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] group-hover:scale-150 transition-transform" />
                <div className="flex flex-col md:flex-row justify-between mb-6 md:mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400 group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-500">{exp.role}</h3>
                    <p className="text-lg md:text-xl text-blue-400/80 font-medium mt-1">{exp.company}</p>
                  </div>
                  <div className="text-[10px] md:text-xs font-mono text-gray-300 bg-slate-800/15 border border-white/10 px-4 py-1.5 rounded-full h-fit uppercase tracking-widest w-fit">
                    {exp.period}
                  </div>
                </div>
                <ul className="space-y-4 md:space-y-5">
                  {exp.description.map((item, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      className="flex gap-4 md:gap-5 text-gray-400 leading-relaxed text-base md:text-lg"
                    >
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500/30 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Skills - Redesigned Bento Layout */}
        <Section title="Technical Stack" id="skills">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkillCard 
              title="Programming" 
              skills={resumeData.skills.programming} 
              icon={Terminal}
              className="md:col-span-2"
            />
            <SkillCard 
              title="Analytics" 
              skills={resumeData.skills.analytics} 
              icon={BarChart3}
            />
            <SkillCard 
              title="AI / ML Tools" 
              skills={resumeData.skills.aiml} 
              icon={Cpu}
              className="md:col-span-1"
            />
            <SkillCard 
              title="MLOps & Deployment" 
              skills={resumeData.skills.mlops} 
              icon={Terminal}
              className="md:col-span-2"
            />
            <SkillCard 
              title="Cloud & Database" 
              skills={resumeData.skills.cloud} 
              icon={Database}
              className="md:col-span-3"
            />
          </div>
        </Section>

        {/* Projects */}
        <Section title="Key Projects" id="projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resumeData.projects.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-10 glass-card group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-20 transition-opacity">
                  <Terminal size={120} />
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-inner">
                  <Terminal size={24} className="md:w-7 md:h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400 group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-500">{project.title}</h3>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                  {project.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-xs font-mono text-blue-400/50 group-hover:text-blue-400 transition-colors">
                  <span>0{idx + 1}</span>
                  <div className="h-px w-8 bg-blue-400/20" />
                  <span>PROJECT_DETAILS</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Research */}
        <Section title="Research" id="research">
          <div className="space-y-6">
            {resumeData.research.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="data-row py-8 flex flex-col md:flex-row justify-between gap-8 group"
              >
                <div className="flex gap-8">
                  <div className="mt-1 p-4 bg-slate-800/15 rounded-2xl group-hover:bg-blue-500/20 transition-all">
                    {item.type === 'Patent' ? <FileText size={24} className="text-blue-400" /> : <BookOpen size={24} className="text-gray-500 group-hover:text-blue-400" />}
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400 group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-500">{item.title}</p>
                    <p className="text-[10px] md:text-xs font-mono text-gray-300 uppercase tracking-widest mt-3 flex flex-wrap items-center gap-3">
                      <span className="px-2 py-0.5 bg-slate-800/15 rounded text-blue-400/70 border border-white/10">{item.type}</span>
                      {item.publisher && <span className="opacity-50">// {item.publisher}</span>}
                      {item.status && <span className="text-blue-400 font-bold">// {item.status}</span>}
                    </p>
                  </div>
                </div>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href={resumeData.contact.scholar} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 shrink-0 h-fit bg-slate-800/15 px-4 md:px-6 py-2 md:py-3 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all text-sm md:text-base"
                >
                  View Paper <ExternalLink size={14} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section title="Education" id="education">
          <div className="space-y-16">
            {resumeData.education.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400 group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-500">{edu.degree}</h3>
                  <span className="text-[10px] md:text-xs font-mono text-gray-300 bg-slate-800/15 border border-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest w-fit">
                    {edu.stats.split('|')[1]?.trim() || edu.stats}
                  </span>
                </div>
                <p className="text-lg md:text-xl text-blue-400/80 font-medium mb-6">{edu.institution}</p>
                <div className="p-6 md:p-8 glass-card border-dashed">
                  <p className="text-sm md:text-gray-400 leading-relaxed">
                    <span className="font-mono uppercase text-[10px] tracking-[0.3em] block mb-4 text-blue-400/50">Core Coursework</span>
                    {edu.coursework}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section title="Certifications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeData.certifications.map((cert, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-5 p-6 glass-card group"
              >
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Award size={24} />
                </div>
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{cert}</span>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="mt-60 pt-32 border-t border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] -z-10" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif italic text-4xl sm:text-6xl md:text-8xl mb-12 md:text-white"
          >
            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">intelligent.</span>
          </motion.p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16 md:mb-24">
            {[
              { icon: Mail, href: `mailto:${resumeData.contact.email}` },
              { icon: Linkedin, href: resumeData.contact.linkedin },
              { icon: Github, href: resumeData.contact.github }
            ].map((item, i) => (
              <motion.a 
                key={i}
                whileHover={{ y: -10, scale: 1.1 }}
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-6 md:p-8 glass-card hover:border-blue-500/50 transition-all text-gray-400 hover:text-blue-400 shadow-2xl"
              >
                <item.icon size={24} className="md:w-8 md:h-8" />
              </motion.a>
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 pb-12">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.5em]">
              © {new Date().getFullYear()} {resumeData.name} // SYSTEM_VERSION_2.0
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
