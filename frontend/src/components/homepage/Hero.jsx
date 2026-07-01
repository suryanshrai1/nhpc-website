import { useState } from "react";
import { motion } from "framer-motion";
import { getMediaUrl } from "../../utils/media";
import Button from "../ui/Button";

export default function Hero({ homepage }) {
    if (!homepage) return null;

    const { heroTitle, heroSubtitle, heroImage, heroVideo, heroButtons } = homepage;
    const [videoError, setVideoError] = useState(false);

    const videoUrl = getMediaUrl(heroVideo);
    const imageUrl = getMediaUrl(heroImage);

    // Stagger animation container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    // Fade up animation item
    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 18,
            },
        },
    };

    // Helper to determine link component
    const renderButton = (button) => {
        if (!button || !button.label) return null;
        return (
            <Button
                key={button.id}
                label={button.label}
                url={button.url}
                variant={button.variant}
            />
        );
    };

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-950 select-none">
            {/* Background Media */}
            <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
                {videoUrl && !videoError ? (
                    <video
                        src={videoUrl}
                        poster={imageUrl || undefined}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onError={() => setVideoError(true)}
                        className="w-full h-full object-cover scale-105"
                    />
                ) : imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Hero Background"
                        className="w-full h-full object-cover scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-900" />
                )}
            </div>


            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/80 z-10 pointer-events-none" />

            {/* Hero Content Container */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center flex flex-col items-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center max-w-4xl"
                >
                    {/* Hero Title */}
                    {heroTitle && (
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6"
                        >
                            {heroTitle}
                        </motion.h1>
                    )}

                    {/* Hero Subtitle */}
                    {heroSubtitle && (
                        <motion.p
                            variants={itemVariants}
                            className="text-lg sm:text-xl md:text-2xl text-slate-200/90 font-light leading-relaxed max-w-2xl mb-10"
                        >
                            {heroSubtitle}
                        </motion.p>
                    )}

                    {/* Action Buttons */}
                    {heroButtons && heroButtons.length > 0 && (
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
                        >
                            {heroButtons.map((button) => renderButton(button))}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Bottom Accent Decorator */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent z-15 pointer-events-none" />
        </section>
    );
}
