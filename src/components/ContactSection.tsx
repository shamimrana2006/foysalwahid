"use client";

import { motion } from "framer-motion";
import { Link2, Users, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative bg-[var(--card-bg)] border-t border-[var(--border-color)]">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Let's Connect</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--walton-blue)] to-[var(--walton-red)] mx-auto rounded-full mb-8" />
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            Open for collaborations, professional networking, or just a friendly chat about the future of HR.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--walton-blue)] rounded-bl-full opacity-20 group-hover:scale-110 transition-transform" />
            
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--walton-blue)]/10 flex items-center justify-center text-[var(--walton-blue)]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-[var(--text-primary)] font-medium">Location</h4>
                  <p className="text-[var(--text-muted)] text-sm">Dhaka, Bangladesh</p>
                </div>
              </div>

              <a 
                href="https://www.linkedin.com/in/foysalwahid/" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 hover:bg-white/5 p-2 -ml-2 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                  <Link2 size={24} />
                </div>
                <div>
                  <h4 className="text-[var(--text-primary)] font-medium">LinkedIn</h4>
                  <p className="text-[var(--text-muted)] text-sm">@foysalwahid</p>
                </div>
              </a>

              <a 
                href="https://www.facebook.com/profile.php?id=100000233034396" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 hover:bg-white/5 p-2 -ml-2 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2]">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="text-[var(--text-primary)] font-medium">Facebook</h4>
                  <p className="text-[var(--text-muted)] text-sm">Foysal Wahid</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl border border-[var(--glass-border)]"
          >
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[var(--text-primary)]/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--walton-blue)] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-[var(--text-primary)]/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--walton-blue)] transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-[var(--text-primary)]/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--walton-blue)] transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-[var(--walton-blue)] to-[var(--walton-red)] text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(227,24,55,0.4)] transition-shadow">
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
