import React from "react";
import { ShieldCheck, Heart, Users, RefreshCw } from "lucide-react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function CoreValues() {
    const values = [
        {
            title: "Integrity",
            description: "Adhering to high ethical and moral principles in all corporate and personal decisions.",
            icon: ShieldCheck
        },
        {
            title: "Care",
            description: "Fostering environmental preservation and providing welfare to regional communities.",
            icon: Heart
        },
        {
            title: "Commitment",
            description: "Executing Clean Energy power operations safely and within projected deadlines.",
            icon: Users
        },
        {
            title: "Sustainability",
            description: "Developing renewable assets that preserve resources for future generations.",
            icon: RefreshCw
        }
    ];

    return (
        <Section className="bg-white">
            <Container>
                <SectionHeading
                    title="Our Core Values"
                    subtitle="The guiding principles behind our corporate actions and team culture."
                />
                
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {values.map((v, i) => {
                        const Icon = v.icon;
                        return (
                            <div key={i} className="flex flex-col p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4 shrink-0">
                                    <Icon size={20} />
                                </div>
                                <h4 className="font-bold text-slate-900 text-base mb-2">{v.title}</h4>
                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{v.description}</p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
