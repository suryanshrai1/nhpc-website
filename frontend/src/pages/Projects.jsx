import { useState, useMemo } from "react";
import { AlertCircle, FolderOpen, Search } from "lucide-react";
import { motion } from "framer-motion";

import useProjects from "../hooks/useProjects";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import ProjectGrid from "../components/projects/ProjectGrid";
import ProjectCardSkeleton from "../components/projects/ProjectCardSkeleton";

// ─── Skeleton grid shown while loading ───────────────────────────────────────
function SkeletonGrid() {
    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <ProjectCardSkeleton isLarge />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
        </div>
    );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    // Show max 5 page buttons, sliding window around currentPage
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    const visiblePages = pages.slice(start - 1, end);

    return (
        <nav
            aria-label="Project pagination"
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Projects() {
    const { projects, pagination, loading, error } = useProjects();

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 6;

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesSearch = project.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter ? project.status === statusFilter : true;
            const matchesType = typeFilter ? project.type === typeFilter : true;
            return matchesSearch && matchesStatus && matchesType;
        });
    }, [projects, searchQuery, statusFilter, typeFilter]);

    // Client-side pagination on filtered results
    const totalFilteredPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const handleFilterChange = () => setCurrentPage(1);

    const inputClass =
        "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

    return (
        <main>
            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
                <Container>
                    <div className="py-20 max-w-3xl">
                        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300">
                            NHPC PROJECTS
                        </span>
                        <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                            Building India's Renewable Future
                        </h1>
                        <p className="mt-4 text-lg text-slate-300 max-w-2xl">
                            Explore NHPC's portfolio of hydroelectric, solar, wind and renewable energy projects powering sustainable development across India.
                        </p>
                    </div>
                </Container>
            </section>

            {/* ── Filters ──────────────────────────────────────────────────── */}
            <div className="bg-white border-b border-slate-200 sticky top-[72px] z-20">
                <Container>
                    <div className="py-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <div className="relative flex-1 min-w-0">
                            <Search
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleFilterChange();
                                }}
                                className={`${inputClass} pl-9`}
                                aria-label="Search projects"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                handleFilterChange();
                            }}
                            className={`${inputClass} sm:w-48`}
                            aria-label="Filter by status"
                        >
                            <option value="">All Statuses</option>
                            <option value="Operational">Operational</option>
                            <option value="Under Construction">Under Construction</option>
                            <option value="Approved">Approved</option>
                        </select>

                        <select
                            value={typeFilter}
                            onChange={(e) => {
                                setTypeFilter(e.target.value);
                                handleFilterChange();
                            }}
                            className={`${inputClass} sm:w-48`}
                            aria-label="Filter by type"
                        >
                            <option value="">All Types</option>
                            <option value="Hydroelectric">Hydroelectric</option>
                            <option value="Solar">Solar</option>
                            <option value="Wind">Wind</option>
                            <option value="Pumped Storage">Pumped Storage</option>
                        </select>

                        {(searchQuery || statusFilter || typeFilter) && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setStatusFilter("");
                                    setTypeFilter("");
                                    setCurrentPage(1);
                                }}
                                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </Container>
            </div>

            {/* ── Results ──────────────────────────────────────────────────── */}
            <Section className="bg-slate-50 min-h-[50vh]">
                <Container>
                    {loading ? (
                        <SkeletonGrid />
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-400 mb-5">
                                <AlertCircle size={32} />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                Failed to Load Projects
                            </h2>
                            <p className="text-slate-500 mb-6 max-w-sm">
                                There was a problem fetching the projects. Please check your connection and try again.
                            </p>
                            <Button
                                label="Retry"
                                variant="primary"
                                onClick={() => window.location.reload()}
                            />
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <EmptyState
                            icon={searchQuery || statusFilter || typeFilter ? Search : FolderOpen}
                            title={
                                searchQuery || statusFilter || typeFilter
                                    ? "No matching projects"
                                    : "No projects yet"
                            }
                            description={
                                searchQuery || statusFilter || typeFilter
                                    ? "Try adjusting your search or filter criteria."
                                    : "Projects will appear here once added."
                            }
                            action={
                                (searchQuery || statusFilter || typeFilter) && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setStatusFilter("");
                                            setTypeFilter("");
                                        }}
                                        className="px-5 py-2.5 rounded-full border border-slate-300 text-sm font-medium text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                    >
                                        Clear Filters
                                    </button>
                                )
                            }
                        />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Results count */}
                            <p className="text-sm text-slate-500 mb-6">
                                Showing{" "}
                                <span className="font-medium text-slate-800">
                                    {filteredProjects.length}
                                </span>{" "}
                                project{filteredProjects.length !== 1 ? "s" : ""}
                            </p>

                            <ProjectGrid projects={paginatedProjects} />

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalFilteredPages}
                                onPageChange={setCurrentPage}
                            />
                        </motion.div>
                    )}
                </Container>
            </Section>
        </main>
    );
}