import { motion } from "framer-motion";
import Container from "../ui/Container";
import { MapPin, Zap } from "lucide-react";
import { getMediaPublicUrl } from "../../utils/fileHelpers";

const getTypeBadgeStyles = (type) => {
  switch (type) {
    case "Hydroelectric":
      return "bg-blue-500/20 text-blue-100 border-blue-400/30";
    case "Solar":
      return "bg-amber-500/20 text-amber-100 border-amber-400/30";
    case "Wind":
      return "bg-teal-500/20 text-teal-100 border-teal-400/30";
    case "Pumped Storage":
      return "bg-indigo-500/20 text-indigo-100 border-indigo-400/30";
    default:
      return "bg-slate-500/20 text-slate-100 border-slate-400/30";
  }
};

const getStatusBadgeStyles = (status) => {
  switch (status) {
    case "Operational":
      return "bg-emerald-500/20 text-emerald-100 border-emerald-400/30";
    case "Under Construction":
      return "bg-orange-500/20 text-orange-100 border-orange-400/30";
    case "Approved":
      return "bg-blue-500/20 text-blue-100 border-blue-400/30";
    default:
      return "bg-slate-500/20 text-slate-100 border-slate-400/30";
  }
};

const ProjectHero = ({ project }) => {
  if (!project) return null;

  const {
    name,
    heroImage,
    thumbnail,
    type,
    status,
    state,
    capacity,
    capacityUnit,
  } = project;

  const placeholders = {
    Hydroelectric: "/images/placeholders/hydro.jpeg",
    Solar: "/images/placeholders/solar.jpg",
    Wind: "/images/placeholders/wind.jpg",
    "Pumped Storage": "/images/placeholders/pumped-storage.jpg",
  };

  const rawUrl = heroImage?.url || thumbnail?.url;
  const imageUrl = rawUrl
    ? getMediaPublicUrl(rawUrl)
    : (placeholders[type] || "/images/placeholders/default-project.jpeg");

  return (
    <section className="relative w-full h-[60vh] min-h-[500px] max-h-[800px] flex items-end pb-16 md:pb-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/10" />
      </div>

      {/* Content */}
      <Container className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {type && (
              <span
                className={`px-3 py-1 rounded-full border backdrop-blur-sm text-xs font-semibold uppercase tracking-wider ${getTypeBadgeStyles(
                  type
                )}`}
              >
                {type}
              </span>
            )}
            {status && (
              <span
                className={`px-3 py-1 rounded-full border backdrop-blur-sm text-xs font-semibold uppercase tracking-wider ${getStatusBadgeStyles(
                  status
                )}`}
              >
                {status}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
            {name}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-slate-200 text-sm md:text-base font-medium">
            {capacity && (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Zap size={18} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider">Installed Capacity</p>
                  <p className="text-white text-lg font-semibold">{capacity} {capacityUnit}</p>
                </div>
              </div>
            )}
            
            {capacity && state && (
              <div className="hidden sm:block w-px h-10 bg-white/20" />
            )}

            {state && (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <MapPin size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider">Location</p>
                  <p className="text-white text-lg font-semibold">{state}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ProjectHero;
