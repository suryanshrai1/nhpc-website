import React, { useState, useMemo } from "react";
import { Search, AlertCircle, FileText, Calendar } from "lucide-react";
import { motion } from "framer-motion";

import useTenders from "../hooks/useTenders";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

import TenderCard from "../components/tenders/TenderCard";
import TenderCardSkeleton from "../components/tenders/TenderCardSkeleton";

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    const visiblePages = pages.slice(start - 1, end);

    return (
        <nav
            aria-label="Tenders pagination"
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

export default function Tenders() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const limit = 9;
    const { tenders, pagination, loading, error, refresh: retryTenders } = useTenders({
        page,
        limit,
    });

    // Client-side search and filters over current page listing data
    const filteredTenders = useMemo(() => {
        let items = [...tenders];

        if (selectedCategory) {
            items = items.filter(
                (t) => 
                    String(t.category?.id) === selectedCategory || 
                    t.category?.name === selectedCategory
            );
        }

        if (selectedStatus) {
            items = items.filter(
                (t) => 
                    String(t.status?.id) === selectedStatus || 
                    t.status?.name === selectedStatus
            );
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            items = items.filter(
                (t) => 
                    t.title?.toLowerCase().includes(query) || 
                    t.tenderNumber?.toLowerCase().includes(query) ||
                    t.summary?.toLowerCase().includes(query)
            );
        }

        return items;
    }, [tenders, searchQuery, selectedCategory, selectedStatus]);

    // Unique Categories & Statuses in current response for client-side drop-downs
    const categories = useMemo(() => {
        const unique = new Map();
        tenders.forEach((t) => {
            if (t.category) unique.set(t.category.id || t.category.name, t.category.name);
        });
        return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
    }, [tenders]);

    const statuses = useMemo(() => {
        const unique = new Map();
        tenders.forEach((t) => {
            if (t.status) unique.set(t.status.id || t.status.name, t.status.name);
        });
        return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
    }, [tenders]);

    const hasActiveFilters = searchQuery || selectedCategory || selectedStatus;

    const inputClass =
        "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

    return (
        <main>
            {/* ── Hero Section ─────────────────────────────────────────────── */}
            <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
                <Container>
                    <div className="py-20 max-w-3xl">
                        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300">
                            PROCUREMENT
                        </span>
                        <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                            Active Tenders
                        </h1>
                        <p className="mt-4 text-lg text-slate-300 max-w-2xl">
                            View active procurement notices, tender bids, documents, and key operational schedules for NHPC projects.
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
                                placeholder="Search tenders by ID, title or summary..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`${inputClass} pl-9`}
                                aria-label="Search tenders"
                            />
                        </div>

                        {/* Category Dropdown */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={`${inputClass} md:w-52`}
                            aria-label="Filter by Category"
                        >
                            <option value="">All Categories</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        {/* Status Dropdown */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className={`${inputClass} md:w-52`}
                            aria-label="Filter by Status"
                        >
                            <option value="">All Statuses</option>
                            {statuses.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>

                        {hasActiveFilters && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("");
                                    setSelectedStatus("");
                                }}
                                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </Container>
            </div>

            {/* ── Tenders Listing Grid ────────────────────────────────────── */}
            <Section className="bg-slate-50 min-h-[50vh]">
                <Container>
                    {loading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[...Array(6)].map((_, i) => (
                                <TenderCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-400 mb-5">
                                <AlertCircle size={32} />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                Failed to Load Tenders
                            </h2>
                            <p className="text-slate-500 mb-6 max-w-sm">
                                There was a problem fetching the tenders list. Please try again.
                            </p>
                            <Button label="Retry" variant="primary" onClick={retryTenders} />
                        </div>
                    ) : filteredTenders.length === 0 ? (
                        <EmptyState
                            icon={FileText}
                            title={hasActiveFilters ? "No matching tenders" : "No tenders available"}
                            description={
                                hasActiveFilters
                                    ? "Adjust your search filters or clear values."
                                    : "Active tenders will be listed here once posted."
                            }
                            action={
                                hasActiveFilters && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedCategory("");
                                            setSelectedStatus("");
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
                                    {filteredTenders.length}
                                </span>{" "}
                                tender{filteredTenders.length !== 1 ? "s" : ""}
                            </p>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredTenders.map((tender, idx) => (
                                    <motion.div
                                        key={tender.id || idx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <TenderCard tender={tender} />
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
