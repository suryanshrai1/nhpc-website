import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Briefcase, FileText, AlertCircle, Info, Download } from "lucide-react";
import { motion } from "framer-motion";

import useCareer from "../hooks/useCareer";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import DocumentCard from "../components/investors/DocumentCard";

// ─── Details Skeleton Loader ──────────────────────────────────────────────────
function CareerDetailsSkeleton() {
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
                            <div className="h-6 w-48 bg-slate-200 rounded" />
                            <div className="space-y-3">
                                <div className="h-4 w-full bg-slate-100 rounded" />
                                <div className="h-4 w-5/6 bg-slate-100 rounded" />
                            </div>
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

export default function CareerDetails() {
    const { slug } = useParams();
    const { job, loading, error } = useCareer(slug);

    if (loading) {
        return <CareerDetailsSkeleton />;
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
                            Failed to Load Opening Details
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-md">
                            There was a problem fetching this career notice. Please try again.
                        </p>
                        <div className="flex gap-4">
                            <Button label="Retry" variant="primary" onClick={() => window.location.reload()} />
                            <Button label="← Back to Careers" variant="outline" url="/careers" />
                        </div>
                    </div>
                </Container>
            </Section>
        );
    }

    if (!job) {
        return (
            <Section className="min-h-[60vh] flex items-center justify-center bg-white">
                <Container>
                    <div className="flex flex-col items-center text-center py-16">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-5">
                            <Briefcase size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Career Opening Not Found
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-md">
                            The recruitment notice you are looking for does not exist or has expired.
                        </p>
                        <Button label="← Back to Careers" variant="primary" url="/careers" />
                    </div>
                </Container>
            </Section>
        );
    }

    const { basic, description, documents } = job;

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
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
                            to="/careers"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                        >
                            <ArrowLeft size={15} />
                            Back to Careers
                        </Link>
                    </div>
                </Container>
            </div>

            {/* ── Job Header ───────────────────────────────────────────────── */}
            <div className="bg-white border-b border-slate-200 py-10 md:py-12">
                <Container>
                    <div className="flex flex-wrap gap-2.5 mb-4">
                        {basic.employmentType?.name && (
                            <Badge variant="primary">{basic.employmentType.name}</Badge>
                        )}
                        {basic.vacancies && (
                            <Badge variant="secondary">{basic.vacancies} Vacancies</Badge>
                        )}
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                        {basic.title}
                    </h1>
                    {basic.summary && (
                        <p className="mt-4 text-base md:text-lg text-slate-600 max-w-4xl font-light">
                            {basic.summary}
                        </p>
                    )}
                </Container>
            </div>

            {/* ── Job Scope & Description ──────────────────────────────────── */}
            <Section className="py-8 md:py-10">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Scope description html */}
                        <div className="flex-1 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-950 border-b border-slate-100 pb-3 mb-4">
                                Role Overview & Requirements
                            </h2>
                            {description ? (
                                <div 
                                    className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm md:text-base space-y-4"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            ) : (
                                <p className="text-slate-500 italic text-sm">No detailed descriptions available for this job opening.</p>
                            )}
                        </div>

                        {/* Metadata Schedule Sidebar */}
                        <div className="w-full lg:w-80 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm shrink-0 space-y-6">
                            <div>
                                <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 mb-4">
                                    <Info size={16} className="text-blue-600" />
                                    Application Timeline
                                </h3>
                                
                                <dl className="space-y-4 text-sm">
                                    <div className="border-b border-slate-100 pb-3">
                                        <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Posted Date</dt>
                                        <dd className="mt-1 font-semibold text-slate-800 flex items-center gap-1.5">
                                            <Calendar size={13} className="text-slate-400" />
                                            {formatDate(basic.publishedAt)}
                                        </dd>
                                    </div>
                                    {basic.location && (
                                        <div className="border-b border-slate-100 pb-3">
                                            <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Job Location</dt>
                                            <dd className="mt-1 font-semibold text-slate-800 flex items-center gap-1.5">
                                                <MapPin size={13} className="text-slate-400" />
                                                {basic.location}
                                            </dd>
                                        </div>
                                    )}
                                    <div>
                                        <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Date to Apply</dt>
                                        <dd className="mt-1 font-semibold text-red-600 flex items-center gap-1.5">
                                            <Calendar size={13} className="text-red-400" />
                                            {formatDate(basic.applicationDeadline)}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* ── Advertisements & Downloads Section ────────────────────────── */}
            <Section className="bg-slate-100/60 border-t border-slate-200/60 py-8 md:py-10">
                <Container>
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <FileText size={20} className="text-blue-600" />
                        Recruitment Advertisements & Notifications
                    </h2>

                    {(!documents || documents.length === 0) ? (
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-xl mx-auto shadow-sm">
                            <p className="text-slate-500 text-sm">
                                There are no attached notification forms or advertisement brochures for this opening.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {documents.map((doc, i) => (
                                <DocumentCard key={doc.id || i} doc={doc} />
                            ))}
                        </div>
                    )}
                </Container>
            </Section>
        </motion.main>
    );
}
