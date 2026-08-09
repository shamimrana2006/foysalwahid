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
import ExperienceCard from "./ExperienceCard";
import EducationCard from "./EducationCard";

export default function ExperienceEducation() {
  const [activeStation, setActiveStation] = useState(0);

  return (
    <section id="experience" className="py-24 relative bg-[var(--background)] overflow-hidden">
      {/* Background ambient glows constrained to absolute inset */}
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

                {/* Card Container */}
                <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} relative`}>
                  
                  {/* Premium Glowing Bubbles behind the Active Card */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-card-aura"
                      className="absolute inset-0 z-0 pointer-events-none overflow-visible"
                    >
                      {/* Big ambient spheres (Slower glowing) */}
                      <motion.div 
                        animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className={`absolute -top-10 w-40 h-40 rounded-full blur-[50px] ${isEven ? '-left-10 bg-[var(--walton-blue)]/30' : '-right-10 bg-[var(--walton-blue)]/30'}`}
                      />
                      <motion.div 
                        animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.3, 1] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className={`absolute -bottom-10 w-40 h-40 rounded-full blur-[50px] ${isEven ? '-right-10 bg-[var(--walton-red)]/20' : '-left-10 bg-[var(--walton-red)]/20'}`}
                      />

                      {/* Continuous small particle bubbles emanating from center */}
                      {Array.from({ length: 50 }).map((_, i) => {
                        // We use pseudo-randomness based on index so it's stable per render, avoiding hydration mismatch if this were SSR
                        const size = (i % 5) * 2 + 3;
                        const angle = i * 7.2; // 360 / 50
                        const distance = (i % 4) * 80 + 100;
                        const delay = (i % 10) * 0.05; // Much faster start time (0s to 0.45s max delay)
                        const duration = (i % 3) * 0.8 + 1.2; 

                        const rad = (angle * Math.PI) / 180;
                        const targetX = Math.cos(rad) * distance;
                        const targetY = Math.sin(rad) * distance;

                        return (
                          <motion.div
                            key={`card-bubble-${i}`}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                            animate={{
                              x: targetX,
                              y: targetY,
                              scale: 1,
                              opacity: [0, 0.8, 0],
                            }}
                            transition={{
                              duration: duration,
                              repeat: Infinity,
                              delay: delay,
                              ease: "easeOut",
                            }}
                            className="absolute top-1/2 left-1/2 -mt-1 -ml-1 rounded-full bg-gradient-to-br from-[var(--walton-blue)] to-[var(--walton-red)] shadow-[0_0_8px_rgba(227,24,55,0.6)]"
                            style={{
                              width: size,
                              height: size,
                            }}
                          />
                        );
                      })}
                    </motion.div>
                  )}

                  <div className="z-10 relative">
                    <ExperienceCard item={item} isActive={isActive} isEven={isEven} />
                  </div>
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
              <EducationCard key={`edu-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
