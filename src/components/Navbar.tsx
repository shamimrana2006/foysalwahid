"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-[var(--text-primary)] tracking-tighter">
            FOYSAL<span className="text-[var(--walton-red)]">.</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {[
            { label: "About", href: "/#about" },
            { label: "Experience", href: "/#experience" },
            { label: "Skills", href: "/#skills" },
            { label: "Gallery", href: "/gallery" },
            { label: "Contact", href: "/#contact" }
          ].map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm font-medium uppercase tracking-wider"
            >
              {item.label}
            </Link>
          ))}
          
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-[var(--text-primary)]/10 text-[var(--text-primary)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-[var(--text-primary)]/10 text-[var(--text-primary)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[var(--text-primary)] focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[var(--glass-border)] overflow-hidden"
          >
            <div className="flex flex-col py-6 px-8 space-y-6">
              {[
                { label: "About", href: "/#about" },
                { label: "Experience", href: "/#experience" },
                { label: "Skills", href: "/#skills" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/#contact" }
              ].map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[var(--text-primary)] font-bold text-xl tracking-wide hover:text-[var(--walton-blue)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
