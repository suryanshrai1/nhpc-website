import React, { useState } from "react";
import { Search, Grid, List, Image as ImageIcon, Video, File, Trash2, Download, Copy, Link as LinkIcon, Info, Upload } from "lucide-react";
import useMediaAdmin from "../hooks/useMediaAdmin";
import { getMediaPublicUrl } from "../utils/fileHelpers";
import EmptyState from "../components/ui/EmptyState";

export default function MediaCMS() {
  const {
    mediaItems,
    loading,
    uploading,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    uploadFile,
    removeFile
  } = useMediaAdmin();

  const [selectedItem, setSelectedItem] = useState(null);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadFile(file, { alt_text: altText, caption });
      setAltText("");
      setCaption("");
    } catch (err) {
      alert(err.message || "Failed to upload file.");
    }
  };

  const handleCopyUrl = (path) => {
    const url = getMediaPublicUrl(path);
    const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    alert("Public asset URL copied to clipboard!");
  };

  const filtered = mediaItems.filter((item) => {
    const matchesSearch = item.original_name?.toLowerCase().includes(search.toLowerCase()) || item.stored_name?.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" 
      || (typeFilter === "image" && item.mime_type?.startsWith("image/"))
      || (typeFilter === "video" && item.mime_type?.startsWith("video/"))
      || (typeFilter === "pdf" && item.extension?.toLowerCase() === "pdf");
    return matchesSearch && matchesType;
  });

  const labelClass = "text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1";
  const inputClass = "w-full border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="grid gap-6 lg:grid-cols-12 items-start max-w-7xl mx-auto">
      
      {/* Main Files Grid Panel */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 flex-1 min-w-[240px]">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search digital assets library..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-none focus:outline-none text-sm text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex gap-2 shrink-0">
            {["all", "image", "video", "pdf"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  typeFilter === t
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Container */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Upload New Asset</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Alt Text</label>
              <input
                type="text"
                placeholder="Accessibility description..."
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Caption</label>
              <input
                type="text"
                placeholder="Visual label display..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-8 cursor-pointer transition-all bg-slate-50 hover:bg-slate-100/50">
            <Upload size={24} className="text-slate-400 mb-2" />
            <span className="text-xs font-bold text-slate-600">
              {uploading ? "Uploading asset to storage..." : "Drag & drop file or click to select"}
            </span>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload} 
              disabled={uploading} 
            />
          </label>
        </div>

        {/* Grid List */}
        {loading ? (
          <div className="flex justify-center items-center h-48 bg-white border border-slate-200 rounded-3xl">
            <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={ImageIcon}
            title="No digital assets found"
            description="Upload images, site videos, or PDF tender documentation files to the system storage."
          />
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {filtered.map((item) => {
              const publicUrl = getMediaPublicUrl(item.storage_path);
              const isImage = item.mime_type?.startsWith("image/");
              const isVideo = item.mime_type?.startsWith("video/");

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3 rounded-2xl bg-white border cursor-pointer text-left flex flex-col justify-between h-40 transition-all ${
                    selectedItem?.id === item.id 
                      ? "border-blue-500 ring-2 ring-blue-100" 
                      : "border-slate-200 hover:border-blue-300"
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
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* RIGHT: Detail Metadata Panel */}
      <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-5 sticky top-24">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
          <Info size={16} className="text-blue-600" />
          Asset Metadata
        </h3>

        {selectedItem ? (
          <div className="space-y-4 text-xs">
            <div className="relative aspect-video bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center text-slate-400">
              {selectedItem.mime_type?.startsWith("image/") && getMediaPublicUrl(selectedItem.storage_path) !== "#" ? (
                <img src={getMediaPublicUrl(selectedItem.storage_path)} alt={selectedItem.original_name} className="w-full h-full object-cover" />
              ) : selectedItem.mime_type?.startsWith("video/") ? (
                <Video size={28} />
              ) : (
                <File size={28} />
              )}
            </div>

            <div className="space-y-2.5">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Filename</span>
                <span className="font-semibold text-slate-800 break-all">{selectedItem.original_name}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Media ID</span>
                <span className="font-semibold text-slate-800 font-mono">{String(selectedItem.id)}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Mime Type</span>
                <span className="font-semibold text-slate-800">{selectedItem.mime_type}</span>
              </div>
              {selectedItem.size_bytes && (
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-0.5">File Size</span>
                  <span className="font-semibold text-slate-800">{(Number(selectedItem.size_bytes) / 1024).toFixed(1)} KB</span>
                </div>
              )}
            </div>

            <div className="grid gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleCopyUrl(selectedItem.storage_path)}
                className="flex items-center justify-center gap-1.5 h-9 rounded-xl border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 bg-white font-bold transition-all"
              >
                <LinkIcon size={13} />
                Copy Public URL
              </button>
              <button
                onClick={async () => {
                  if (window.confirm("Are you sure you want to delete this asset from storage?")) {
                    await removeFile(selectedItem.id);
                    setSelectedItem(null);
                  }
                }}
                className="flex items-center justify-center gap-1.5 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold transition-all"
              >
                <Trash2 size={13} />
                Delete Asset
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 text-center py-12">
            Select an asset file from the library grid to view its metadata parameters and download actions.
          </p>
        )}
      </div>

    </div>
  );
}
