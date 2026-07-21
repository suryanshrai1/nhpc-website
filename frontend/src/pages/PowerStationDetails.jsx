import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Zap, MapPin, Building2, AlertCircle, Info, Landmark } from "lucide-react";
import { motion } from "framer-motion";

import usePowerStation from "../hooks/usePowerStation";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

// ─── Details Skeleton Loader ──────────────────────────────────────────────────
function PowerStationDetailsSkeleton() {
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
                            <div className="h-40 bg-slate-200 rounded-3xl" />
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

export default function PowerStationDetails() {
    const { slug } = useParams();
    const { station, loading, error } = usePowerStation(slug);

    if (loading) {
        return <PowerStationDetailsSkeleton />;
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
                            Failed to Load Power Station Details
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-md">
                            There was a problem fetching this station's information. Please try again.
                        </p>
                        <div className="flex gap-4">
                            <Button label="Retry" variant="primary" onClick={() => window.location.reload()} />
                            <Button label="← Back to Stations" variant="outline" url="/stations" />
                        </div>
                    </div>
                </Container>
            </Section>
        );
    }

    if (!station) {
        return (
            <Section className="min-h-[60vh] flex items-center justify-center bg-white">
                <Container>
                    <div className="flex flex-col items-center text-center py-16">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-5">
                            <Zap size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Power Station Not Found
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-md">
                            The station you are looking for does not exist or may have been decommissioned.
                        </p>
                        <Button label="← Back to Stations" variant="primary" url="/stations" />
                    </div>
                </Container>
            </Section>
        );
    }

    const { name, installedCapacity, latitude, longitude, state, projectType } = station;

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
                            to="/stations"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                        >
                            <ArrowLeft size={15} />
                            Back to Power Stations
                        </Link>
                    </div>
                </Container>
            </div>

            {/* ── Station Header ───────────────────────────────────────────── */}
            <div className="bg-white border-b border-slate-200 py-10 md:py-12">
                <Container>
                    <div className="flex flex-wrap gap-2.5 mb-4">
                        {projectType?.name && (
                            <Badge variant="primary">{projectType.name}</Badge>
                        )}
                        {installedCapacity && (
                            <Badge variant="secondary">{installedCapacity} MW</Badge>
                        )}
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                        {name}
                    </h1>
                </Container>
            </div>

            {/* ── Station Body ─────────────────────────────────────────────── */}
            <Section className="py-8 md:py-10">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Scope overview */}
                        <div className="flex-1 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-950 border-b border-slate-100 pb-3 mb-4">
                                    Project Overview
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                    This operational power station is an active asset in NHPC's national renewable portfolio. Dedicated to environmental preservation, it utilizes state-of-the-art power generation technologies to supply clean, reliable energy to state grids.
                                </p>
                            </div>

                            {/* Technical Specs Summary */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-950 mb-3">
                                    Technical Specifications
                                </h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <span className="text-xs text-slate-400 font-semibold block">Generation Type</span>
                                        <span className="text-sm font-bold text-slate-800 mt-0.5 block">{projectType?.name || "Renewable"}</span>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <span className="text-xs text-slate-400 font-semibold block">Installed Capacity</span>
                                        <span className="text-sm font-bold text-slate-800 mt-0.5 block">{installedCapacity} Megawatts</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metadata Details Sidebar */}
                        <div className="w-full lg:w-80 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm shrink-0 space-y-6">
                            <div>
                                <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 mb-4">
                                    <Info size={16} className="text-blue-600" />
                                    Station Details
                                </h3>
                                
                                <dl className="space-y-4 text-sm">
                                    {state?.name && (
                                        <div className="border-b border-slate-100 pb-3">
                                            <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">State Region</dt>
                                            <dd className="mt-1 font-semibold text-slate-800 flex items-center gap-1.5">
                                                <MapPin size={13} className="text-slate-400" />
                                                {state.name} ({state.code || "IN"})
                                            </dd>
                                        </div>
                                    )}
                                    <div className="border-b border-slate-100 pb-3">
                                        <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Installed Units</dt>
                                        <dd className="mt-1 font-semibold text-slate-800">
                                            Fully Commissioned &amp; Grid Connected
                                        </dd>
                                    </div>
                                    {latitude && longitude && (
                                        <div>
                                            <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Geographic Coordinates</dt>
                                            <dd className="mt-1 font-semibold text-slate-800 font-mono text-xs">
                                                Lat: {latitude} • Long: {longitude}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </motion.main>
    );
}
