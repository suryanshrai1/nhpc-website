import React, { useState, useEffect } from "react";
import { Save, ArrowLeft } from "lucide-react";
import useLeaderEditor from "../../hooks/useLeaderEditor";

export default function LeadershipForm({ leaderId, onBack }) {
    const { leader, lookups, loading, saving, error, save } = useLeaderEditor(leaderId);

    const [fullName, setFullName] = useState("");
    const [slug, setSlug] = useState("");
    const [designation, setDesignation] = useState("");
    const [qualification, setQualification] = useState("");
    const [experienceSummary, setExperienceSummary] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [leadershipLevelId, setLeadershipLevelId] = useState("");
    const [displayOrder, setDisplayOrder] = useState(1);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!leader) return;
        setFullName(leader.full_name || leader.fullName || "");
        setSlug(leader.slug || "");
        setDesignation(leader.designation || "");
        setQualification(leader.qualification || "");
        setExperienceSummary(leader.experience_summary || leader.experienceSummary || "");
        setDescription(leader.description || "");
        setEmail(leader.email || "");
        setPhone(leader.phone || "");
        setLeadershipLevelId(leader.leadership_level_id || leader.level?.id || "");
        setDisplayOrder(leader.display_order || leader.displayOrder || 1);
        setIsActive(leader.is_active ?? leader.isActive ?? true);
    }, [leader]);

    const handleNameChange = (e) => {
        const val = e.target.value;
        setFullName(val);
        if (!leaderId) {
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
            full_name: fullName,
            slug,
            designation,
            qualification,
            experience_summary: experienceSummary,
            description,
            email,
            phone,
            leadership_level_id: leadershipLevelId,
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

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button type="button" onClick={onBack} className="p-2 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-xl">
                        <ArrowLeft size={16} />
                    </button>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">{leaderId ? "Edit Leader Profile" : "Add Board Profile"}</h2>
                        <p className="text-xs text-slate-500">Configure parameters for active NHPC leadership portfolio.</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>Full Name *</label>
                        <input
                            type="text"
                            required
                            value={fullName}
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

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>Designation *</label>
                        <input
                            type="text"
                            required
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Board Level *</label>
                        <select
                            required
                            value={leadershipLevelId}
                            onChange={(e) => setLeadershipLevelId(e.target.value)}
                            className={inputClass}
                        >
                            <option value="">Select Level</option>
                            {lookups?.leadershipLevels?.map((level) => (
                                <option key={level.id} value={level.id}>{level.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Phone Number</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={inputClass}
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Qualification</label>
                    <input
                        type="text"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Experience Summary</label>
                    <textarea
                        rows={3}
                        value={experienceSummary}
                        onChange={(e) => setExperienceSummary(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Profile Overview Description</label>
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-100">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                        Active Profile
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all focus-visible:outline-none disabled:opacity-50 mt-6"
                >
                    <Save size={15} />
                    {saving ? "Saving Profile..." : "Save Profile"}
                </button>
            </form>
        </div>
    );
}
