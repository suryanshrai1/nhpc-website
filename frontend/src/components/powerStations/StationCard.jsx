import React from "react";
import { Link } from "react-router-dom";
import { Zap, MapPin, Eye } from "lucide-react";
import Badge from "../ui/Badge";

export default function StationCard({ station }) {
    if (!station) return null;

    const { name, slug, installedCapacity, state, projectType } = station;

    return (
        <div
            tabIndex={0}
            role="article"
            aria-label={`Power station: ${name}`}
            className="flex flex-col justify-between overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group h-full"
        >
            {/* Visual Thumbnail */}
            <div className="relative aspect-[16/10] bg-slate-50 border-b border-slate-100 flex items-center justify-center rounded-t-3xl">
                <div className="text-slate-400 flex flex-col items-center gap-2">
                    <Zap size={36} className="text-blue-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {projectType?.name || "Power Station"}
                    </span>
                </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                    <h3 className="font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                        {name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {state?.name && (
                            <Badge variant="outline">
                                <span className="flex items-center gap-1">
                                    <MapPin size={10} />
                                    {state.name}
                                </span>
                            </Badge>
                        )}
                        {installedCapacity && (
                            <Badge variant="secondary">
                                {installedCapacity} MW
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">
                        Operational Status: Active
                    </span>

                    <Link
                        to={`/stations/${slug}`}
                        className="inline-flex h-9 px-4 items-center justify-center gap-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        aria-label={`View details of ${name}`}
                    >
                        View Details
                        <Eye size={13} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
