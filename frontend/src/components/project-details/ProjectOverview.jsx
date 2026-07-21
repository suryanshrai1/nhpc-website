import React from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { Zap, MapPin, CheckCircle, Activity, Box, Compass } from "lucide-react";

const ProjectOverview = ({ project }) => {
    if (!project) return null;

    const getDisplayValue = (val) => {
        if (!val) return null;
        if (typeof val === 'object') {
            return val.name || val.code || val.label || String(val);
        }
        return val;
    };

    const mainContent = project.details?.overview || project.basic?.summary || "No overview available for this project.";

    const atAGlanceItems = [
        {
            label: "Project Type",
            value: project.basic?.type,
            icon: <Box size={20} className="text-blue-500" />,
        },
        {
            label: "Status",
            value: project.basic?.status,
            icon: <Activity size={20} className="text-emerald-500" />,
        },
        {
            label: "Installed Capacity",
            value: project.basic?.capacity ? `${project.basic.capacity} ${project.basic.capacityUnit || 'MW'}` : null,
            icon: <Zap size={20} className="text-amber-500" />,
        },
        {
            label: "Location",
            value: project.basic?.state || project.basic?.location,
            icon: <MapPin size={20} className="text-red-500" />,
        },
        {
            label: "Project Name",
            value: project.basic?.name,
            icon: <Compass size={20} className="text-slate-400" />,
        }
    ].filter(item => item.value); // Filter out items with no value

    return (
        <Section className="py-16 md:py-20 bg-white">
            <Container>
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                    {/* Left Column: Project Overview */}
                    <div className="w-full lg:w-2/3">
                        <SectionHeading title="Project Overview" align="left" />

                        <div className="prose prose-lg prose-slate max-w-none text-slate-600">
                            {mainContent.split('\n').map((paragraph, index) => (
                                paragraph.trim() && (
                                    <p key={index} className="mb-6 leading-relaxed">
                                        {paragraph.trim()}
                                    </p>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Right Column: At a Glance Card */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm sticky top-24">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                At a Glance
                            </h3>

                            <ul className="space-y-6">
                                {atAGlanceItems.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                                                {item.label}
                                            </p>
                                            <p className="text-slate-900 font-medium mt-0.5">
                                                {getDisplayValue(item.value)}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    );
};

export default ProjectOverview;
