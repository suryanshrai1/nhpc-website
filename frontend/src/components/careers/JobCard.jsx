import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Briefcase, ArrowRight } from "lucide-react";
import Badge from "../ui/Badge";

export default function JobCard({ job }) {
    if (!job) return null;

    const { title, slug, summary, location, vacancies, applicationDeadline, employmentType } = job;

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <div
            tabIndex={0}
            role="article"
            aria-label={`Job opening: ${title}`}
            className="flex flex-col justify-between p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group h-full"
        >
            <div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {employmentType?.name && (
                        <Badge variant="primary">{employmentType.name}</Badge>
                    )}
                    {vacancies && (
                        <Badge variant="secondary">{vacancies} Vacancies</Badge>
                    )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                {location && (
                    <span className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                        <MapPin size={12} />
                        {location}
                    </span>
                )}

                {summary && (
                    <p className="mt-3 text-sm text-slate-500 line-clamp-3 leading-relaxed">
                        {summary}
                    </p>
                )}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                {applicationDeadline && (
                    <span className="flex items-center gap-1.5 text-xs text-red-600 font-semibold">
                        <Calendar size={13} />
                        Apply by: {formatDate(applicationDeadline)}
                    </span>
                )}

                <Link
                    to={`/careers/${slug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all self-start sm:self-auto group-hover:gap-2.5"
                >
                    View Details
                    <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
}
