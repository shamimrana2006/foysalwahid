"use client";

import { motion } from "framer-motion";

const skills = [
  "Strategic Human Resource Management",
  "Employee Engagement & Motivation",
  "Organizational Development (OD)",
  "HR Automation & Digital Transformation",
  "Corporate Culture Building",
  "Talent Acquisition",
  "HR Operations",
  "Business Partnering",
  "Performance Management"
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[var(--background)]">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--walton-blue)]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Top Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--walton-blue)] to-[var(--walton-red)] mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass px-6 py-4 rounded-full border border-[var(--glass-border)] shadow-lg flex items-center justify-center cursor-default"
            >
              <span className="text-[var(--text-primary)] font-medium text-sm md:text-base tracking-wide">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
