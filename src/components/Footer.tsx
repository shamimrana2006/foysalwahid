import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--card-bg)] border-t border-[var(--border-color)] overflow-hidden text-center">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      <div className="container mx-auto px-6 md:px-12 py-16 flex flex-col items-center justify-center relative z-10">

        {/* Brand & Intro */}
        <Link href="/" className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-4 inline-block">
          Foysal<span className="text-indigo-500">Wahid</span>.
        </Link>

        <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
          Experienced HR Professional and Head of HRM dedicated to fostering talent, driving organizational growth, and shaping the future of work. Always open to discussing new opportunities and collaborations.
        </p>

        {/* Contact Badges (Makes it look busy & detailed) */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border-color)] px-5 py-2.5 rounded-full text-sm text-[var(--text-muted)] hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-colors cursor-default">
            <Mail size={16} className="text-indigo-500" />
            <span>foysalwahid@example.com</span>
          </div>
          <div className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border-color)] px-5 py-2.5 rounded-full text-sm text-[var(--text-muted)] hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-colors cursor-default">
            <Phone size={16} className="text-indigo-500" />
            <span>Open to Connect</span>
          </div>
          <div className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border-color)] px-5 py-2.5 rounded-full text-sm text-[var(--text-muted)] hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-colors cursor-default">
            <MapPin size={16} className="text-indigo-500" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>

        {/* Horizontal Quick Links */}
        {/* <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
          {['Home', 'About', 'Experience', 'Education', 'Skills', 'Gallery', 'Contact'].map((item) => (
            <Link 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-[var(--text-primary)] hover:text-indigo-500 text-sm font-medium transition-colors uppercase tracking-wider"
            >
              {item}
            </Link>
          ))}
        </div> */}

        {/* Social Links */}
        <div className="flex gap-4 mb-12">
          <a href="https://www.facebook.com/profile.php?id=100000233034396" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[var(--background)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all hover:scale-110 shadow-sm">
            <FacebookIcon size={20} />
          </a>
          <a href="https://www.linkedin.com/in/foysalwahid/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[var(--background)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all hover:scale-110 shadow-sm">
            <LinkedinIcon size={20} />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[var(--background)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--card-bg)] hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all hover:scale-110 shadow-sm">
            <GithubIcon size={20} />
          </a>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="w-full pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-muted)] text-sm">
            © {currentYear} Foysal Wahid. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
