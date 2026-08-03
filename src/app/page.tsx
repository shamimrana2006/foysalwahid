import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceEducation from "@/components/ExperienceEducation";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      <ExperienceEducation />
      <SkillsSection />
      <ContactSection />
      
      <footer className="py-8 text-center border-t border-[var(--border-color)] bg-[var(--background)]">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Foysal Wahid. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
