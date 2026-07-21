import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Eye, FileText, Image, Video } from "lucide-react";
import { formatFileSize, getFileIcon, getMediaPublicUrl } from "../../utils/fileHelpers";
import Badge from "../ui/Badge";

export default function MediaCard({ media }) {
    if (!media) return null;

    const { id, original_name, stored_name, mime_type, extension, size_bytes, storage_path, caption, created_at } = media;

    const [imgErr, setImgErr] = React.useState(false);
    const Icon = getFileIcon(mime_type, extension);
    const sizeStr = size_bytes ? formatFileSize(Number(size_bytes)) : "";
    const publicUrl = getMediaPublicUrl(storage_path);
    const isImage = mime_type?.startsWith("image/") && !imgErr;
    const isVideo = mime_type?.startsWith("video/");

    const formatUploadDate = (dateStr) => {
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
            aria-label={`Media file: ${original_name}. Extension: ${extension}`}
            className="flex flex-col overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group h-full"
        >
            {/* Visual Preview Frame */}
            <div className="relative aspect-[16/10] bg-slate-50 border-b border-slate-100 overflow-hidden flex items-center justify-center rounded-t-3xl">
                {isImage && publicUrl !== "#" ? (
                    <img
                        src={publicUrl}
                        alt={caption || original_name}
                        loading="lazy"
                        onError={() => setImgErr(true)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : isVideo && publicUrl !== "#" ? (
                    <div className="relative w-full h-full">
                        <video
                            src={`${publicUrl}#t=0.5`}
                            className="w-full h-full object-cover opacity-90"
                            muted
                            preload="metadata"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center text-white">
                            <Icon size={32} className="drop-shadow-md" />
                        </div>
                    </div>
                ) : (
                    <div className="text-slate-400 flex flex-col items-center gap-2">
                        <Icon size={36} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {extension || "Document"}
                        </span>
                    </div>
                )}
                {/* Media Icon overlay tag */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant={isImage ? "primary" : isVideo ? "secondary" : "default"}>
                        {isImage ? "Image" : isVideo ? "Video" : "Document"}
                    </Badge>
                </div>
            </div>

            {/* Meta details */}
            <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                    <h3 className="font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                        {original_name}
                    </h3>
                    {caption && (
                        <p className="mt-2 text-xs text-slate-500 line-clamp-2 italic">
                            "{caption}"
                        </p>
                    )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col gap-0.5 text-xs text-slate-400">
                        {created_at && (
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {formatUploadDate(created_at)}
                            </span>
                        )}
                        {sizeStr && (
                            <span className="font-medium">
                                {sizeStr} • {extension?.toUpperCase() || "FILE"}
                            </span>
                        )}
                    </div>

                    <Link
                        to={`/media/${id}`}
                        className="inline-flex h-9 px-4 items-center justify-center gap-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        aria-label={`View details of ${original_name}`}
                    >
                        View Details
                        <Eye size={13} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
