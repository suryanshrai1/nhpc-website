import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProjectCard from "../projects/ProjectCard";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const HOMEPAGE_LIMIT = 3;

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export default function FeaturedProjects({ featuredProjects }) {
    if (
        !featuredProjects ||
        !featuredProjects.isVisible ||
        !featuredProjects.items?.length
    ) {
        return null;
    }

    const projects = featuredProjects.items.slice(0, HOMEPAGE_LIMIT);

    const featuredProject = projects[0];
    const secondaryProjects = projects.slice(1);

    const hasMoreProjects =
        featuredProjects.items.length > HOMEPAGE_LIMIT;

    return (
        <Section className="border-b border-slate-200/60 bg-slate-50/20">
            <Container>
                <SectionHeading
                    badge={featuredProjects.badge}
                    title={featuredProjects.title}
                    subtitle={featuredProjects.subtitle}
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-10% 0px",
                    }}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
                >
                    {featuredProject && (
                        <ProjectCard
                            project={featuredProject}
                            layout="large"
                        />
                    )}

                    {secondaryProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            layout="normal"
                        />
                    ))}
                </motion.div>

                {hasMoreProjects && (
                    <div className="mt-12 flex justify-center">
                        <Link
                            to="/projects"
                            className="group inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-blue-700 hover:bg-blue-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                            View All Projects

                            <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                )}
            </Container>
        </Section>
    );
}