import React, { useEffect, useState } from "react";
import { X, Search, Image as ImageIcon, Video, File, Upload, AlertCircle } from "lucide-react";
import { getMediaList } from "../../services/mediaService";
import { getMediaPublicUrl } from "../../utils/fileHelpers";
import api from "../../api/api";

export default function MediaPickerModal({ isOpen, onClose, onSelect, selectedValue, allowedTypes = [] }) {
    const [activeTab, setActiveTab] = useState("library"); // 'library' | 'upload'
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    // Upload States
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [altText, setAltText] = useState("");
    const [caption, setCaption] = useState("");

    const loadMedia = async () => {
        try {
            setLoading(true);
            const list = await getMediaList();
            setMediaItems(list ?? []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isOpen) return;
        loadMedia();
    }, [isOpen]);

    if (!isOpen) return null;

    const filtered = mediaItems.filter(item => {
        const matchesSearch = 
            item.original_name?.toLowerCase().includes(search.toLowerCase()) ||
            item.stored_name?.toLowerCase().includes(search.toLowerCase());

        if (!matchesSearch) return false;

        if (allowedTypes && allowedTypes.length > 0) {
            const mime = item.mime_type || "";
            return allowedTypes.some(type => {
                if (type === "image") return mime.startsWith("image/");
                if (type === "video") return mime.startsWith("video/");
                if (type === "pdf") return mime === "application/pdf" || item.extension === ".pdf";
                return true;
            });
        }

        return true;
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            setUploadError(null);

            const formData = new FormData();
            formData.append("file", file);
            if (altText) formData.append("alt_text", altText);
            if (caption) formData.append("caption", caption);

            const { data } = await api.post("/media/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const uploadedItem = data.data;
            if (uploadedItem) {
                onSelect(uploadedItem);
                onClose();
            }
        } catch (err) {
            console.error(err);
            setUploadError(err.response?.data?.message || err.message || "Failed to upload image.");
        } finally {
            setUploading(false);
        }
    };

    const labelClass = "text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5";
    const inputClass = "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-3xl flex flex-col h-[80vh] shadow-xl animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setActiveTab("library")}
                            className={`font-bold text-sm ${activeTab === "library" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-slate-500"}`}
                        >
                            Media Library
                        </button>
                        <button 
                            onClick={() => setActiveTab("upload")}
                            className={`font-bold text-sm ${activeTab === "upload" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-slate-500"}`}
                        >
                            Direct Upload
                        </button>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-slate-50 text-slate-500 rounded-xl transition-all">
                        <X size={18} />
                    </button>
                </div>

                {activeTab === "library" ? (
                    <>
                        {/* Search Bar */}
                        <div className="p-4 border-b border-slate-50 flex items-center gap-3 shrink-0">
                            <div className="relative flex-1">
                                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search media files by name..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Library Grid */}
                        <div className="flex-1 p-6 overflow-y-auto min-h-0 bg-slate-50">
                            {loading ? (
                                <div className="flex justify-center items-center h-48">
                                    <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-sm text-slate-500">No matching assets found in Media Library.</p>
                                </div>
                            ) : (
                                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                                    {filtered.map((item) => {
                                        const publicUrl = getMediaPublicUrl(item.storage_path);
                                        const isImage = item.mime_type?.startsWith("image/");
                                        const isVideo = item.mime_type?.startsWith("video/");
                                        const isSelected = selectedValue === item.storage_path;

                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => {
                                                    onSelect(item);
                                                    onClose();
                                                }}
                                                className={`p-3 rounded-2xl bg-white border text-left flex flex-col justify-between h-40 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                    isSelected ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200 hover:border-blue-300"
                                                }`}
                                            >
                                                <div className="relative aspect-video w-full rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center text-slate-400 mb-2 shrink-0">
                                                    {isImage && publicUrl !== "#" ? (
                                                        <img src={publicUrl} alt={item.original_name} className="w-full h-full object-cover" />
                                                    ) : isVideo ? (
                                                        <Video size={20} />
                                                    ) : (
                                                        <File size={20} />
                                                    )}
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-900 truncate w-full">
                                                    {item.original_name}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* Direct Upload Interface */
                    <div className="flex-1 p-8 overflow-y-auto bg-slate-50 flex flex-col items-center justify-center">
                        <div className="max-w-md w-full bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
                            <h4 className="font-bold text-slate-900 text-sm">Upload File to System</h4>
                            
                            {uploadError && (
                                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex gap-2 items-center">
                                    <AlertCircle size={15} />
                                    <span>{uploadError}</span>
                                </div>
                            )}

                            <div>
                                <label className={labelClass}>Alt Text</label>
                                <input
                                    type="text"
                                    placeholder="Brief accessibility description..."
                                    value={altText}
                                    onChange={(e) => setAltText(e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Caption / Label</label>
                                <input
                                    type="text"
                                    placeholder="Image description caption..."
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-6 cursor-pointer transition-all bg-slate-50 hover:bg-slate-100/50">
                                <Upload size={24} className="text-slate-400 mb-2" />
                                <span className="text-xs font-bold text-slate-600">
                                    {uploading ? "Uploading asset file..." : "Click to select a file from local system"}
                                </span>
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    onChange={handleFileUpload} 
                                    disabled={uploading} 
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
