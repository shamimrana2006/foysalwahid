"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { galleryCategories } from "@/data/galleryData";

export default function GallerySlider() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);

  const openSlider = (categoryIdx: number, imgIdx: number) => {
    setCurrentCategoryIndex(categoryIdx);
    setSelectedImageIndex(imgIdx);
  };

  const closeSlider = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      const category = galleryCategories[currentCategoryIndex];
      setSelectedImageIndex((prev) => (prev === 0 ? category.images.length - 1 : (prev as number) - 1));
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      const category = galleryCategories[currentCategoryIndex];
      setSelectedImageIndex((prev) => (prev === category.images.length - 1 ? 0 : (prev as number) + 1));
    }
  };

  return (
    <div className="space-y-32 pt-10 pb-20">
      {galleryCategories.map((category, cIdx) => (
        <div key={category.title} className="container mx-auto px-4 md:px-8">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-6 mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight whitespace-nowrap">
              {category.title}
            </h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-[var(--border-color)] to-transparent" />
          </motion.div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
            {category.images.map((imgName, iIdx) => {
              // Creating a dynamic editorial grid layout
              const isLarge = iIdx % 5 === 0;
              const isWide = iIdx % 5 === 3;
              
              return (
                <motion.div
                  key={imgName}
                  layoutId={`gallery-img-${cIdx}-${iIdx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (iIdx % 5) * 0.1 }}
                  onClick={() => openSlider(cIdx, iIdx)}
                  className={`relative cursor-pointer overflow-hidden rounded-2xl group ${
                    isLarge ? "col-span-2 row-span-2" : isWide ? "col-span-2 row-span-1" : "col-span-1 row-span-1"
                  } shadow-lg hover:shadow-2xl transition-shadow duration-500`}
                >
                  <Image
                    src={`/gallery/${category.folder}/${imgName}`}
                    alt={`${category.title} ${iIdx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Premium overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover content */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <Maximize2 size={24} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Premium Fullscreen Slider Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
            onClick={closeSlider}
          >
            {/* Top Toolbar */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-[102] bg-gradient-to-b from-black/80 to-transparent">
              <span className="text-white/80 font-medium tracking-widest text-sm uppercase">
                {galleryCategories[currentCategoryIndex].title} &bull; {selectedImageIndex + 1} / {galleryCategories[currentCategoryIndex].images.length}
              </span>
              <button 
                onClick={closeSlider}
                className="p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all hover:rotate-90"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={goToPrevious}
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all z-[101] backdrop-blur-md hover:scale-110"
            >
              <ChevronLeft size={32} />
            </button>

            <button 
              onClick={goToNext}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all z-[101] backdrop-blur-md hover:scale-110"
            >
              <ChevronRight size={32} />
            </button>

            {/* Main Image */}
            <motion.div
              layoutId={`gallery-img-${currentCategoryIndex}-${selectedImageIndex}`}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full h-full max-w-[90vw] max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.15 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={`/gallery/${galleryCategories[currentCategoryIndex].folder}/${galleryCategories[currentCategoryIndex].images[selectedImageIndex]}`}
                    alt="Fullscreen view"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
