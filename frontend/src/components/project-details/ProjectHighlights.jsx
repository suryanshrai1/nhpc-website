import { motion } from "framer-motion";
import { Award, Zap, Droplets, Users, TreePine } from "lucide-react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const iconMap = {
    capacity: Zap,
    generation: Droplets,
    employment: Users,
    environment: TreePine,
    default: Award,
};

export default function ProjectHighlights({ project }) {
    if (!project) return null;

    const highlights = project.highlights ?? project.details?.highlights ?? [];

    if (!highlights.length) return null;

    return (
        <Section className="bg-blue-50 border-y border-blue-100/60">
            <Container>
                <SectionHeading title="Project Highlights" />

                <motion.div
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
                >
                    {highlights.map((h, i) => {
                        const Icon = iconMap[h.category?.toLowerCase()] ?? iconMap.default;
                        return (
                            <motion.div
                                key={i}
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                className="flex items-start gap-4 rounded-2xl bg-white border border-blue-100 p-6 shadow-sm"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">{h.title ?? h.label}</p>
                                    {h.description && (
                                        <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                                            {h.description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Container>
        </Section>
    );
}
