import React, { useState, useEffect } from "react";
import { Save, ArrowLeft, Briefcase, FileText, Calendar, Globe, Share2, Layers, DollarSign, Award, Link as LinkIcon, Mail } from "lucide-react";
import useCareerEditor from "../../hooks/useCareerEditor";
import MediaPickerModal from "./MediaPickerModal";

export default function CareerForm({ careerId, onBack }) {
    const { career, lookups, loading, saving, error, save } = useCareerEditor(careerId);

    // Active tab
    const [activeTab, setActiveTab] = useState("general");

    // General
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [department, setDepartment] = useState("");
    const [location, setLocation] = useState("");
    const [employmentTypeId, setEmploymentTypeId] = useState("");

    // Job Details
    const [experienceRequired, setExperienceRequired] = useState("");
    const [qualification, setQualification] = useState("");
    const [vacancies, setVacancies] = useState(1);
    const [salaryRange, setSalaryRange] = useState("");
    const [applicationDeadline, setApplicationDeadline] = useState("");
    const [applicationLink, setApplicationLink] = useState("");
    const [contactEmail, setContactEmail] = useState("");

    // Description & Terms
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [requirements, setRequirements] = useState("");
    const [benefits, setBenefits] = useState("");

    // Documents
    const [documents, setDocuments] = useState([]);
    const [pickerField, setPickerField] = useState(null); // 'notification' | 'advertisement' | 'job_desc'

    // SEO & Publishing
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [displayOrder, setDisplayOrder] = useState(1);
    const [isActive, setIsActive] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);

    useEffect(() => {
        if (!career) return;

        setTitle(career.title || "");
        setSlug(career.slug || "");
        setEmploymentTypeId(career.employment_type_id || career.employmentType?.id || "");
        setLocation(career.location || "");
        setVacancies(career.vacancies || 1);
        setSummary(career.summary || "");
        setDescription(career.description || "");

        setApplicationDeadline(career.deadline ? career.deadline.split("T")[0] : "");

        setDisplayOrder(career.display_order || 1);
        setIsActive(career.is_active ?? true);
    }, [career]);

    const handleTitleChange = (e) => {
        const val = e.target.value;
        setTitle(val);
        if (!careerId) {
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
            title,
            slug,
            employment_type_id: employmentTypeId,
            location,
            vacancies,
            summary,
            description,
            application_deadline: applicationDeadline || null,
            display_order: displayOrder,
            is_active: isActive,
            is_featured: isFeatured
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
        { id: "general", label: "General Information", icon: Briefcase },
        { id: "details", label: "Job Details & Eligibility", icon: Award },
        { id: "description", label: "Description & Responsibilities", icon: FileText },
        { id: "documents", label: "Recruitment Documents (PDF)", icon: Layers },
        { id: "seo", label: "SEO Settings", icon: Globe },
        { id: "publishing", label: "Publishing Options", icon: Share2 }
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
                    Back to Careers
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

            {/* Form Content Panel */}
            <div className="lg:col-span-9 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        {careerId ? `Edit Job Opening: ${title}` : "Post New Recruitment Opening"}
                    </h2>
                    <p className="text-xs text-slate-500">Configure recruitment notification, requirements, application links, and eligibility.</p>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold">
                        {typeof error === "string" ? error : "Failed to save job opening."}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* General Tab */}
                    {activeTab === "general" && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Job Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={title}
                                        onChange={handleTitleChange}
                                        className={inputClass}
                                        placeholder="e.g. Trainee Engineer (Civil / Electrical)"
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
                                    <label className={labelClass}>Department / Discipline</label>
                                    <input
                                        type="text"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. Engineering & Projects"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Location / Posting *</label>
                                    <input
                                        type="text"
                                        required
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. Corporate Office, Faridabad / Pan India"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Employment Type *</label>
                                    <select
                                        required
                                        value={employmentTypeId}
                                        onChange={(e) => setEmploymentTypeId(e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select Type</option>
                                        {lookups?.employmentTypes?.map((et) => (
                                            <option key={et.id} value={et.id}>{et.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Job Details Tab */}
                    {activeTab === "details" && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <label className={labelClass}>Experience Required</label>
                                    <input
                                        type="text"
                                        value={experienceRequired}
                                        onChange={(e) => setExperienceRequired(e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. Freshers / 3+ Years"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Qualification Required</label>
                                    <input
                                        type="text"
                                        value={qualification}
                                        onChange={(e) => setQualification(e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. B.E / B.Tech in Civil Engineering"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Vacancies / Openings *</label>
                                    <input
                                        type="number"
                                        min="1"
                                        required
                                        value={vacancies}
                                        onChange={(e) => setVacancies(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Salary / Pay Scale Range</label>
                                    <input
                                        type="text"
                                        value={salaryRange}
                                        onChange={(e) => setSalaryRange(e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. E-2 Grade (₹ 50,000 - ₹ 1,60,000)"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Application Deadline</label>
                                    <input
                                        type="date"
                                        value={applicationDeadline}
                                        onChange={(e) => setApplicationDeadline(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Online Application Portal Link</label>
                                    <input
                                        type="url"
                                        value={applicationLink}
                                        onChange={(e) => setApplicationLink(e.target.value)}
                                        className={inputClass}
                                        placeholder="https://nhpcindia.com/careers/apply"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Nodal Recruitment Email</label>
                                    <input
                                        type="email"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        className={inputClass}
                                        placeholder="rectt@nhpc.nic.in"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Description Tab */}
                    {activeTab === "description" && (
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Short Summary</label>
                                <textarea
                                    rows={3}
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    className={inputClass}
                                    placeholder="Brief overview of the recruitment drive..."
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Full Job Description & Role Profile</label>
                                <textarea
                                    rows={5}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={inputClass}
                                    placeholder="Detailed job description..."
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Key Responsibilities & Duties</label>
                                <textarea
                                    rows={4}
                                    value={responsibilities}
                                    onChange={(e) => setResponsibilities(e.target.value)}
                                    className={inputClass}
                                    placeholder="Key responsibilities..."
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Eligibility Requirements & Conditions</label>
                                <textarea
                                    rows={4}
                                    value={requirements}
                                    onChange={(e) => setRequirements(e.target.value)}
                                    className={inputClass}
                                    placeholder="Age limit, reservation criteria, etc..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Documents Tab */}
                    {activeTab === "documents" && (
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() => setPickerField("notification")}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                                >
                                    + Attach Recruitment Notification (PDF)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPickerField("advertisement")}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                                >
                                    + Attach Detailed Advertisement
                                </button>
                            </div>

                            {documents.length > 0 ? (
                                <div className="space-y-2 pt-2">
                                    {documents.map((doc, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold">
                                            <span>{doc.original_name || doc.storage_path}</span>
                                            <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                                {doc.type}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-400">No recruitment documents attached yet.</p>
                            )}
                        </div>
                    )}

                    {/* SEO Tab */}
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
                                    placeholder="SEO Description..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Publishing Options Tab */}
                    {activeTab === "publishing" && (
                        <div className="space-y-4">
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

                            <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-100">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                    />
                                    Mark as Featured Job Opening
                                </label>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                    />
                                    Active in Recruitment Portal
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
                            {saving ? "Saving Changes..." : "Save Job Opening"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Media Picker Modal for PDF documents */}
            <MediaPickerModal
                isOpen={!!pickerField}
                onClose={() => setPickerField(null)}
                allowedTypes={["pdf"]}
                onSelect={(item) => {
                    setDocuments((prev) => [...prev, { ...item, type: pickerField }]);
                    setPickerField(null);
                }}
            />
        </div>
    );
}
