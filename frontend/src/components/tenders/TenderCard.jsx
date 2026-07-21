import React from "react";
import { Link } from "react-router-dom";
import { Calendar, FileText, ArrowRight } from "lucide-react";
import Badge from "../ui/Badge";

export default function TenderCard({ tender }) {
    if (!tender) return null;

    const { title, tenderNumber, slug, summary, publishedAt, openingDate, closingDate, category, status } = tender;

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    // Helper for status colors
    const getStatusVariant = (code) => {
        switch (code?.toLowerCase()) {
            case "active":
            case "open":
                return "success";
            case "closed":
                return "danger";
            default:
                return "secondary";
        }
    };

    return (
        <div
            tabIndex={0}
            role="article"
            aria-label={`Tender: ${title}. Tender Number: ${tenderNumber}`}
            className="flex flex-col justify-between p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group"
        >
            <div>
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {category?.name && (
                        <Badge variant="primary">{category.name}</Badge>
                    )}
                    {status?.name && (
                        <Badge variant={getStatusVariant(status.code)}>{status.name}</Badge>
                    )}
                </div>

                {/* Tender ID Info */}
                <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase block mb-1">
                    Ref: {tenderNumber}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                {/* Summary */}
                {summary && (
                    <p className="mt-3 text-sm text-slate-500 line-clamp-3 leading-relaxed">
                        {summary}
                    </p>
                )}
            </div>

            {/* Footer containing key dates */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1 text-xs text-slate-400">
                    {publishedAt && (
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} />
                            Published: {formatDate(publishedAt)}
                        </span>
                    )}
                    {closingDate && (
                        <span className="flex items-center gap-1.5 font-medium text-slate-600">
                            <Calendar size={13} className="text-slate-400" />
                            Closes: <span className="text-red-600">{formatDate(closingDate)}</span>
                        </span>
                    )}
                </div>

                <Link
                    to={`/tenders/${slug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all self-start sm:self-auto group-hover:gap-2.5"
                    aria-label={`View details of Tender ${tenderNumber}`}
                >
                    View Details
                    <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
}
