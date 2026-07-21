import React from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";

export default function HistoryTimeline() {
    const events = [
        {
            year: "1975",
            title: "Incorporation",
            description: "NHPC Limited incorporated as a private limited company with an authorized capital of ₹2,000 million."
        },
        {
            year: "1983",
            title: "First Power Station Commissioned",
            description: "Baira Siul Power Station (180 MW) in Himachal Pradesh commissioned, starting NHPC's generation journey."
        },
        {
            year: "2008",
            title: "Initial Public Offering (IPO)",
            description: "NHPC went public with a massive IPO, list-pricing shares on NSE and BSE to power solar/wind expansions."
        },
        {
            year: "2019",
            title: "Acquisition of Lanco Teesta Hydro",
            description: "Acquired Teesta-VI Hydroelectric project under NCLT resolution to further bolster generation capacities."
        }
    ];

    return (
        <Section className="bg-white border-t border-slate-200/60">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <span className="text-xs font-bold text-blue-600 tracking-wider uppercase block mb-2 text-center">
                        OUR JOURNEY
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-12">
                        Key Milestones
                    </h2>

                    <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 pl-6 md:pl-8 space-y-12">
                        {events.map((e, i) => (
                            <div key={i} className="relative">
                                {/* Dot indicator */}
                                <div className="absolute -left-[31px] md:-left-[39px] mt-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white" />

                                {/* Year Label Sidebar for desktop */}
                                <span className="hidden md:block absolute -left-[140px] top-1 text-base font-extrabold text-slate-900 w-24 text-right">
                                    {e.year}
                                </span>

                                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                                    <span className="block md:hidden text-sm font-extrabold text-blue-600 mb-1">
                                        {e.year}
                                    </span>
                                    <h4 className="text-base font-bold text-slate-950 mb-1">
                                        {e.title}
                                    </h4>
                                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                                        {e.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
