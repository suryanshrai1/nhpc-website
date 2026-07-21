import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { ArrowRight, MapPin, Zap } from "lucide-react";
import { getMediaPublicUrl } from "../../utils/fileHelpers";

// -------------------------
// Badge Colors
// -------------------------

const getTypeBadgeStyles = (type) => {
  switch (type) {
    case "Hydroelectric":
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

const getStatusBadgeStyles = (status) => {
  switch (status) {
    case "Operational":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";

    case "Under Construction":
      return "bg-orange-50 text-orange-700 border-orange-100";

    case "Approved":
      return "bg-blue-50 text-blue-700 border-blue-100";

    default:
      return "bg-slate-50 text-slate-700 border-slate-100";
  }
};

export default function ProjectCard({ project, layout = "normal" }) {
  const navigate = useNavigate();

  if (!project) return null;

  const {
    name,
    slug,
    summary,
    thumbnail,
    type,
    status,
    state,
    capacity,
    capacityUnit,
    isFeatured,
  } = project;

  const placeholders = {
    Hydroelectric: "/images/placeholders/hydro.jpeg",
    Solar: "/images/placeholders/solar.jpg",
    Wind: "/images/placeholders/wind.jpg",
    "Pumped Storage": "/images/placeholders/pumped-storage.jpg",
  };

  const rawUrl = thumbnail?.url;
  const imageUrl = rawUrl
    ? getMediaPublicUrl(rawUrl)
    : (placeholders[type] ?? "/images/placeholders/default-project.jpeg");

  const shortDesc =
    summary?.length > (layout === "large" ? 220 : 130)
      ? summary.slice(0, layout === "large" ? 220 : 130) + "..."
      : summary;

  const isLarge = layout === "large";

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
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
      onClick={() => navigate(`/projects/${slug}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/projects/${slug}`)}
      tabIndex={0}
      role="article"
      aria-label={`${name} – ${type ?? ""} project`}
      variants={cardVariants}
      whileHover={{
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(15,23,42,0.08)",
        borderColor: "rgb(226 232 240)",
      }}
      className={`group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
        isLarge ? "md:col-span-2 lg:flex-row" : ""
      }`}
    >
      {/* Image */}

      <div
        className={`relative overflow-hidden ${
          isLarge
            ? "w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto"
            : "aspect-[16/10]"
        }`}
      >
        <img
          src={imageUrl}
          alt={thumbnail?.alt || name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

        {/* Featured */}

        {isFeatured && (
          <span className="absolute right-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-900 shadow">
            Featured
          </span>
        )}

        {/* Type + Status */}

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm ${getTypeBadgeStyles(
              type
            )}`}
          >
            {type}
          </span>

          {status && (
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm ${getStatusBadgeStyles(
                status
              )}`}
            >
              {status}
            </span>
          )}
        </div>
      </div>

      {/* Content */}

      <div
        className={`flex flex-1 flex-col justify-between p-8 md:p-10 ${
          isLarge ? "lg:w-1/2" : ""
        }`}
      >
        <div>
          {/* Meta */}

          <div className="mb-4 flex flex-wrap items-center gap-5 text-sm text-slate-500">
            {state && (
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-slate-400" />
                {state}
              </span>
            )}

            {capacity && (
              <span className="flex items-center gap-1.5 font-semibold text-blue-600">
                <Zap size={15} />
                {capacity} {capacityUnit}
              </span>
            )}
          </div>

          {/* Title */}

          <h3
            className={`mb-4 font-bold leading-tight tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-600 ${
              isLarge
                ? "text-2xl md:text-3xl lg:text-4xl"
                : "text-xl md:text-2xl"
            }`}
          >
            {name}
          </h3>

          {/* Summary */}

          <p className="mb-8 leading-relaxed text-slate-500">{shortDesc}</p>
        </div>

        {/* Button */}

        <div onClick={(e) => e.stopPropagation()}>
          <Button
            url={`/projects/${slug}`}
            label="Explore Project"
            rightIcon={<ArrowRight size={16} />}
            variant="outline"
            className="w-full rounded-xl border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
          />
        </div>
      </div>
    </motion.div>
  );
}