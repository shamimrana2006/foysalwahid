"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const experienceData = [
  {
    role: "Head of HRM",
    company: "Walton Plaza",
    period: "Current",
    description: "Leading HR strategies and people initiatives for a nationwide retail network of more than 700 showrooms. Focused on building high-performing teams and strengthening workplace culture."
  },
  {
    role: "Recruitment Manager",
    company: "Walton Group",
    period: "Previous",
    description: "Managed large-scale manpower operations and talent acquisition for the organization."
  },
  {
    role: "Deputy Head of HRM",
    company: "Walton Plaza",
    period: "Previous",
    description: "Assisted in leading HR strategies, organizational development, and employee engagement."
  },
  {
    role: "HR Business Partner",
    company: "Walton Service Management System",
    period: "Previous",
    description: "Partnered with business units to drive performance management and retail workforce transformation."
  }
];

const educationData = [
  {
    degree: "Industrial Relations and Labour Studies",
    institution: "University of Dhaka",
    period: "2019 - Present"
  },
  {
    degree: "Human Resource Management",
    institution: "Bangladesh Institute of Management",
    period: "Class of 2016"
  },
  {
    degree: "Management Studies",
    institution: "Jagannath University - জগন্নাথ বিশ্ববিদ্যালয়",
    period: "Class of 2010"
  },
  {
    degree: "Photography",
    institution: "Pathshala South Asian Media Institute",
    period: "Completed"
  },
  {
    degree: "Business Studies",
    institution: "Ghatail Cant Public School & College",
    period: "Class of 2004"
  }
];

export default function ExperienceEducation() {
  return (
    <section id="experience" className="py-24 relative bg-[var(--card-bg)] border-t border-[var(--border-color)]">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Experience Column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="p-3 bg-[var(--walton-blue)]/10 rounded-xl">
                <Briefcase className="text-[var(--walton-blue)]" size={32} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
            </motion.div>

            <div className="relative border-l border-gray-700 ml-6 space-y-12">
              {experienceData.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--walton-blue)] shadow-[0_0_10px_var(--walton-blue)]" />
                  
                  <div className="glass p-6 rounded-2xl border border-[var(--glass-border)] hover:-translate-y-1 transition-transform">
                    <span className="inline-block px-3 py-1 bg-[var(--text-primary)]/5 rounded-full text-xs font-semibold text-[var(--text-muted)] mb-4 flex items-center w-fit gap-2">
                      <Calendar size={14} />
                      {item.period}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{item.role}</h3>
                    <h4 className="text-[var(--walton-blue)] font-medium mb-4">{item.company}</h4>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="p-3 bg-[var(--walton-red)]/10 rounded-xl">
                <GraduationCap className="text-[var(--walton-red)]" size={32} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Education</h2>
            </motion.div>

            <div className="relative border-l border-gray-700 ml-6 space-y-12">
              {educationData.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--walton-red)] shadow-[0_0_10px_var(--walton-red)]" />
                  
                  <div className="glass p-6 rounded-2xl border border-[var(--glass-border)] hover:-translate-y-1 transition-transform">
                    <span className="inline-block px-3 py-1 bg-[var(--text-primary)]/5 rounded-full text-xs font-semibold text-[var(--text-muted)] mb-4 flex items-center w-fit gap-2">
                      <Calendar size={14} />
                      {item.period}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{item.degree}</h3>
                    <h4 className="text-[var(--walton-red)] font-medium">{item.institution}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
