"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Phone, Mail, Send, MessageSquare, Bell, Users, Link2, Globe } from "lucide-react";

const FloatingCircle = ({ 
  className, 
  colorClass,
  size, 
  delay,
  style
}: { 
  className: string, 
  colorClass: string,
  size: number, 
  delay: number,
  style?: any
}) => {
  return (
    <motion.div style={style} className={`absolute z-0 ${className}`}>
      <motion.div
        className={`rounded-full ${colorClass}`}
        style={{ width: size, height: size }}
        animate={{ 
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{ 
          duration: 3 + (delay % 2), 
          repeat: Infinity,
          ease: "easeInOut",
          delay
        }}
      />
    </motion.div>
  );
};

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GmailIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 25 });

  const layer1X = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const layer1Y = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);

  const layer2X = useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]);
  const layer2Y = useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]);

  const layer3X = useTransform(mouseXSpring, [-0.5, 0.5], [-45, 45]);
  const layer3Y = useTransform(mouseYSpring, [-0.5, 0.5], [-45, 45]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[var(--background)] transition-colors duration-300">
      
      {/* Decorative blobs for the background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[50%] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[50%] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        <div 
          className="bg-[var(--card-bg)] rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-6xl mx-auto border border-[var(--border-color)] relative overflow-hidden transition-colors duration-300"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          
          {/* LEFT SIDE - Form */}
          <div className="flex-1 w-full z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400 tracking-tight">Let's talk</h2>
              <p className="text-[var(--text-muted)] mb-10 text-sm md:text-base leading-relaxed">
                To request a quote or want to meet up for coffee, contact me directly or fill out the form and I will get back to you promptly.
              </p>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6" 
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-muted)] ml-2">Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-full px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-[var(--text-muted)]/50"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-muted)] ml-2">Your Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-full px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-[var(--text-muted)]/50"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-muted)] ml-2">Your Message</label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-3xl px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none placeholder:text-[var(--text-muted)]/50"
                  placeholder="Type something if you want..."
                />
              </div>
              <button className="py-4 px-10 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1">
                Send Message
              </button>
            </motion.form>
          </div>

          {/* RIGHT SIDE - Illustration and Info */}
          <div className="flex-1 flex flex-col justify-between items-center relative w-full z-10">
            
            {/* Animated Illustration */}
            <div className="relative w-full h-[320px] flex items-center justify-center mt-8 lg:mt-0">
              
              {/* Central Envelope Layer */}
              <motion.div style={{ x: layer1X, y: layer1Y }} className="absolute z-10">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex items-center justify-center"
                >
                  <div className="w-48 h-32 relative flex justify-center items-end">
                    {/* Back of envelope */}
                    <div className="absolute inset-0 bg-indigo-600 rounded-lg shadow-lg" />
                    
                    {/* Paper sticking out */}
                    <div className="absolute bottom-6 w-40 h-40 bg-white dark:bg-gray-100 rounded-t-md shadow-inner flex flex-col pt-6 px-6 gap-3 z-10">
                      <div className="w-full h-2 bg-indigo-100 rounded-full" />
                      <div className="w-3/4 h-2 bg-indigo-100 rounded-full" />
                      <div className="w-5/6 h-2 bg-indigo-100 rounded-full" />
                      <div className="w-1/2 h-2 bg-indigo-100 rounded-full" />
                    </div>
                    
                    {/* Front of envelope (Triangle flap) */}
                    <div className="absolute bottom-0 w-0 h-0 border-l-[96px] border-r-[96px] border-b-[85px] border-l-indigo-500/90 border-r-indigo-500/90 border-b-indigo-500 z-20 rounded-b-lg drop-shadow-md" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div style={{ x: layer2X, y: layer2Y }} className="absolute top-0 left-12 z-30">
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-sky-400 p-3 rounded-full text-white shadow-lg shadow-sky-400/40"
                >
                  <Bell size={24} fill="currentColor" />
                </motion.div>
              </motion.div>

              <motion.div style={{ x: layer3X, y: layer3Y }} className="absolute top-20 -left-4 z-30">
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="bg-purple-500 p-3 rounded-2xl rounded-bl-sm text-white shadow-lg shadow-purple-500/40"
                >
                  <MessageSquare size={24} fill="currentColor" />
                </motion.div>
              </motion.div>

              <motion.div style={{ x: layer2X, y: layer2Y }} className="absolute -top-4 right-10 z-30">
                <motion.div
                  animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="text-indigo-500 dark:text-indigo-400"
                >
                  <Send size={44} className="transform -rotate-12" fill="currentColor" />
                </motion.div>
              </motion.div>

              {/* Infinite circles */}
              <FloatingCircle style={{ x: layer3X, y: layer3Y }} colorClass="bg-pink-400" className="top-4 left-1/3" size={14} delay={0} />
              <FloatingCircle style={{ x: layer2X, y: layer2Y }} colorClass="bg-sky-400" className="top-1/3 -left-2" size={18} delay={1} />
              <FloatingCircle style={{ x: layer1X, y: layer1Y }} colorClass="bg-yellow-400" className="-bottom-2 left-1/4" size={24} delay={2} />
              <FloatingCircle style={{ x: layer3X, y: layer3Y }} colorClass="border-4 border-indigo-400" className="bottom-1/4 right-4" size={28} delay={0.5} />
              <FloatingCircle style={{ x: layer2X, y: layer2Y }} colorClass="bg-purple-400" className="top-1/4 -right-6" size={16} delay={1.5} />
              <FloatingCircle style={{ x: layer1X, y: layer1Y }} colorClass="bg-emerald-400" className="bottom-10 -right-2" size={12} delay={2.5} />
            </div>

            {/* Contact Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full mt-12 space-y-6 lg:pl-10"
            >
              <div className="flex items-start gap-4">
                <MapPin className="text-indigo-500 dark:text-indigo-400 mt-1" size={20} />
                <div>
                  <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-indigo-500 dark:text-indigo-400" size={20} />
                <p className="text-[var(--text-muted)] text-sm md:text-base">Open to Connect</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-indigo-500 dark:text-indigo-400" size={20} />
                <p className="text-[var(--text-muted)] text-sm md:text-base">foysalwahid@example.com</p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=100000233034396" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <FacebookIcon size={18} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/foysalwahid/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0077b5]/10 hover:bg-[#0077b5] text-[#0077b5] hover:text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <LinkedinIcon size={18} />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[var(--text-primary)]/10 hover:bg-[var(--text-primary)] text-[var(--text-primary)] hover:text-[var(--card-bg)] flex items-center justify-center transition-all hover:scale-110"
                >
                  <GmailIcon size={18} />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
