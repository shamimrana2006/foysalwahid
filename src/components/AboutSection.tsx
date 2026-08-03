"use client";

import { motion } from "framer-motion";
import { User, Target, Award } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[var(--background)]">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--walton-blue)] to-transparent opacity-30" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-[var(--walton-blue)] rounded-full mix-blend-screen filter blur-[128px] opacity-20" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--walton-blue)] to-[var(--walton-red)] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden glass p-8 border border-[var(--glass-border)] shadow-2xl">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[var(--walton-red)] rounded-full mix-blend-screen filter blur-[64px] opacity-30" />
              
              <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-3">
                <User className="text-[var(--walton-blue)]" size={28} />
                Professional Summary
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                HR leader with more than 15 years of experience in strategic HR management, talent acquisition, HR operations, and business partnering across manufacturing, service management, and retail chainshop industries.
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Currently serving as <strong className="text-[var(--text-primary)]">Head of HRM at Walton Plaza</strong>, leading HR strategies and people initiatives for a nationwide retail network of more than 700 showrooms. Focused on building high-performing teams, strengthening workplace culture, and driving business growth through practical and people-centric HR solutions.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-7 space-y-6"
          >
            <div className="glass p-8 rounded-2xl border border-[var(--glass-border)] hover:border-[var(--walton-blue)]/50 transition-colors group">
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-3">
                <Target className="text-[var(--walton-red)] group-hover:scale-110 transition-transform" />
                Strategic Impact
              </h4>
              <p className="text-[var(--text-muted)]">
                Throughout my career, I have worked in key leadership roles including Recruitment Manager at Walton Group, Deputy Head of HRM at Walton Plaza, and HR Business Partner at Walton Service Management System. Experienced in managing large-scale manpower operations, organizational development, employee engagement, performance management, and retail workforce transformation.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl border border-[var(--glass-border)] hover:border-[var(--walton-red)]/50 transition-colors group">
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-3">
                <Award className="text-[var(--walton-blue)] group-hover:scale-110 transition-transform" />
                Leadership Philosophy
              </h4>
              <p className="text-[var(--text-muted)]">
                Known for innovative thinking, strong execution capability, and developing scalable HR practices that support operational excellence and long-term business success. Passionate about developing future leaders, improving employee experience, and creating impactful HR strategies aligned with business goals.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
