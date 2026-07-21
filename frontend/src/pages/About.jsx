import React from "react";
import useAbout from "../hooks/useAbout";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";

import AboutHero from "../components/about/AboutHero";
import Profile from "../components/about/Profile";
import VisionMission from "../components/about/VisionMission";
import CoreValues from "../components/about/CoreValues";
import HistoryTimeline from "../components/about/HistoryTimeline";
import LeadershipList from "../components/about/LeadershipList";

export default function About() {
    const { leadership, loading, error, refresh } = useAbout();

    if (error) {
        return (
            <Section className="min-h-[60vh] flex items-center justify-center bg-white">
                <Container>
                    <div className="flex flex-col items-center text-center py-16">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Failed to Load About Details
                        </h2>
                        <p className="text-slate-500 mb-8">
                            Please check your connection and try again.
                        </p>
                        <Button label="Retry" variant="primary" onClick={refresh} />
                    </div>
                </Container>
            </Section>
        );
    }

    return (
        <main>
            <AboutHero />
            <Profile />
            <VisionMission />
            <CoreValues />
            <HistoryTimeline />
            {loading ? (
                <Section className="bg-slate-50">
                    <Container>
                        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse mb-8" />
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white rounded-3xl p-6 h-80 animate-pulse border border-slate-100" />
                            ))}
                        </div>
                    </Container>
                </Section>
            ) : (
                <LeadershipList leadership={leadership} />
            )}
        </main>
    );
}