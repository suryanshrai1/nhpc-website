import React from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";

export default function Profile() {
    return (
        <Section className="bg-white">
            <Container>
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                        <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                            CORPORATE PROFILE
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                            NHPC at a Glance
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            NHPC Limited (formerly National Hydroelectric Power Corporation) was incorporated in 1975 under the Companies Act, 1956, with an objective to plan, promote, and organize an integrated and efficient development of hydroelectric power. 
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Over the years, NHPC has expanded its objects to include development of power in all segments including Solar, Wind, Pumped Storage, and Tidal energy, both in India and abroad. NHPC is a Miniratna Category-I Enterprise under the Ministry of Power, Government of India.
                        </p>
                    </div>
                    <div className="flex-1 w-full max-w-lg aspect-[4/3] rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center p-6 text-slate-400">
                        <div className="text-center space-y-2">
                            <span className="text-sm font-semibold tracking-wider text-slate-500 uppercase">Corporate Headquarters</span>
                            <p className="text-xs text-slate-400">Faridabad, Haryana, India</p>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
