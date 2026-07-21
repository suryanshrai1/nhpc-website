import React, { useState, useMemo } from "react";
import { Search, AlertCircle, Building2 } from "lucide-react";
import { motion } from "framer-motion";

import usePowerStations from "../hooks/usePowerStations";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

import StationCard from "../components/powerStations/StationCard";
import StationCardSkeleton from "../components/powerStations/StationCardSkeleton";

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    const visiblePages = pages.slice(start - 1, end);

    return (
        <nav
            aria-label="Power stations pagination"
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

export default function PowerStations() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedState, setSelectedState] = useState("");

    const PAGE_SIZE = 12;
    const { stations, loading, error, refresh: retryStations } = usePowerStations();

    // Client-side filtering & search
    const filteredStations = useMemo(() => {
        let items = [...stations];

        if (selectedState) {
            items = items.filter(
                (s) => 
                    String(s.state?.id) === selectedState || 
                    s.state?.name === selectedState
            );
        }

        if (selectedType) {
            items = items.filter(
                (s) => 
                    String(s.projectType?.id) === selectedType || 
                    s.projectType?.name === selectedType
            );
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            items = items.filter(
                (s) => 
                    s.name?.toLowerCase().includes(query) || 
                    s.state?.name?.toLowerCase().includes(query) ||
                    s.projectType?.name?.toLowerCase().includes(query)
            );
        }

        return items;
    }, [stations, searchQuery, selectedType, selectedState]);

    // Unique filter options
    const states = useMemo(() => {
        const unique = new Map();
        stations.forEach((s) => {
            if (s.state) unique.set(s.state.id, s.state.name);
        });
        return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
    }, [stations]);

    const types = useMemo(() => {
        const unique = new Map();
        stations.forEach((s) => {
            if (s.projectType) unique.set(s.projectType.id, s.projectType.name);
        });
        return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
    }, [stations]);

    const totalPages = Math.ceil(filteredStations.length / PAGE_SIZE);
    const paginatedStations = useMemo(() => {
        const startIdx = (page - 1) * PAGE_SIZE;
        return filteredStations.slice(startIdx, startIdx + PAGE_SIZE);
    }, [filteredStations, page]);

    const handleFilterChange = () => {
        setPage(1);
    };

    const hasActiveFilters = searchQuery || selectedType || selectedState;

    const inputClass =
        "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

    return (
        <main>
            {/* ── Hero Section ─────────────────────────────────────────────── */}
            <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
                <Container>
                    <div className="py-20 max-w-3xl">
                        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300">
                            OPERATIONAL PORTFOLIO
                        </span>
                        <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                            Power Stations
                        </h1>
                        <p className="mt-4 text-lg text-slate-300 max-w-2xl">
                            Explore NHPC's operational power assets generating clean hydroelectric, solar and wind power across India.
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
                                placeholder="Search stations by name, type or location..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleFilterChange();
                                }}
                                className={`${inputClass} pl-9`}
                                aria-label="Search power stations"
                            />
                        </div>

                        {/* State Filter */}
                        <select
                            value={selectedState}
                            onChange={(e) => {
                                setSelectedState(e.target.value);
                                handleFilterChange();
                            }}
                            className={`${inputClass} md:w-52`}
                            aria-label="Filter by State"
                        >
                            <option value="">All States</option>
                            {states.map((st) => (
                                <option key={st.id} value={st.name}>
                                    {st.name}
                                </option>
                            ))}
                        </select>

                        {/* Technology Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => {
                                setSelectedType(e.target.value);
                                handleFilterChange();
                            }}
                            className={`${inputClass} md:w-52`}
                            aria-label="Filter by Technology Type"
                        >
                            <option value="">All Technologies</option>
                            {types.map((t) => (
                                <option key={t.id} value={t.name}>
                                    {t.name}
                                </option>
                            ))}
                        </select>

                        {hasActiveFilters && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedType("");
                                    setSelectedState("");
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

            {/* ── Stations Grid ────────────────────────────────────────────── */}
            <Section className="bg-slate-50 min-h-[50vh]">
                <Container>
                    {loading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {[...Array(8)].map((_, i) => (
                                <StationCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-400 mb-5">
                                <AlertCircle size={32} />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                Failed to Load Power Stations
                            </h2>
                            <p className="text-slate-500 mb-6 max-w-sm">
                                There was a problem fetching the stations roster. Please try again.
                            </p>
                            <Button label="Retry" variant="primary" onClick={retryStations} />
                        </div>
                    ) : paginatedStations.length === 0 ? (
                        <EmptyState
                            icon={Building2}
                            title={hasActiveFilters ? "No matching stations found" : "No power stations available"}
                            description={
                                hasActiveFilters
                                    ? "Adjust your search parameters or query keywords."
                                    : "Operational power stations will be displayed here."
                            }
                            action={
                                hasActiveFilters && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedType("");
                                            setSelectedState("");
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
                                    {filteredStations.length}
                                </span>{" "}
                                station{filteredStations.length !== 1 ? "s" : ""}
                            </p>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {paginatedStations.map((station, idx) => (
                                    <motion.div
                                        key={station.id || idx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <StationCard station={station} />
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
