import React, { useState, useEffect } from "react";
import { Save, ArrowLeft, Landmark, Image as ImageIcon, MapPin, FileText, Cpu, Eye, Globe, Share2, Layers, Calendar } from "lucide-react";
import useStationEditor from "../../hooks/useStationEditor";
import MediaPickerModal from "./MediaPickerModal";

export default function StationForm({ stationId, onBack }) {
    const { station, lookups, loading, saving, error, save } = useStationEditor(stationId);

    // Active Tab state (Matching all requested tabs)
    const [activeTab, setActiveTab] = useState("general");

    // General & Specifications
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [projectTypeId, setProjectTypeId] = useState("");
    const [stateId, setStateId] = useState("");
    const [installedCapacity, setInstalledCapacity] = useState("");
    const [capacityUnitId, setCapacityUnitId] = useState("");
    const [commissionedOn, setCommissionedOn] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);
    const [displayOrder, setDisplayOrder] = useState(1);
    const [isActive, setIsActive] = useState(true);

    // Additional fields for extended tabs
    const [overview, setOverview] = useState("");
    const [technicalSpecs, setTechnicalSpecs] = useState("");
    const [generatingUnits, setGeneratingUnits] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");

    // Media States
    const [heroImage, setHeroImage] = useState("");
    const [heroMediaId, setHeroMediaId] = useState("");
    const [galleryImages, setGalleryImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [pickerField, setPickerField] = useState(null); // 'hero' | 'gallery' | 'document'

    // Populate inputs when station loads
    useEffect(() => {
        if (!station) return;
        
        setName(station.name || "");
        setSlug(station.slug || "");
        setProjectTypeId(station.project_type_id || station.projectType?.id || "");
        setStateId(station.state_id || station.state?.id || "");
        setInstalledCapacity(station.installed_capacity || "");
        setCapacityUnitId(station.capacity_unit_id || station.capacityUnit?.id || "");
        setCommissionedOn(station.commissioned_on ? station.commissioned_on.split("T")[0] : "");
        setDescription(station.description || "");
        setLatitude(station.latitude || "");
        setLongitude(station.longitude || "");
        setIsFeatured(station.is_featured || false);
        setDisplayOrder(station.display_order || 1);
        setIsActive(station.is_active ?? true);

        // Pre-populate overview / description fallback
        setOverview(station.description || "");
    }, [station]);

    const handleNameChange = (e) => {
        const val = e.target.value;
        setName(val);
        if (!stationId) {
            setSlug(
                val
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await save({
            name,
            slug,
            project_type_id: projectTypeId,
            state_id: stateId,
            installed_capacity: installedCapacity,
            capacity_unit_id: capacityUnitId,
            commissioned_on: commissionedOn || null,
            description: overview || description || null,
            latitude: latitude || undefined,
            longitude: longitude || undefined,
            is_featured: isFeatured,
            display_order: displayOrder,
            is_active: isActive
        });
        if (success) {
            onBack();
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
            </div>
        );
    }

    const labelClass = "text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5";
    const inputClass = "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

    const tabs = [
        { id: "general", label: "General", icon: Landmark },
        { id: "hero", label: "Hero Banner", icon: ImageIcon },
        { id: "overview", label: "Overview", icon: FileText },
        { id: "technical", label: "Technical Specs", icon: Layers },
        { id: "units", label: "Generating Units", icon: Cpu },
        { id: "location", label: "Location", icon: MapPin },
        { id: "gallery", label: "Gallery", icon: ImageIcon },
        { id: "documents", label: "Documents", icon: FileText },
        { id: "seo", label: "SEO Settings", icon: Globe },
        { id: "publishing", label: "Publishing", icon: Share2 }
    ];

    return (
        <div className="grid gap-6 lg:grid-cols-12 items-start">
            
            {/* Sidebar Navigation Tabs */}
            <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-xs font-extrabold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-wider mb-4"
                >
                    <ArrowLeft size={14} />
                    Back to Stations
                </button>

                <div className="space-y-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                              activeTab === tab.id
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                                : "hover:bg-slate-50 text-slate-600"
                            }`}
                          >
                            <Icon size={16} className="shrink-0" />
                            {tab.label}
                          </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Editor Panel */}
            <div className="lg:col-span-9 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        {stationId ? `Edit Power Station: ${name || "Station"}` : "Register New Power Station"}
                    </h2>
                    <p className="text-xs text-slate-500">Configure operational power station metadata and specifications.</p>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold">
                        {typeof error === "string" ? error : "An error occurred while saving."}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* General Tab */}
                    {activeTab === "general" && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Station Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={handleNameChange}
                                        className={inputClass}
                                        placeholder="e.g. Bairasiul Power Station"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>URL Slug *</label>
                                    <input
                                        type="text"
                                        required
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        className={inputClass}
                                        placeholder="bairasiul-power-station"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Project Type *</label>
                                    <select
                                        required
                                        value={projectTypeId}
                                        onChange={(e) => setProjectTypeId(e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select Type</option>
                                        {lookups?.projectTypes?.map((t) => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>State / Region *</label>
                                    <select
                                        required
                                        value={stateId}
                                        onChange={(e) => setStateId(e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select State</option>
                                        {lookups?.states?.map((st) => (
                                            <option key={st.id} value={st.id}>{st.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <label className={labelClass}>Installed Capacity *</label>
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        value={installedCapacity}
                                        onChange={(e) => setInstalledCapacity(e.target.value)}
                                        className={inputClass}
                                        placeholder="180.00"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Capacity Unit *</label>
                                    <select
                                        required
                                        value={capacityUnitId}
                                        onChange={(e) => setCapacityUnitId(e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select Unit</option>
                                        {lookups?.capacityUnits?.map((u) => (
                                            <option key={u.id} value={u.id}>{u.name} ({u.code})</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Commissioned Date</label>
                                    <input
                                        type="date"
                                        value={commissionedOn}
                                        onChange={(e) => setCommissionedOn(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hero Tab */}
                    {activeTab === "hero" && (
                        <div className="space-y-4">
                            <label className={labelClass}>Hero Banner Image</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    placeholder="No hero image selected"
                                    value={heroImage}
                                    className={`${inputClass} bg-slate-50`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setPickerField("hero")}
                                    className="px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                                >
                                    Choose
                                </button>
                            </div>
                            <p className="text-xs text-slate-400">Hero background media for public station detail page.</p>
                        </div>
                    )}

                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="space-y-4">
                            <label className={labelClass}>Station Overview & History</label>
                            <textarea
                                rows={6}
                                value={overview}
                                onChange={(e) => setOverview(e.target.value)}
                                className={inputClass}
                                placeholder="Enter detailed operational overview..."
                            />
                        </div>
                    )}

                    {/* Technical Specs Tab */}
                    {activeTab === "technical" && (
                        <div className="space-y-4">
                            <label className={labelClass}>Technical Specifications Summary</label>
                            <textarea
                                rows={6}
                                value={technicalSpecs}
                                onChange={(e) => setTechnicalSpecs(e.target.value)}
                                className={inputClass}
                                placeholder="Enter dam height, turbine type, water head, etc..."
                            />
                        </div>
                    )}

                    {/* Generating Units Tab */}
                    {activeTab === "units" && (
                        <div className="space-y-4">
                            <label className={labelClass}>Generating Units Breakdown</label>
                            <textarea
                                rows={6}
                                value={generatingUnits}
                                onChange={(e) => setGeneratingUnits(e.target.value)}
                                className={inputClass}
                                placeholder="e.g. Unit 1: 60 MW (Commissioned 1981), Unit 2: 60 MW..."
                            />
                        </div>
                    )}

                    {/* Location Tab */}
                    {activeTab === "location" && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Latitude Coordinates (Decimal)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 32.73"
                                        value={latitude}
                                        onChange={(e) => setLatitude(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Longitude Coordinates (Decimal)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 75.91"
                                        value={longitude}
                                        onChange={(e) => setLongitude(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Gallery Tab */}
                    {activeTab === "gallery" && (
                        <div className="space-y-4">
                            <label className={labelClass}>Station Gallery Assets</label>
                            <button
                                type="button"
                                onClick={() => setPickerField("gallery")}
                                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                            >
                                Add Image to Gallery
                            </button>
                            {galleryImages.length > 0 && (
                                <div className="text-xs text-slate-600">{galleryImages.length} image(s) selected</div>
                            )}
                        </div>
                    )}

                    {/* Documents Tab */}
                    {activeTab === "documents" && (
                        <div className="space-y-4">
                            <label className={labelClass}>Associated Documents & Reports</label>
                            <button
                                type="button"
                                onClick={() => setPickerField("document")}
                                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                            >
                                Attach Document (PDF)
                            </button>
                            {documents.length > 0 && (
                                <div className="text-xs text-slate-600">{documents.length} document(s) attached</div>
                            )}
                        </div>
                    )}

                    {/* SEO Settings Tab */}
                    {activeTab === "seo" && (
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Meta Title</label>
                                <input
                                    type="text"
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    className={inputClass}
                                    placeholder="SEO Title..."
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Meta Description</label>
                                <textarea
                                    rows={3}
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    className={inputClass}
                                    placeholder="SEO meta description..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Publishing Tab */}
                    {activeTab === "publishing" && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Display Order</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={displayOrder}
                                        onChange={(e) => setDisplayOrder(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-100">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                    />
                                    Mark as Featured Station
                                </label>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                    />
                                    Active in Public Listing
                                </label>
                            </div>
                        </div>
                    )}

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 text-sm font-semibold transition-all focus-visible:outline-none disabled:opacity-50"
                        >
                            <Save size={15} />
                            {saving ? "Saving Changes..." : "Save Station"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Media Picker Modal */}
            <MediaPickerModal
                isOpen={!!pickerField}
                onClose={() => setPickerField(null)}
                allowedTypes={
                    pickerField === "hero" || pickerField === "gallery" ? ["image"] : pickerField === "document" ? ["pdf"] : []
                }
                onSelect={(item) => {
                    if (pickerField === "hero") {
                        setHeroImage(item.storage_path);
                        setHeroMediaId(item.id);
                    } else if (pickerField === "gallery") {
                        setGalleryImages((prev) => [...prev, item]);
                    } else if (pickerField === "document") {
                        setDocuments((prev) => [...prev, item]);
                    }
                    setPickerField(null);
                }}
            />
        </div>
    );
}
