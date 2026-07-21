import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

export default function CTA() {
  return (
    <section className="relative py-16 bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden">
      {/* Decorative background shapes (soft gradients) */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="grad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="150" r="200" fill="url(#grad)" />
          <circle cx="600" cy="450" r="250" fill="url(#grad)" />
        </svg>
      </div>

      <motion.div
        className="relative max-w-4xl mx-auto text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Powering India's Sustainable Future
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Explore NHPC's renewable energy projects, innovation initiatives, and contributions toward clean energy.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button label="Explore Projects" url="/projects" variant="primary" className="w-full sm:w-auto" />
          <Button label="Contact Us" url="/contact" variant="secondary" className="w-full sm:w-auto" />
        </div>
      </motion.div>
    </section>
  );
}
