import React, { useState, useMemo } from "react";
import { Search, AlertCircle, FileText, Landmark, TrendingUp, Zap, Building2, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

import useFinancialYears from "../hooks/useFinancialYears";
import useInvestorHighlights from "../hooks/useInvestorHighlights";
import useInvestorDocuments from "../hooks/useInvestorDocuments";

import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import SectionHeading from "../components/ui/SectionHeading";

import DocumentCard from "../components/investors/DocumentCard";
import DocumentSkeleton from "../components/investors/DocumentSkeleton";
import { HighlightSkeleton } from "../components/investors/HighlightSkeleton";

// Metric icon map
const metricIconMap = {
    Revenue: Landmark,
    "Net Profit": TrendingUp,
    "Installed Capacity": Zap,
    "Power Stations": Building2,
};

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    const visiblePages = pages.slice(start - 1, end);

    return (
        <nav
            aria-label="Investor documents pagination"
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

export default function Investors() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedType, setSelectedType] = useState("");

    // Load static data
    const { financialYears, loading: yearsLoading } = useFinancialYears();
    const { highlights, loading: highlightsLoading, error: highlightsError, refresh: retryHighlights } = useInvestorHighlights();
    
    // Load documents
    const limit = 9;
    const { documents, pagination, loading: docsLoading, error: docsError, refresh: retryDocs } = useInvestorDocuments({
        page,
        limit,
    });

    // Client-side filtering & sorting
    const filteredDocuments = useMemo(() => {
        let items = [...documents];

        // Filter by financial year (compare object's id or label)
        if (selectedYear) {
            items = items.filter(
                (doc) => 
                    String(doc.financialYear?.id) === selectedYear || 
                    doc.financialYear?.label === selectedYear
            );
        }

        // Filter by document type
        if (selectedType) {
            items = items.filter(
                (doc) => 
                    String(doc.type?.id) === selectedType || 
                    doc.type?.name === selectedType
            );
        }

        // Search in title and description
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            items = items.filter(
                (doc) => 
                    doc.title?.toLowerCase().includes(query) || 
                    doc.description?.toLowerCase().includes(query)
            );
        }

        // Sort: Newest first based on publishedAt
        items.sort((a, b) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return dateB - dateA;
        });

        return items;
    }, [documents, searchQuery, selectedYear, selectedType]);

    // Unique document types present in current fetched page for client-side filtering
    const docTypes = useMemo(() => {
        const types = new Map();
        documents.forEach((doc) => {
            if (doc.type) {
                types.set(doc.type.id || doc.type.name, doc.type.name);
            }
        });
        return Array.from(types.entries()).map(([id, name]) => ({ id, name }));
    }, [documents]);

    const handleFilterChange = () => {
        // Reset local page filters/reset pagination to page 1 if doing backend search in future
    };

    const hasActiveFilters = searchQuery || selectedYear || selectedType;

    const inputClass =
        "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

    return (
        <main>
            {/* ── Hero Section ─────────────────────────────────────────────── */}
            <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
                <Container>
                    <div className="py-20 max-w-3xl">
                        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300">
                            INVESTOR RELATIONS
                        </span>
                        <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                            Investor Center
                        </h1>
                        <p className="mt-4 text-lg text-slate-300 max-w-2xl">
                            Access NHPC's financial statements, quarterly results, annual reports, shareholder information, and key governance policies.
                        </p>
                    </div>
                </Container>
            </section>

            {/* ── Highlights Section ────────────────────────────────────────── */}
            <Section className="bg-slate-50 border-b border-slate-200/60">
                <Container>
                    <SectionHeading
                        title="Key Financial Highlights"
                        subtitle="Overview of major performance indicators from the latest financial year."
                    />

                    {highlightsLoading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {[...Array(4)].map((_, i) => (
                                <HighlightSkeleton key={i} />
                            ))}
                        </div>
                    ) : highlightsError ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <AlertCircle className="text-red-500 mb-3" size={32} />
                            <h4 className="font-semibold text-slate-800">Failed to load highlights</h4>
                            <p className="text-sm text-slate-500 mb-4">Please try again.</p>
                            <Button label="Retry" variant="outline" onClick={retryHighlights} />
                        </div>
                    ) : highlights.length === 0 ? (
                        <EmptyState
                            icon={Landmark}
                            title="No highlights available"
                            description="Highlights will appear once the latest metrics are published."
                        />
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {highlights.map((item, idx) => {
                                const Icon = metricIconMap[item.metric] || HelpCircle;
                                return (
                                    <motion.div
                                        key={item.id || idx}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                        className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                                            <Icon size={24} />
                                        </div>
                                        <span className="text-2xl font-bold text-slate-900">
                                            {item.value} {item.unit}
                                        </span>
                                        <span className="text-sm font-medium text-slate-600 mt-2">
                                            {item.metric}
                                        </span>
                                        <span className="text-xs text-slate-400 mt-1">
                                            FY {item.financialYear}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </Container>
            </Section>

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
                                placeholder="Search documents by title or description..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleFilterChange();
                                }}
                                className={`${inputClass} pl-9`}
                                aria-label="Search documents"
                            />
                        </div>

                        {/* Financial Year Filter */}
                        <select
                            value={selectedYear}
                            onChange={(e) => {
                                setSelectedYear(e.target.value);
                                handleFilterChange();
                            }}
                            disabled={yearsLoading}
                            className={`${inputClass} md:w-52`}
                            aria-label="Filter by Financial Year"
                        >
                            <option value="">All Financial Years</option>
                            {financialYears.map((year) => (
                                <option key={year.id} value={year.id}>
                                    {year.label}
                                </option>
                            ))}
                        </select>

                        {/* Document Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => {
                                setSelectedType(e.target.value);
                                handleFilterChange();
                            }}
                            className={`${inputClass} md:w-52`}
                            aria-label="Filter by Type"
                        >
                            <option value="">All Types</option>
                            {docTypes.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>

                        {hasActiveFilters && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedYear("");
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

            {/* ── Documents List Section ───────────────────────────────────── */}
            <Section className="bg-slate-50 min-h-[40vh]">
                <Container>
                    {docsLoading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[...Array(6)].map((_, i) => (
                                <DocumentSkeleton key={i} />
                            ))}
                        </div>
                    ) : docsError ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-400 mb-5">
                                <AlertCircle size={32} />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                Failed to Load Documents
                            </h2>
                            <p className="text-slate-500 mb-6 max-w-sm">
                                There was a problem fetching the investor documents. Please try again.
                            </p>
                            <Button label="Retry" variant="primary" onClick={retryDocs} />
                        </div>
                    ) : filteredDocuments.length === 0 ? (
                        <EmptyState
                            icon={FileText}
                            title={hasActiveFilters ? "No matching documents" : "No documents found"}
                            description={
                                hasActiveFilters
                                    ? "Try adjusting your search query or filter options."
                                    : "Investor documents will be listed here once uploaded."
                            }
                            action={
                                hasActiveFilters && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedYear("");
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
                                    {filteredDocuments.length}
                                </span>{" "}
                                document{filteredDocuments.length !== 1 ? "s" : ""}
                            </p>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredDocuments.map((doc, idx) => (
                                    <motion.div
                                        key={doc.id || idx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <DocumentCard doc={doc} />
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
