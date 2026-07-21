import { motion } from "framer-motion";
import { FileText, Download, FileArchive, File } from "lucide-react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import EmptyState from "../ui/EmptyState";
import { getMediaPublicUrl } from "../../utils/fileHelpers";

const fileIconMap = {
    pdf: FileText,
    zip: FileArchive,
    default: File,
};

function DocumentCard({ doc }) {
    const rawPath = doc.file?.path || doc.url;
    const downloadUrl = getMediaPublicUrl(rawPath);
    const ext = rawPath?.split(".").pop()?.toLowerCase() ?? "default";
    const Icon = fileIconMap[ext] ?? fileIconMap.default;

    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
        >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                <Icon size={24} />
            </div>

            <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900 truncate">{doc.title ?? doc.name ?? "Document"}</p>
                {doc.description && (
                    <p className="text-sm text-slate-500 mt-0.5 truncate">{doc.description}</p>
                )}
                {doc.fileSize && (
                    <p className="text-xs text-slate-400 mt-0.5">{doc.fileSize}</p>
                )}
            </div>

            <a
                href={downloadUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${doc.title ?? "document"}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
                <Download size={16} />
            </a>
        </motion.div>
    );
}

export default function ProjectDocuments({ project }) {
    if (!project) return null;

    const documents = project.documents ?? project.details?.documents ?? [];

    return (
        <Section className="bg-white border-b border-slate-200/60">
            <Container>
                <SectionHeading title="Documents & Reports" />

                {documents.length === 0 ? (
                    <EmptyState
                        icon={FileText}
                        title="No documents available"
                        description="Project documents and reports will appear here when published."
                    />
                ) : (
                    <motion.div
                        className="grid gap-4 sm:grid-cols-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
                    >
                        {documents.map((doc, i) => (
                            <DocumentCard key={doc.id ?? i} doc={doc} />
                        ))}
                    </motion.div>
                )}
            </Container>
        </Section>
    );
}
