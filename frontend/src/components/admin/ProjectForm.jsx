import React, { useState, useEffect } from "react";
import { Save, ArrowLeft, Landmark, FileText, Image as ImageIcon, Settings, HelpCircle, MapPin } from "lucide-react";
import useProjectEditor from "../../hooks/useProjectEditor";
import MediaPickerModal from "./MediaPickerModal";

export default function ProjectForm({ projectId, onBack }) {
    const { project, lookups, loading, saving, error, save } = useProjectEditor(projectId);

    // Active Tab state
    const [activeTab, setActiveTab] = useState("general");

    // General & Metadata
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [projectTypeId, setProjectTypeId] = useState("");
    const [projectStatusId, setProjectStatusId] = useState("");
    const [stateId, setStateId] = useState("");
    const [capacity, setCapacity] = useState("");
    const [capacityUnitId, setCapacityUnitId] = useState("");
    const [summary, setSummary] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);
    const [displayOrder, setDisplayOrder] = useState(1);
    const [isActive, setIsActive] = useState(true);

    // Media
    const [thumbnailMediaId, setThumbnailMediaId] = useState("");
    const [thumbnailPath, setThumbnailPath] = useState("");
    const [heroMediaId, setHeroMediaId] = useState("");
    const [heroPath, setHeroPath] = useState("");
    const [pickerField, setPickerField] = useState(null); // 'thumbnail' | 'hero'

    // Populate inputs when project loads
    useEffect(() => {
        if (!project) return;
        
        // Mapped values or fallback direct attributes
        const info = project.basic || project;
        
        setName(info.name || "");
        setSlug(info.slug || "");
        setProjectTypeId(info.project_type_id || info.type?.id || "");
        setProjectStatusId(info.project_status_id || info.status?.id || "");
        setStateId(info.state_id || info.state?.id || "");
        setCapacity(info.capacity || "");
        setCapacityUnitId(info.capacity_unit_id || info.capacityUnitId || "");
        setSummary(info.summary || "");
        setLatitude(info.latitude || info.location?.latitude || "");
        setLongitude(info.longitude || info.location?.longitude || "");
        setIsFeatured(info.is_featured || info.isFeatured || false);
        setDisplayOrder(info.display_order || info.displayOrder || 1);
        setIsActive(info.is_active || info.isActive || true);

        // Populate media elements
        const thumb = info.thumbnail;
        if (thumb) {
            setThumbnailMediaId(thumb.id || "");
            setThumbnailPath(thumb.url || "");
        }
        const hero = info.heroImage;
        if (hero) {
            setHeroMediaId(hero.id || "");
            setHeroPath(hero.url || "");
        }
    }, [project]);

    const handleNameChange = (e) => {
        const val = e.target.value;
        setName(val);
        if (!projectId) {
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
            projectTypeId,
            projectStatusId,
            stateId,
            capacity,
            capacityUnitId,
            summary,
            latitude: latitude || undefined,
            longitude: longitude || undefined,
            isFeatured,
            displayOrder,
            isActive,
            thumbnail_media_id: thumbnailMediaId || undefined,
            hero_media_id: heroMediaId || undefined
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
        { id: "general", label: "General Specs", icon: Landmark },
        { id: "media", label: "Media Library", icon: ImageIcon },
        { id: "technical", label: "Location & Technicals", icon: MapPin }
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
                    Back to projects
                </button>

                <div className="space-y-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
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
                        {projectId ? `Edit Registry: ${name || "Project"}` : "Register New Project"}
                    </h2>
                    <p className="text-xs text-slate-500">Configure parameters for active NHPC power stations registry.</p>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {activeTab === "general" && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Project Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={handleNameChange}
                                        className={inputClass}
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
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
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
                                    <label className={labelClass}>Project Status *</label>
                                    <select
                                        required
                                        value={projectStatusId}
                                        onChange={(e) => setProjectStatusId(e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select Status</option>
                                        {lookups?.projectStatuses?.map((s) => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>State Region *</label>
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

                            <div>
                                <label className={labelClass}>Project Summary Description</label>
                                <textarea
                                    rows={4}
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-100">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                    />
                                    Mark as Featured Project
                                </label>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                    />
                                    Active in Registry
                                </label>
                            </div>
                        </div>
                    )}

                    {activeTab === "media" && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Thumbnail Image</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            readOnly
                                            placeholder="No thumbnail image chosen"
                                            value={thumbnailPath}
                                            className={`${inputClass} bg-slate-50`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setPickerField("thumbnail")}
                                            className="px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                                        >
                                            Choose
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Hero Background Image</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            readOnly
                                            placeholder="No background hero image chosen"
                                            value={heroPath}
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
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "technical" && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Installed Capacity *</label>
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        value={capacity}
                                        onChange={(e) => setCapacity(e.target.value)}
                                        className={inputClass}
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
                            </div>

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
                            {saving ? "Saving Changes..." : "Save Project"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Media Library Selection Modals */}
            <MediaPickerModal
                isOpen={pickerField === "thumbnail"}
                onClose={() => setPickerField(null)}
                selectedValue={thumbnailPath}
                onSelect={(item) => {
                    setThumbnailPath(item.storage_path);
                    setThumbnailMediaId(item.id);
                }}
            />
            <MediaPickerModal
                isOpen={pickerField === "hero"}
                onClose={() => setPickerField(null)}
                selectedValue={heroPath}
                onSelect={(item) => {
                    setHeroPath(item.storage_path);
                    setHeroMediaId(item.id);
                }}
            />
        </div>
    );
}
