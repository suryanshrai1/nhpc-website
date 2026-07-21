import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import useProject from "../hooks/useProject";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";

import ProjectHero from "../components/project-details/ProjectHero";
import ProjectOverview from "../components/project-details/ProjectOverview";
import ProjectHighlights from "../components/project-details/ProjectHighlights";
import ProjectTechnical from "../components/project-details/ProjectTechnical";
import ProjectGallery from "../components/project-details/ProjectGallery";
import ProjectDocuments from "../components/project-details/ProjectDocuments";
import RelatedProjects from "../components/project-details/RelatedProjects";

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function ProjectDetailsSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Hero skeleton */}
            <div className="w-full h-[60vh] min-h-[500px] bg-slate-200" />

            {/* Overview skeleton */}
            <Section className="bg-white">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="flex-1 space-y-4">
                            <div className="h-8 w-48 rounded bg-slate-200" />
                            <div className="space-y-3">
                                <div className="h-4 w-full rounded bg-slate-100" />
                                <div className="h-4 w-5/6 rounded bg-slate-100" />
                                <div className="h-4 w-4/5 rounded bg-slate-100" />
                                <div className="h-4 w-full rounded bg-slate-100" />
                                <div className="h-4 w-3/4 rounded bg-slate-100" />
                            </div>
                        </div>
                        <div className="lg:w-72">
                            <div className="rounded-2xl bg-slate-100 p-6 space-y-5">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-200 shrink-0" />
                                        <div className="flex-1 space-y-1.5">
                                            <div className="h-3 w-20 rounded bg-slate-200" />
                                            <div className="h-4 w-32 rounded bg-slate-200" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Specs skeleton */}
            <Section className="bg-slate-50">
                <Container>
                    <div className="h-8 w-56 rounded bg-slate-200 mb-8" />
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="rounded-xl bg-white border border-slate-200 p-5 space-y-2">
                                <div className="h-3 w-24 rounded bg-slate-200" />
                                <div className="h-5 w-32 rounded bg-slate-200" />
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
        </div>
    );
}

// ─── Back breadcrumb ──────────────────────────────────────────────────────────
function BackBreadcrumb() {
    return (
        <div className="bg-white border-b border-slate-200">
            <Container>
                <div className="py-3">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    >
                        <ArrowLeft size={15} />
                        Back to Projects
                    </Link>
                </div>
            </Container>
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
const ProjectDetails = () => {
    const { slug } = useParams();
    const { project, isLoading, error } = useProject(slug);

    if (isLoading) {
        return <ProjectDetailsSkeleton />;
    }

    if (error) {
        return (
            <Section className="min-h-[60vh] flex items-center justify-center bg-white">
                <Container>
                    <div className="flex flex-col items-center text-center py-16">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-400 mb-5">
                            <AlertCircle size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Failed to Load Project
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-md">
                            There was a problem fetching the project details. Please try again.
                        </p>
                        <div className="flex gap-4">
                            <Button
                                label="Retry"
                                variant="primary"
                                onClick={() => window.location.reload()}
                            />
                            <Button
                                label="← Back to Projects"
                                variant="outline"
                                url="/projects"
                            />
                        </div>
                    </div>
                </Container>
            </Section>
        );
    }

    if (!project) {
        return (
            <Section className="min-h-[60vh] flex items-center justify-center bg-white">
                <Container>
                    <div className="flex flex-col items-center text-center py-16">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-5">
                            <FolderOpen size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Project Not Found
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-md">
                            The project you are looking for does not exist or may have been removed.
                        </p>
                        <Button label="← Back to Projects" variant="primary" url="/projects" />
                    </div>
                </Container>
            </Section>
        );
    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <BackBreadcrumb />
            <ProjectHero project={project} />
            <ProjectOverview project={project} />
            <ProjectHighlights project={project} />
            <ProjectTechnical project={project} />
            <ProjectGallery project={project} />
            <ProjectDocuments project={project} />
            <RelatedProjects project={project} />
        </motion.main>
    );
};

export default ProjectDetails;
