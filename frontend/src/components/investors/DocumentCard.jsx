import React from "react";
import { Download, Calendar, FileDown } from "lucide-react";
import { formatFileSize, getFileIcon, getMediaPublicUrl } from "../../utils/fileHelpers";
import Badge from "../ui/Badge";

export default function DocumentCard({ doc }) {
    if (!doc) return null;

    const { title, description, publishedAt, type, financialYear, file } = doc;
    const Icon = getFileIcon(file?.mimeType, file?.extension);
    const sizeStr = file?.size ? formatFileSize(file.size) : "";
    const publishedDate = publishedAt ? new Date(publishedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) : "";

    const fileUrl = getMediaPublicUrl(file?.path);

    return (
        <div
            tabIndex={0}
            role="article"
            aria-label={`Document: ${title}. Published on ${publishedDate}`}
            className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group"
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (fileUrl !== "#") window.open(fileUrl, "_blank", "noopener,noreferrer");
                }
            }}
        >
            <div>
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {type?.name && (
                        <Badge variant="primary">{type.name}</Badge>
                    )}
                    {financialYear?.label && (
                        <Badge variant="secondary">{financialYear.label}</Badge>
                    )}
                </div>

                {/* File Icon & Title */}
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <Icon size={20} />
                    </div>
                    <h3 className="font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                </div>

                {/* Description */}
                {description && (
                    <p className="mt-3 text-sm text-slate-500 line-clamp-3 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {/* Footer / Meta & CTA */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    {publishedDate && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar size={12} />
                            {publishedDate}
                        </span>
                    )}
                    {sizeStr && (
                        <span className="text-xs font-medium text-slate-400">
                            {sizeStr} • {file?.extension?.toUpperCase() || "FILE"}
                        </span>
                    )}
                </div>

                {fileUrl !== "#" ? (
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={-1} // Avoid redundant tab stops on anchor within accessible card
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-200"
                        title="Download / Open file"
                    >
                        <Download size={15} />
                    </a>
                ) : (
                    <span className="text-xs text-slate-400 italic">No File</span>
                )}
            </div>
        </div>
    );
}
