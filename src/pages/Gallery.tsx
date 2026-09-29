import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { galleryImages, galleryCategories, type GalleryImage } from '../data/gallery';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter(img => img.category === activeCategory);

  // Keyboard navigation for Lightbox
  const handleNext = useCallback(() => {
    if (!activeImage) return;
    const currentIndex = filteredImages.findIndex(i => i.id === activeImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setActiveImage(filteredImages[nextIndex]);
  }, [activeImage, filteredImages]);

  const handlePrev = useCallback(() => {
    if (!activeImage) return;
    const currentIndex = filteredImages.findIndex(i => i.id === activeImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setActiveImage(filteredImages[prevIndex]);
  }, [activeImage, filteredImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeImage) return;
      if (e.key === 'Escape') setActiveImage(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage, handleNext, handlePrev]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#C76B3C] font-semibold text-xs uppercase tracking-widest block mb-2">
            Visual Journey
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D211E]">
            Gallery
          </h1>
          <p className="text-[#77766F] text-sm sm:text-base mt-3">
            A glimpse into our food, ambience, and memorable moments.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide">
          {galleryCategories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#C76B3C] text-white shadow-md'
                    : 'bg-white text-[#252823] hover:bg-[#ECE6DE] border border-[#D6CCC2]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {filteredImages.map((image) => {
            const isTall = image.span === 'tall';
            const isWide = image.span === 'wide';

            return (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(29,33,30,0.08)] hover:shadow-2xl transition-all duration-300 bg-[#1D211E] border border-[#D6CCC2] ${
                  isTall ? 'sm:row-span-2' : ''
                } ${isWide ? 'sm:col-span-2' : ''}`}
                onClick={() => setActiveImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  onError={(e) => {
                    // Fallback to verified image if network glitch
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#C76B3C] font-semibold block mb-1">
                        {image.category}
                      </span>
                      <p className="text-sm font-medium leading-snug line-clamp-2">
                        {image.alt}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 ml-3">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── LIGHTBOX MODAL ───────────────────────────── */}
      <AnimatePresence>
        {activeImage && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox Preview"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Lightbox (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous image (Left arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next image (Right arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Preview Container */}
            <motion.div
              key={activeImage.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 max-w-5xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <div className="mt-4 text-center text-white">
                <span className="text-xs uppercase tracking-widest text-[#C76B3C] font-semibold">
                  {activeImage.category}
                </span>
                <p className="text-sm font-medium mt-1 text-white/90">
                  {activeImage.alt}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
