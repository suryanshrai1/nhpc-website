import { motion } from "framer-motion";
import { getMediaUrl } from "../../utils/media";
import Button from "../ui/Button";

// Helper to safely parse Strapi blocks format or text descriptions
const parseDescription = (description, maxLength = 160) => {
    if (!description) return "";
    if (typeof description === "string") {
        return description.length > maxLength ? description.slice(0, maxLength) + "..." : description;
    }
    if (Array.isArray(description)) {
        const text = description
            .map((block) => {
                if (block.type === "paragraph" && Array.isArray(block.children)) {
                    return block.children.map((child) => child.text || "").join("");
                }
                return "";
            })
            .filter(Boolean)
            .join(" ");
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }
    return "";
};

// Color mapping for project types
const getTypeBadgeStyles = (type) => {
    switch (type) {
        case "Hydro":
            return "bg-blue-50 text-blue-700 border-blue-100";
        case "Solar":
            return "bg-amber-50 text-amber-700 border-amber-100";
        case "Wind":
            return "bg-teal-50 text-teal-700 border-teal-100";
        case "Pumped Storage":
            return "bg-indigo-50 text-indigo-700 border-indigo-100";
        default:
            return "bg-slate-50 text-slate-700 border-slate-100";
    }
};

// Color mapping for project status
const getStatusBadgeStyles = (status) => {
    switch (status) {
        case "Operational":
            return "bg-emerald-50 text-emerald-700 border-emerald-100";
        case "Under Construction":
            return "bg-orange-50 text-orange-700 border-orange-100";
        case "Planned":
            return "bg-slate-100 text-slate-700 border-slate-200";
        default:
            return "bg-slate-50 text-slate-700 border-slate-100";
    }
};

export default function ProjectCard({ project, layout = "normal" }) {
    if (!project) return null;

    const {
        name,
        slug,
        type,
        state,
        district,
        description,
        heroImage,
        projectStatus,
        capacity,
        capacityUnit,
    } = project;

    const imageUrl = getMediaUrl(heroImage) || "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=1000";
    const shortDesc = parseDescription(description, layout === "large" ? 220 : 120);

    const isLarge = layout === "large";

    // Card slide-up variants
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 18,
            },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.08)",
                borderColor: "rgb(226, 232, 240)", // border-slate-200 on hover
            }}
            className={`group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm transition-all duration-300 flex flex-col ${
                isLarge ? "md:col-span-2 lg:flex-row" : ""
            }`}
        >
            {/* Image Container */}
            <div className={`relative overflow-hidden w-full ${isLarge ? "lg:w-1/2 aspect-[4/3] lg:aspect-auto" : "aspect-[16/10]"}`}>
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                
                {/* Badges positioned absolutely inside image for normal layout, or rendered inline */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {type && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-sm ${getTypeBadgeStyles(type)}`}>
                            {type}
                        </span>
                    )}
                    {projectStatus && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-sm ${getStatusBadgeStyles(projectStatus)}`}>
                            {projectStatus}
                        </span>
                    )}
                </div>
            </div>

            {/* Content Container */}
            <div className={`p-8 md:p-10 flex flex-col justify-between flex-1 ${isLarge ? "lg:w-1/2" : ""}`}>
                <div>
                    {/* Location and Capacity Metas */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        {state && (
                            <span>
                                {district ? `${district}, ` : ""}
                                {state}
                            </span>
                        )}
                        {state && capacity && <span className="w-1 h-1 bg-slate-300 rounded-full" />}
                        {capacity && (
                            <span className="text-blue-600 font-bold">
                                {capacity} {capacityUnit || "MW"}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors duration-300 mb-4 ${
                        isLarge ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"
                    }`}>
                        {name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-slate-500 font-light leading-relaxed mb-6">
                        {shortDesc}
                    </p>
                </div>

                {/* Button */}
                <div>
                    <Button
                        url={`/projects/${slug}`}
                        label="Explore Project →"
                        variant="Outline"
                        className="border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 px-6 py-2.5 text-sm font-semibold rounded-xl w-full sm:w-auto"
                    />
                </div>
            </div>
        </motion.div>
    );
}
