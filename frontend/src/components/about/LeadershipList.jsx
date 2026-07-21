import React from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function LeadershipList({ leadership }) {
    if (!leadership || leadership.length === 0) return null;

    // Group leadership by levels (e.g. Board of Directors, executive levels, CMD)
    // CMD / Chairman might be display_order 1
    // Filter level names or group
    return (
        <Section className="bg-slate-50 border-t border-slate-200/60">
            <Container>
                <SectionHeading
                    title="Our Leadership"
                    subtitle="Meet the Board of Directors and Executive Management driving NHPC's vision forward."
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {leadership.map((leader) => (
                        <div
                            key={leader.id}
                            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
                        >
                            <div>
                                {/* Photo Placeholder Frame */}
                                <div className="aspect-[4/5] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex items-center justify-center text-slate-400 mb-5 relative">
                                    <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                        NHPC Executive
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 leading-snug">
                                    {leader.fullName}
                                </h4>
                                <span className="text-xs font-semibold text-blue-600 block mt-1">
                                    {leader.designation}
                                </span>
                                {leader.qualification && (
                                    <p className="mt-3 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                        {leader.qualification}
                                    </p>
                                )}
                            </div>

                            {leader.level?.name && (
                                <div className="mt-6 pt-4 border-t border-slate-100">
                                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                        {leader.level.name}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
