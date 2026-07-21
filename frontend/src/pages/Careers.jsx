import React, { useState, useMemo } from "react";
import { Search, AlertCircle, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

import useCareers from "../hooks/useCareers";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

import JobCard from "../components/careers/JobCard";
import JobCardSkeleton from "../components/careers/JobCardSkeleton";

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    const visiblePages = pages.slice(start - 1, end);

    return (
        <nav
            aria-label="Job openings pagination"
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

export default function Careers() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const limit = 9;
    const { jobs, pagination, loading, error, refresh: retryCareers } = useCareers({
        page,
        limit,
    });

    // Client-side filtering & search over current page listing data
    const filteredJobs = useMemo(() => {
        let items = [...jobs];

        if (selectedType) {
            items = items.filter(
                (j) => 
                    String(j.employmentType?.id) === selectedType || 
                    j.employmentType?.name === selectedType
            );
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            items = items.filter(
                (j) => 
                    j.title?.toLowerCase().includes(query) || 
                    j.summary?.toLowerCase().includes(query) ||
                    j.location?.toLowerCase().includes(query)
            );
        }

        return items;
    }, [jobs, searchQuery, selectedType]);

    // Unique employment types for filters
    const types = useMemo(() => {
        const unique = new Map();
        jobs.forEach((j) => {
            if (j.employmentType) unique.set(j.employmentType.id || j.employmentType.name, j.employmentType.name);
        });
        return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
    }, [jobs]);

    const hasActiveFilters = searchQuery || selectedType;

    const inputClass =
        "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

    return (
        <main>
            {/* ── Hero Section ─────────────────────────────────────────────── */}
            <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
                <Container>
                    <div className="py-20 max-w-3xl">
                        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300">
                            WORK WITH US
                        </span>
                        <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                            Build Your Career at NHPC
                        </h1>
                        <p className="mt-4 text-lg text-slate-300 max-w-2xl">
                            Join a team of professionals dedicated to clean energy generation, engineering excellence, and empowering communities across the country.
                        </p>
                    </div>
                </Container>
            </section>

            {/* ── Why Join Section ─────────────────────────────────────────── */}
            <Section className="bg-white">
                <Container>
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-bold text-blue-600 tracking-wider uppercase block mb-2">NHPC CULTURE</span>
                        <h2 className="text-3xl font-extrabold text-slate-900">Why Join NHPC?</h2>
                        <p className="mt-3 text-slate-500 text-sm md:text-base leading-relaxed">
                            NHPC offers a dynamic work culture, growth opportunities, and a commitment to public service in clean energy.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                            <h3 className="font-bold text-slate-900 text-base mb-2">Growth &amp; Development</h3>
                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                                Excel in your field with tailored corporate learning programs and promotions.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                            <h3 className="font-bold text-slate-900 text-base mb-2">Innovation Focus</h3>
                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                                Work with state-of-the-art power generation technologies and engineering teams.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                            <h3 className="font-bold text-slate-900 text-base mb-2">Public Service</h3>
                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                                Directly contribute to India's green growth agenda and sustainable community development.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* ── Filters Bar ──────────────────────────────────────────────── */}
            <div className="bg-white border-b border-slate-200 border-t sticky top-[72px] z-20">
                <Container>
                    <div className="py-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <div className="relative flex-1 min-w-0">
                            <Search
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                            <input
                                type="text"
                                placeholder="Search openings by title, location or keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`${inputClass} pl-9`}
                                aria-label="Search job openings"
                            />
                        </div>

                        {/* Employment Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className={`${inputClass} sm:w-52`}
                            aria-label="Filter by Job Type"
                        >
                            <option value="">All Employment Types</option>
                            {types.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>

                        {hasActiveFilters && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedType("");
                                }}
                                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </Container>
            </div>

            {/* ── Current Openings Listing Grid ──────────────────────────────── */}
            <Section className="bg-slate-50 min-h-[50vh]">
                <Container>
                    {loading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[...Array(6)].map((_, i) => (
                                <JobCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-400 mb-5">
                                <AlertCircle size={32} />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                Failed to Load Career Openings
                            </h2>
                            <p className="text-slate-500 mb-6 max-w-sm">
                                There was a problem fetching the recruitment notices. Please try again.
                            </p>
                            <Button label="Retry" variant="primary" onClick={retryCareers} />
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <EmptyState
                            icon={Briefcase}
                            title={hasActiveFilters ? "No matching openings" : "No job openings available"}
                            description={
                                hasActiveFilters
                                    ? "Adjust your search parameters or type filters."
                                    : "Active recruitment cycles will be listed here once posted."
                            }
                            action={
                                hasActiveFilters && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedType("");
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
                                    {filteredJobs.length}
                                </span>{" "}
                                opening{filteredJobs.length !== 1 ? "s" : ""}
                            </p>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredJobs.map((job, idx) => (
                                    <motion.div
                                        key={job.id || idx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <JobCard job={job} />
                                    </motion.div>
                                ))}
                            </div>

                            <Pagination
                                currentPage={page}
                                totalPages={pagination?.totalPages || 1}
                                onPageChange={setPage}
                            />
                        </div>
                    )}
                </Container>
            </Section>
        </main>
    );
}