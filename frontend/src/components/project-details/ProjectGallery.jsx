import React from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { getMediaPublicUrl } from "../../utils/fileHelpers";

export default function ProjectGallery({ project }) {
    if (!project) return null;

    // Use hero or thumbnail images to populate the gallery array dynamically
    const galleryImages = [
        project.basic?.heroImage?.url || project.basic?.heroImage?.path,
        project.basic?.thumbnail?.url || project.basic?.thumbnail?.path
    ].filter(Boolean);

    if (galleryImages.length === 0) return null;

    return (
        <Section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200/50">
            <Container>
                <SectionHeading title="Project Gallery" subtitle="Visual representation and site photos of the active power station." align="center" />
                
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-10">
                    {galleryImages.map((path, idx) => {
                        const url = getMediaPublicUrl(path);
                        return (
                            <div key={idx} className="group relative aspect-video bg-slate-200 rounded-3xl overflow-hidden shadow-sm border border-slate-200">
                                <img 
                                    src={url} 
                                    alt={`${project.basic?.name || "Project"} Photo ${idx + 1}`} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-end p-6">
                                    <span className="text-white text-xs font-bold uppercase tracking-wider">
                                        Site Asset Capture {idx + 1}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
