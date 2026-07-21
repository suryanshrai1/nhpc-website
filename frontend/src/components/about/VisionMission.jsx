import React from "react";
import { Compass, Target, Award } from "lucide-react";
import Section from "../ui/Section";
import Container from "../ui/Container";

export default function VisionMission() {
    return (
        <Section className="bg-slate-50 border-y border-slate-200/60">
            <Container>
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Vision */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
                                <Compass size={24} />
                            </div>
                            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
                                Our Vision
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                To be a world-class premier organization in clean energy, driving sustainable growth through operational excellence, state-of-the-art technology, and community development.
                            </p>
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
                                <Target size={24} />
                            </div>
                            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
                                Our Mission
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                To construct and operate clean energy projects efficiently and economically, optimizing national resources while keeping environment and safety guidelines paramount.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
