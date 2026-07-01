import { motion } from "framer-motion";
import useProjects from "../../hooks/useProjects";
import ProjectCard from "../project/ProjectCard";
import Section from "../ui/Section";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function FeaturedProjects() {
    const { projects, loading, error } = useProjects();

    if (loading) {
        return (
            <Section className="bg-slate-50/20">
                <Container className="flex flex-col items-center justify-center py-20 text-slate-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                    <span className="text-sm font-medium tracking-wide">Loading Featured Projects...</span>
                </Container>
            </Section>
        );
    }

    if (error) {
        return null; // Fail silently to preserve UI flow if projects cannot load
    }

    const featured = (projects || []).filter((p) => p.isFeatured === true);

    if (featured.length === 0) return null;

    // Limit to 3 projects for the home page design (1 large on top, 2 smaller below on desktop)
    const displayProjects = featured.slice(0, 3);
    const firstProject = displayProjects[0];
    const restProjects = displayProjects.slice(1);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    return (
        <Section className="bg-slate-50/20 border-b border-slate-100">
            <Container>
                <SectionHeading
                    badge="Key Assets"
                    title="Featured Projects"
                    subtitle="Pioneering clean energy infrastructure across the nation, driven by innovation, scale, and sustainability."
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10% 0px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
                >
                    {/* Top large featured project (spans full width on desktop/tablet) */}
                    {firstProject && (
                        <ProjectCard project={firstProject} layout="large" />
                    )}

                    {/* Bottom two projects (1 column each on desktop/tablet) */}
                    {restProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} layout="normal" />
                    ))}
                </motion.div>
            </Container>
        </Section>
    );
}
