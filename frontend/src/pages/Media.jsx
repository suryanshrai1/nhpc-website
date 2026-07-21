import React, { useState, useMemo } from "react";
import { Search, AlertCircle, Image } from "lucide-react";
import { motion } from "framer-motion";

import useMedia from "../hooks/useMedia";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import SectionHeading from "../components/ui/SectionHeading";

import MediaCard from "../components/common/MediaCard";
import MediaCardSkeleton from "../components/common/MediaCardSkeleton";

// ─── Client-side Pagination ──────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    const visiblePages = pages.slice(start - 1, end);

    return (
        <nav
            aria-label="Media library pagination"
            className="mt-12 flex items-center justify-center gap-1"
        >
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Previous page"
            >
                ← Prev
            </button>

            {start > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                        1
                    </button>
                    {start > 2 && <span className="px-2 text-slate-400">…</span>}
                </>
            )}

            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                        page === currentPage
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "text-slate-600 border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                >
                    {page}
                </button>
            ))}

            {end < totalPages && (
                <>
                    {end < totalPages - 1 && <span className="px-2 text-slate-400">…</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Next page"
            >
                Next →
            </button>
        </nav>
    );
}

export default function Media() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedExt, setSelectedExt] = useState("");
    
    const PAGE_SIZE = 12;
    const { mediaFiles, loading, error, refresh: retryMedia } = useMedia();

    // Client-side filtering & search
    const filteredMedia = useMemo(() => {
        let items = [...mediaFiles];

        // Search by original_name or caption
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            items = items.filter(
                (m) => 
                    m.original_name?.toLowerCase().includes(query) || 
                    m.caption?.toLowerCase().includes(query)
            );
        }

        // Filter by general mime type (image, video, document/other)
        if (selectedType) {
            items = items.filter((m) => {
                const mime = m.mime_type?.toLowerCase() || "";
                if (selectedType === "image") return mime.startsWith("image/");
                if (selectedType === "video") return mime.startsWith("video/");
                if (selectedType === "document") {
                    return !mime.startsWith("image/") && !mime.startsWith("video/");
                }
                return true;
            });
        }

        // Filter by file extension
        if (selectedExt) {
            items = items.filter(
                (m) => m.extension?.toLowerCase() === selectedExt.toLowerCase()
            );
        }

        return items;
    }, [mediaFiles, searchQuery, selectedType, selectedExt]);

    // Unique extensions for filter list
    const extensions = useMemo(() => {
        const unique = new Set();
        mediaFiles.forEach((m) => {
            if (m.extension) unique.add(m.extension.toLowerCase());
        });
        return Array.from(unique).sort();
    }, [mediaFiles]);

    const totalPages = Math.ceil(filteredMedia.length / PAGE_SIZE);
    const paginatedMedia = useMemo(() => {
        const startIdx = (page - 1) * PAGE_SIZE;
        return filteredMedia.slice(startIdx, startIdx + PAGE_SIZE);
    }, [filteredMedia, page]);

    const handleFilterChange = () => {
        setPage(1);
    };

    const hasActiveFilters = searchQuery || selectedType || selectedExt;

    const inputClass =
        "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

    return (
        <main>
            {/* ── Hero Section ─────────────────────────────────────────────── */}
            <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
                <Container>
                    <div className="py-20 max-w-3xl">
                        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300">
                            MEDIA RESOURCES
                        </span>
                        <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                            Media Library
                        </h1>
                        <p className="mt-4 text-lg text-slate-300 max-w-2xl">
                            Explore NHPC's media assets, resource documentation, official photos, videos, and downloads.
                        </p>
                    </div>
                </Container>
            </section>

            {/* ── Filters Bar ──────────────────────────────────────────────── */}
            <div className="bg-white border-b border-slate-200 sticky top-[72px] z-20">
                <Container>
                    <div className="py-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                        <div className="relative flex-1 min-w-0">
                            <Search
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                            <input
                                type="text"
                                placeholder="Search media by filename or caption..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleFilterChange();
                                }}
                                className={`${inputClass} pl-9`}
                                aria-label="Search media files"
                            />
                        </div>

                        {/* Media Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => {
                                setSelectedType(e.target.value);
                                handleFilterChange();
                            }}
                            className={`${inputClass} md:w-52`}
                            aria-label="Filter by Media Type"
                        >
                            <option value="">All Types</option>
                            <option value="image">Images</option>
                            <option value="video">Videos</option>
                            <option value="document">Documents &amp; Files</option>
                        </select>

                        {/* Extension Filter */}
                        <select
                            value={selectedExt}
                            onChange={(e) => {
                                setSelectedExt(e.target.value);
                                handleFilterChange();
                            }}
                            className={`${inputClass} md:w-52`}
                            aria-label="Filter by Extension"
                        >
                            <option value="">All Extensions</option>
                            {extensions.map((ext) => (
                                <option key={ext} value={ext}>
                                    .{ext.toUpperCase()}
                                </option>
                            ))}
                        </select>

                        {hasActiveFilters && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedType("");
                                    setSelectedExt("");
                                    setPage(1);
                                }}
                                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </Container>
            </div>

            {/* ── Media Grid ──────────────────────────────────────────────── */}
            <Section className="bg-slate-50 min-h-[50vh]">
                <Container>
                    {loading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {[...Array(8)].map((_, i) => (
                                <MediaCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-400 mb-5">
                                <AlertCircle size={32} />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                Failed to Load Media Library
                            </h2>
                            <p className="text-slate-500 mb-6 max-w-sm">
                                There was a problem fetching the media assets. Please try again.
                            </p>
                            <Button label="Retry" variant="primary" onClick={retryMedia} />
                        </div>
                    ) : paginatedMedia.length === 0 ? (
                        <EmptyState
                            icon={Image}
                            title={hasActiveFilters ? "No matching media found" : "No media files available"}
                            description={
                                hasActiveFilters
                                    ? "Adjust your search search query or filter options."
                                    : "Uploaded media resources will be displayed here."
                            }
                            action={
                                hasActiveFilters && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedType("");
                                            setSelectedExt("");
                                        }}
                                        className="px-5 py-2.5 rounded-full border border-slate-300 text-sm font-medium text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                    >
                                        Clear Filters
                                    </button>
                                )
                            }
                        />
                    ) : (
                        <div>
                            {/* Result Counter */}
                            <p className="text-sm text-slate-500 mb-6">
                                Showing{" "}
                                <span className="font-medium text-slate-800">
                                    {filteredMedia.length}
                                </span>{" "}
                                file{filteredMedia.length !== 1 ? "s" : ""}
                            </p>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {paginatedMedia.map((media, idx) => (
                                    <motion.div
                                        key={media.id || idx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <MediaCard media={media} />
                                    </motion.div>
                                ))}
                            </div>

                            <Pagination
                                currentPage={page}
                                totalPages={totalPages || 1}
                                onPageChange={setPage}
                            />
                        </div>
                    )}
                </Container>
            </Section>
        </main>
    );
}