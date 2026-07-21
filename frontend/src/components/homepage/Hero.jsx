import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Container from "../ui/Container";
import { getMediaPublicUrl } from "../../utils/fileHelpers";

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }
};

export default function Hero({ hero }) {
  if (!hero) return null;

  // Adapt single hero data into slides structure
  const slides = hero.slides || [
    {
      id: 1,
      title: hero.title,
      subtitle: hero.subtitle,
      description: hero.description,
      badge: hero.badge,
      heroImage: hero.heroImage,
      heroVideo: hero.heroVideo,
      buttons: hero.buttons || []
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setVideoLoaded(false);
    setVideoError(false);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    setVideoLoaded(false);
    setVideoError(false);
  }, [slides.length]);

  // Autoplay Effect
  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;
    const interval = setInterval(nextSlide, 7000); // 7s autoplay
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide, slides.length]);

  const currentSlide = slides[currentIndex];
  const imageUrl = getMediaPublicUrl(currentSlide.heroImage);
  const videoUrl = getMediaPublicUrl(currentSlide.heroVideo);

  return (
    <section 
      className="relative isolate min-h-screen overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 h-full w-full"
        >
          {/* Visual Background */}
          <div className="absolute inset-0 z-0">
            {currentSlide.heroVideo && !videoError ? (
              <video
                aria-hidden="true"
                autoPlay
                muted
                loop
                playsInline
                poster={imageUrl || undefined}
                onLoadedData={() => setVideoLoaded(true)}
                onError={() => setVideoError(true)}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  videoLoaded ? "opacity-100" : "opacity-0"
                }`}
              >
                <source src={videoUrl} />
              </video>
            ) : currentSlide.heroImage ? (
              <img
                src={imageUrl}
                alt={currentSlide.title || "Background hero image"}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-900" />
            )}

            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-transparent to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.2),transparent_60%)]" />
          </div>

          {/* Slide Text Content */}
          <div className="relative z-10 flex min-h-screen items-center">
            <Container>
              <div className="max-w-3xl">
                {currentSlide.badge && (
                  <div>
                    <Badge className="border-blue-400/30 bg-blue-500/15 text-blue-100 backdrop-blur-md">
                      {currentSlide.badge}
                    </Badge>
                  </div>
                )}

                {currentSlide.title && (
                  <h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
                    {currentSlide.title}
                  </h1>
                )}

                {currentSlide.subtitle && (
                  <h2 className="mt-6 text-lg font-medium text-blue-100 md:text-xl">
                    {currentSlide.subtitle}
                  </h2>
                )}

                {currentSlide.description && (
                  <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300">
                    {currentSlide.description}
                  </p>
                )}

                {currentSlide.buttons && currentSlide.buttons.length > 0 && (
                  <div className="mt-10 flex flex-wrap gap-4">
                    {currentSlide.buttons.map((btn) => (
                      <Button
                        key={btn.id}
                        label={btn.label}
                        url={btn.url}
                        variant={btn.variant || btn.buttonStyle?.toLowerCase() || "primary"}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Container>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full border border-white/20 bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full border border-white/20 bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicators Bar */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all focus:outline-none ${
                  idx === currentIndex ? "w-8 bg-blue-600" : "w-2.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Scroll Down Hint */}
      <div aria-hidden="true" className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center text-white/50">
          <ChevronDown size={20} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}