import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FolderOpen, ArrowRight, MapPin, Zap } from "lucide-react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import EmptyState from "../ui/EmptyState";
import { getMediaPublicUrl } from "../../utils/fileHelpers";

const getStatusStyles = (status) => {
    switch (status) {
        case "Operational": return "bg-emerald-50 text-emerald-700 border-emerald-100";
        case "Under Construction": return "bg-orange-50 text-orange-700 border-orange-100";
        case "Approved": return "bg-blue-50 text-blue-700 border-blue-100";
        default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
};

function RelatedCard({ project }) {
    const navigate = useNavigate();
    const placeholders = {
        Hydroelectric: "/images/placeholders/hydro.jpeg",
        Solar: "/images/placeholders/solar.jpg",
        Wind: "/images/placeholders/wind.jpg",
        "Pumped Storage": "/images/placeholders/pumped-storage.jpg",
    };
    const rawUrl = project.thumbnail?.url;
    const imageUrl = rawUrl ? getMediaPublicUrl(rawUrl) : (placeholders[project.type] ?? "/images/placeholders/default-project.jpeg");

    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            onClick={() => navigate(`/projects/${project.slug}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/projects/${project.slug}`)}
            aria-label={`View ${project.name}`}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 flex flex-col"
        >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[16/9]">
                <img
                    src={imageUrl}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                {project.status && (
                    <span className={`absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusStyles(project.status)}`}>
                        {project.status}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-2">
                    {project.state && (
                        <span className="flex items-center gap-1">
                            <MapPin size={12} /> {project.state}
                        </span>
                    )}
                    {project.capacity && (
                        <span className="flex items-center gap-1 font-semibold text-blue-600">
                            <Zap size={12} /> {project.capacity} {project.capacityUnit}
                        </span>
                    )}
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {project.name}
                </h3>
                <div className="mt-auto pt-4 flex items-center gap-1 text-sm font-medium text-blue-600">
                    Explore <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </motion.div>
    );
}

export default function RelatedProjects({ project }) {
    if (!project) return null;

    const related = (project.relatedProjects ?? project.related ?? []).slice(0, 3);

    return (
        <Section className="bg-slate-50 border-t border-slate-200/60">
            <Container>
                <SectionHeading
                    title="Related Projects"
                    subtitle="Explore more projects from NHPC's renewable energy portfolio."
                />

                {related.length === 0 ? (
                    <EmptyState
                        icon={FolderOpen}
                        title="No related projects"
                        description="Other projects from this category will appear here."
                    />
                ) : (
                    <motion.div
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
                    >
                        {related.map((p) => (
                            <RelatedCard key={p.id ?? p.slug} project={p} />
                        ))}
                    </motion.div>
                )}
            </Container>
        </Section>
    );
}
