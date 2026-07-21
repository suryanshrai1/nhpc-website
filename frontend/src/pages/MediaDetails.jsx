import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, FileText, Download, AlertCircle, Info, Landmark } from "lucide-react";
import { motion } from "framer-motion";

import useMediaItem from "../hooks/useMediaItem";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { formatFileSize, getFileIcon, getMediaPublicUrl } from "../utils/fileHelpers";

// ─── Details Skeleton Loader ──────────────────────────────────────────────────
function MediaDetailsSkeleton() {
    return (
        <div className="animate-pulse bg-slate-50 min-h-screen">
            {/* Header skeleton */}
            <div className="bg-white border-b border-slate-200 py-12">
                <Container>
                    <div className="space-y-4">
                        <div className="h-5 w-24 bg-slate-200 rounded-full" />
                        <div className="h-8 w-1/2 bg-slate-200 rounded" />
                        <div className="h-4 w-32 bg-slate-100 rounded" />
                    </div>
                </Container>
            </div>

            {/* Content skeleton */}
            <Section>
                <Container>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 space-y-6">
                            <div className="h-60 bg-slate-200 rounded-3xl" />
                        </div>
                        <div className="lg:w-80 space-y-4">
                            <div className="h-40 bg-slate-200 rounded-2xl" />
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}

export default function MediaDetails() {
    const { id } = useParams();
    const { mediaItem, loading, error } = useMediaItem(id);
    const [imgErr, setImgErr] = React.useState(false);

    if (loading) {
        return <MediaDetailsSkeleton />;
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
                            Failed to Load Media Item
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-md">
                            There was a problem fetching this media's details. Please try again.
                        </p>
                        <div className="flex gap-4">
                            <Button label="Retry" variant="primary" onClick={() => window.location.reload()} />
                            <Button label="← Back to Media" variant="outline" url="/media" />
                        </div>
                    </div>
                </Container>
            </Section>
        );
    }

    if (!mediaItem) {
        return (
            <Section className="min-h-[60vh] flex items-center justify-center bg-white">
                <Container>
                    <div className="flex flex-col items-center text-center py-16">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-5">
                            <FileText size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Media Asset Not Found
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-md">
                            The media file you are looking for does not exist or may have been deleted.
                        </p>
                        <Button label="← Back to Media" variant="primary" url="/media" />
                    </div>
                </Container>
            </Section>
        );
    }

    const { original_name, stored_name, mime_type, extension, size_bytes, width, height, duration_seconds, storage_path, caption, created_at } = mediaItem;

    const publicUrl = getMediaPublicUrl(storage_path);
    const Icon = getFileIcon(mime_type, extension);
    const sizeStr = size_bytes ? formatFileSize(Number(size_bytes)) : "";
    const isImage = mime_type?.startsWith("image/") && !imgErr;
    const isVideo = mime_type?.startsWith("video/");

    const formatUploadDate = (dateStr) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-50 min-h-screen"
        >
            {/* ── Breadcrumb Navigation ────────────────────────────────────── */}
            <div className="bg-white border-b border-slate-200">
                <Container>
                    <div className="py-3">
                        <Link
                            to="/media"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                        >
                            <ArrowLeft size={15} />
                            Back to Media Library
                        </Link>
                    </div>
                </Container>
            </div>

            {/* ── Media Header ─────────────────────────────────────────────── */}
            <div className="bg-white border-b border-slate-200 py-10 md:py-12">
                <Container>
                    <div className="flex flex-wrap gap-2.5 mb-4">
                        <Badge variant={isImage ? "primary" : isVideo ? "secondary" : "default"}>
                            {isImage ? "Image" : isVideo ? "Video" : "Document"}
                        </Badge>
                        {extension && (
                            <Badge variant="outline">.{extension.toUpperCase()}</Badge>
                        )}
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight break-all">
                        {original_name}
                    </h1>
                    {caption && (
                        <p className="mt-4 text-base md:text-lg text-slate-600 max-w-4xl font-light italic">
                            "{caption}"
                        </p>
                    )}
                </Container>
            </div>

            {/* ── Media Body & Preview ─────────────────────────────────────── */}
            <Section className="py-8 md:py-10">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Visual Asset frame */}
                        <div className="flex-1 w-full bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden flex items-center justify-center p-6 min-h-[300px] md:min-h-[450px]">
                            {isImage && publicUrl !== "#" && !imgErr ? (
                                <img
                                    src={publicUrl}
                                    alt={caption || original_name}
                                    onError={() => setImgErr(true)}
                                    className="max-h-[500px] object-contain rounded-2xl shadow-sm border border-slate-100 bg-white"
                                />
                            ) : isVideo && publicUrl !== "#" ? (
                                <video
                                    src={publicUrl}
                                    controls
                                    className="w-full max-h-[500px] rounded-2xl shadow-sm bg-slate-950"
                                    preload="metadata"
                                />
                            ) : (
                                <div className="text-slate-400 flex flex-col items-center gap-4 py-12">
                                    <Icon size={72} className="text-slate-300" />
                                    <span className="text-sm font-semibold tracking-wider text-slate-400">
                                        No Visual Preview Available
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Metadata Details Sidebar */}
                        <div className="w-full lg:w-80 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm shrink-0 space-y-6">
                            <div>
                                <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 mb-4">
                                    <Info size={16} className="text-blue-600" />
                                    Asset Metadata
                                </h3>
                                
                                <dl className="space-y-4 text-sm">
                                    <div className="border-b border-slate-100 pb-3">
                                        <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Uploaded Date</dt>
                                        <dd className="mt-1 font-semibold text-slate-800 flex items-center gap-1.5">
                                            <Calendar size={13} className="text-slate-400" />
                                            {formatUploadDate(created_at)}
                                        </dd>
                                    </div>
                                    <div className="border-b border-slate-100 pb-3">
                                        <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">File Size</dt>
                                        <dd className="mt-1 font-semibold text-slate-800">
                                            {sizeStr || "N/A"}
                                        </dd>
                                    </div>
                                    <div className="border-b border-slate-100 pb-3">
                                        <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">MIME Type</dt>
                                        <dd className="mt-1 font-semibold text-slate-800 break-all font-mono text-xs">
                                            {mime_type || "unknown"}
                                        </dd>
                                    </div>
                                    {width && height && (
                                        <div className="border-b border-slate-100 pb-3">
                                            <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dimensions</dt>
                                            <dd className="mt-1 font-semibold text-slate-800">
                                                {width} × {height} pixels
                                            </dd>
                                        </div>
                                    )}
                                    {duration_seconds && (
                                        <div>
                                            <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</dt>
                                            <dd className="mt-1 font-semibold text-slate-800">
                                                {Number(duration_seconds).toFixed(2)} seconds
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            {/* Download Action CTA */}
                            {publicUrl !== "#" && (
                                <a
                                    href={publicUrl}
                                    download={original_name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                    <Download size={16} />
                                    Download / Open File
                                </a>
                            )}
                        </div>
                    </div>
                </Container>
            </Section>
        </motion.main>
    );
}
