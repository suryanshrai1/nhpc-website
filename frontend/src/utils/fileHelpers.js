import { FileText, FileSpreadsheet, FileImage, FileVideo, FileCode, File } from "lucide-react";

/**
 * Format bytes to human readable size
 */
export function formatFileSize(bytes) {
    if (!bytes || isNaN(bytes)) return "0 KB";
    const kb = bytes / 1024;
    if (kb < 1024) {
        return `${kb.toFixed(1)} KB`;
    }
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
}

/**
 * Get lucide icon based on mime type or file extension
 */
export function getFileIcon(mimeType = "", extension = "") {
    const mime = mimeType.toLowerCase();
    const ext = extension.toLowerCase();

    if (mime.includes("pdf") || ext === "pdf") {
        return FileText;
    }
    
    if (
        mime.includes("excel") || 
        mime.includes("sheet") || 
        mime.includes("csv") || 
        ["xls", "xlsx", "csv"].includes(ext)
    ) {
        return FileSpreadsheet;
    }

    if (mime.includes("image/") || ["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) {
        return FileImage;
    }

    if (mime.includes("video/") || ["mp4", "webm", "mkv", "avi"].includes(ext)) {
        return FileVideo;
    }

    if (mime.includes("zip") || mime.includes("tar") || ["zip", "rar", "7z", "gz"].includes(ext)) {
        return FileCode; // Reuse code/archive-like icon style
    }

    return File;
}

/**
 * Safely converts relative/absolute storage paths into a public url
 */
export function getMediaPublicUrl(storagePath) {
    if (!storagePath) return "#";
    if (storagePath.startsWith("http") || storagePath.startsWith("//")) {
        return storagePath;
    }
    
    // Normalize path separators
    let cleanPath = storagePath.replace(/\\/g, "/");

    // Remove absolute directory structures if present
    if (cleanPath.includes("uploads/")) {
        cleanPath = cleanPath.split("uploads/").pop();
    }

    // Strip leading slash if any
    if (cleanPath.startsWith("/")) {
        cleanPath = cleanPath.slice(1);
    }

    const hasFolderPrefix = cleanPath.startsWith("images/") || 
                            cleanPath.startsWith("documents/") || 
                            cleanPath.startsWith("videos/") || 
                            cleanPath.startsWith("others/");
                            
    const relativeUrl = hasFolderPrefix ? cleanPath : `others/${cleanPath}`;
    
    // Clean base domain url
    const apiBase = import.meta.env.VITE_API_BASE_URL.replace("/api/v1", "");
    const cleanBase = apiBase.endsWith("/") ? apiBase.slice(0, -1) : apiBase;
    
    return `${cleanBase}/uploads/${relativeUrl}`;
}

