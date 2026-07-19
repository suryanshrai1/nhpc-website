import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Container from "../ui/Container";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function Hero({ hero }) {
    if (!hero) return null;

    const {
        title,
        subtitle,
        description,
        badge,
        heroImage,
        heroVideo,
        buttons = [],
    } = hero;

    const [videoError, setVideoError] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-slate-950">
            {/* Background */}
            <div className="absolute inset-0">
                {heroVideo && !videoError ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={heroImage || undefined}
                        onLoadedData={() => setVideoLoaded(true)}
                        onError={() => setVideoError(true)}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                            videoLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <source src={heroVideo} />
                    </video>
                ) : heroImage ? (
                    <img
                        src={heroImage}
                        alt={title || "NHPC Hero"}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-slate-900" />
                )}

                <div className="absolute inset-0 bg-black/45" />

                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.22),transparent_60%)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex min-h-screen items-center">
                <Container>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl"
                    >
                        {badge && (
                            <motion.div variants={itemVariants}>
                                <Badge className="border-blue-400/30 bg-blue-500/15 text-blue-100 backdrop-blur-md">
                                    {badge}
                                </Badge>
                            </motion.div>
                        )}

                        {title && (
                            <motion.h1
                                variants={itemVariants}
                                className="mt-8 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl xl:text-7xl"
                            >
                                {title}
                            </motion.h1>
                        )}

                        {subtitle && (
                            <motion.h2
                                variants={itemVariants}
                                className="mt-6 text-xl font-medium text-blue-100 md:text-2xl"
                            >
                                {subtitle}
                            </motion.h2>
                        )}

                        {description && (
                            <motion.p
                                variants={itemVariants}
                                className="mt-8 max-w-2xl text-lg leading-8 text-slate-300"
                            >
                                {description}
                            </motion.p>
                        )}

                        {buttons.length > 0 && (
                            <motion.div
                                variants={itemVariants}
                                className="mt-10 flex flex-wrap gap-4"
                            >
                                {buttons.map((button) => (
                                    <motion.div
                                        key={button.id}
                                        variants={itemVariants}
                                    >
                                        <Button
                                            label={button.label}
                                            url={button.url}
                                            variant={button.variant}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                </Container>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
                <div className="flex flex-col items-center text-white/80">
                    <span className="mb-2 text-xs uppercase tracking-[0.25em]">
                        Scroll
                    </span>

                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                        }}
                    >
                        <ChevronDown size={24} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}