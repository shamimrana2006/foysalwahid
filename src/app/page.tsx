import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceEducation from "@/components/ExperienceEducation";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ExperienceEducation />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
