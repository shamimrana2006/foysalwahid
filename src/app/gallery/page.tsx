import GallerySlider from "@/components/GallerySlider";

export const metadata = {
  title: "Gallery | Foysal Wahid",
  description: "Professional photo gallery showcasing corporate events, culture, and leadership insights.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-24 bg-[var(--background)]">
      <div className="container mx-auto px-6 md:px-12 text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4">
          Professional <span className="text-gradient-primary">Gallery</span>
        </h1>
        <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
          A visual journey through corporate milestones, community culture, and leadership events.
        </p>
      </div>
      
      <GallerySlider />
    </main>
  );
}
