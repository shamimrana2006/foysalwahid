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

import { useState } from "react";
import Image from "next/image";
import MagneticLogo from "./MagneticLogo";

export default function ExperienceEducation() {
  const [activeStation, setActiveStation] = useState(0);

  return (
    <section id="experience" className="py-24 relative bg-[var(--background)]">
      {/* Background ambient glows constrained to absolute inset to avoid overflow-hidden on the sticky parent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-96 h-96 bg-[var(--walton-blue)]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-[var(--walton-red)]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Unified Main Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[var(--walton-blue)] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            My Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6">
            Experience <span className="text-[var(--walton-red)] font-light">&</span> Education
          </h2>
        </motion.div>

        {/* --- EXPERIENCE TIMELINE --- */}
        <div className="relative max-w-5xl mx-auto mb-32 pt-16">
            
          {/* The Center Line */}
          <div className="absolute left-[25px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--walton-blue)] via-[var(--walton-red)] to-transparent -translate-x-1/2" />

          {/* Timeline Items */}
          {experienceData.map((item, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === experienceData.length - 1;
            const isActive = activeStation === index;

            return (
              <motion.div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-center w-full ${isLast ? '' : 'mb-24'} ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                onViewportEnter={() => setActiveStation(index)}
                viewport={{ margin: "-30% 0px -30% 0px", amount: "some" }}
              >
                
                {/* Timeline Dot OR Magnetic Logo (Station Snapping) */}
                <div className="absolute left-[25px] md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  {isActive ? (
                    <MagneticLogo layoutId="walton-logo" />
                  ) : (
                    <motion.div 
                      layoutId={`dot-${index}`}
                      className="w-5 h-5 rounded-full bg-[var(--background)] border-4 border-[var(--walton-red)] shadow-[0_0_15px_rgba(227,24,55,0.6)]" 
                    />
                  )}
                </div>

                {/* Card */}
                <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className={`glass p-8 rounded-3xl border transition-all duration-500 group relative overflow-hidden ${
                      isActive 
                        ? 'border-[var(--walton-blue)] shadow-[0_20px_50px_-10px_rgba(0,85,165,0.4)] scale-[1.02]' 
                        : 'border-[var(--glass-border)] hover:border-[var(--walton-blue)]/50 hover:shadow-[0_20px_40px_-10px_rgba(0,85,165,0.2)]'
                    }`}
                  >
                    {/* Hover Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-[var(--walton-blue)]/5 to-[var(--walton-red)]/5 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    
                    <span className={`inline-block px-4 py-1.5 bg-[var(--text-primary)]/5 rounded-full text-xs font-bold tracking-wider text-[var(--walton-blue)] mb-5 flex items-center w-fit gap-2 relative z-10 ${isEven ? 'md:ml-auto' : ''}`}>
                      <Calendar size={14} />
                      {item.period}
                    </span>
                    
                    <h4 className={`text-2xl font-black mb-2 transition-colors relative z-10 ${isActive ? 'text-[var(--walton-blue)]' : 'text-[var(--text-primary)] group-hover:text-[var(--walton-blue)]'}`}>
                      {item.role}
                    </h4>
                    
                    <h5 className="text-[var(--walton-red)] font-bold mb-5 text-lg relative z-10">
                      {item.company}
                    </h5>
                    
                    <p className="text-[var(--text-muted)] leading-relaxed relative z-10">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- EDUCATION BENTO GRID --- */}
        <div className="max-w-6xl mx-auto pt-16 border-t border-[var(--border-color)]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 justify-center mb-16"
          >
            <GraduationCap className="text-[var(--text-muted)]" size={36} />
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Academic Background
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass p-8 rounded-3xl border border-[var(--glass-border)] hover:-translate-y-2 transition-all duration-300 hover:border-[var(--text-muted)]/30 hover:shadow-xl group relative overflow-hidden ${
                  index === 0 ? 'lg:col-span-2 bg-[var(--text-primary)]/5' : ''
                }`}
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap size={48} />
                </div>
                
                <span className="inline-block px-3 py-1 bg-[var(--text-primary)]/10 rounded-full text-xs font-bold text-[var(--text-muted)] mb-6 flex items-center w-fit gap-2 relative z-10">
                  <Calendar size={14} />
                  {item.period}
                </span>
                
                <h4 className={`font-bold text-[var(--text-primary)] mb-3 relative z-10 ${index === 0 ? 'text-3xl' : 'text-xl'}`}>
                  {item.degree}
                </h4>
                
                <h5 className="text-[var(--text-muted)] font-medium leading-relaxed relative z-10">
                  {item.institution}
                </h5>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
