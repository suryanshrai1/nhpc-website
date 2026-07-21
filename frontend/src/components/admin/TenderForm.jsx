import React, { useState, useEffect } from "react";
import { Save, ArrowLeft, FileText, Calendar, DollarSign, CheckSquare, Globe, Share2, Layers } from "lucide-react";
import useTenderEditor from "../../hooks/useTenderEditor";
import MediaPickerModal from "./MediaPickerModal";

export default function TenderForm({ tenderId, onBack }) {
    const { tender, lookups, loading, saving, error, save } = useTenderEditor(tenderId);

    // Tab state
    const [activeTab, setActiveTab] = useState("general");

    // General
    const [title, setTitle] = useState("");
    const [tenderNumber, setTenderNumber] = useState("");
    const [slug, setSlug] = useState("");
    const [tenderCategoryId, setTenderCategoryId] = useState("");
    const [tenderStatusId, setTenderStatusId] = useState("");
    const [issuingDepartment, setIssuingDepartment] = useState("");
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");

    // Details & Financials
    const [estimatedCost, setEstimatedCost] = useState("");
    const [emdAmount, setEmdAmount] = useState("");
    const [bidValidityDays, setBidValidityDays] = useState("");
    const [contactOfficer, setContactOfficer] = useState("");

    // Eligibility & Terms
    const [eligibilityCriteria, setEligibilityCriteria] = useState("");

    // Important Dates
    const [publishedAt, setPublishedAt] = useState("");
    const [openingDate, setOpeningDate] = useState("");
    const [closingDate, setClosingDate] = useState("");
    const [preBidMeetingDate, setPreBidMeetingDate] = useState("");

    // Media & Documents
    const [documents, setDocuments] = useState([]);
    const [pickerField, setPickerField] = useState(null); // 'tender_doc' | 'corrigendum' | 'notice' | 'addendum'

    // SEO & Publishing
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [displayOrder, setDisplayOrder] = useState(1);
    const [isActive, setIsActive] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);

    useEffect(() => {
        if (!tender) return;

        setTitle(tender.title || "");
        setTenderNumber(tender.tender_number || "");
        setSlug(tender.slug || "");
        setTenderCategoryId(tender.tender_category_id || tender.category?.id || "");
        setTenderStatusId(tender.tender_status_id || tender.status?.id || "");
        setSummary(tender.summary || "");
        setDescription(tender.description || "");

        setPublishedAt(tender.published_at ? tender.published_at.split("T")[0] : "");
        setOpeningDate(tender.opening_date ? tender.opening_date.split("T")[0] : "");
        setClosingDate(tender.closing_date ? tender.closing_date.split("T")[0] : "");

        setDisplayOrder(tender.display_order || 1);
        setIsActive(tender.is_active ?? true);
    }, [tender]);

    const handleTitleChange = (e) => {
        const val = e.target.value;
        setTitle(val);
        if (!tenderId) {
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
            tender_number: tenderNumber,
            slug,
            tender_category_id: tenderCategoryId,
            tender_status_id: tenderStatusId,
            summary,
            description,
            published_at: publishedAt || null,
            opening_date: openingDate || null,
            closing_date: closingDate || null,
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
        { id: "general", label: "General Information", icon: FileText },
        { id: "details", label: "Financials & Details", icon: DollarSign },
        { id: "documents", label: "Tender Documents (PDF)", icon: Layers },
        { id: "eligibility", label: "Eligibility & Terms", icon: CheckSquare },
        { id: "dates", label: "Important Dates", icon: Calendar },
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
                    Back to Tenders
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
                        {tenderId ? `Edit Tender Notice: ${tenderNumber || title}` : "Issue New Tender Procurement Notice"}
                    </h2>
                    <p className="text-xs text-slate-500">Configure public tender notification, terms, deadlines, and documents.</p>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold">
                        {typeof error === "string" ? error : "Failed to save tender record."}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* General Tab */}
                    {activeTab === "general" && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Tender Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={title}
                                        onChange={handleTitleChange}
                                        className={inputClass}
                                        placeholder="e.g. Renovation & Modernization of Bairasiul Power Station"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Tender / NIT Number *</label>
                                    <input
                                        type="text"
                                        required
                                        value={tenderNumber}
                                        onChange={(e) => setTenderNumber(e.target.value)}
                                        className={inputClass}
                                        placeholder="NHPC/CC/CONTRACTS/2026/04"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
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
                                <div>
                                    <label className={labelClass}>Tender Category *</label>
                                    <select
                                        required
                                        value={tenderCategoryId}
                                        onChange={(e) => setTenderCategoryId(e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select Category</option>
                                        {lookups?.tenderCategories?.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Tender Status *</label>
                                    <select
                                        required
                                        value={tenderStatusId}
                                        onChange={(e) => setTenderStatusId(e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select Status</option>
                                        {lookups?.tenderStatuses?.map((s) => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Issuing Department / Wing</label>
                                <input
                                    type="text"
                                    value={issuingDepartment}
                                    onChange={(e) => setIssuingDepartment(e.target.value)}
                                    className={inputClass}
                                    placeholder="e.g. Corporate Contracts & Procurement Division"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Short Summary</label>
                                <textarea
                                    rows={3}
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    className={inputClass}
                                    placeholder="Brief summary of tender scope..."
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Full Description & Scope of Work</label>
                                <textarea
                                    rows={5}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={inputClass}
                                    placeholder="Detailed tender description..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Financials & Details Tab */}
                    {activeTab === "details" && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Estimated Cost (INR / Lakhs)</label>
                                    <input
                                        type="text"
                                        value={estimatedCost}
                                        onChange={(e) => setEstimatedCost(e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. ₹ 45,00,00,000"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Earnest Money Deposit (EMD / Bank Guarantee)</label>
                                    <input
                                        type="text"
                                        value={emdAmount}
                                        onChange={(e) => setEmdAmount(e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. ₹ 10,00,000"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Bid Validity Period (Days)</label>
                                    <input
                                        type="text"
                                        value={bidValidityDays}
                                        onChange={(e) => setBidValidityDays(e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. 120 Days"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Contact Nodal Officer</label>
                                    <input
                                        type="text"
                                        value={contactOfficer}
                                        onChange={(e) => setContactOfficer(e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. General Manager (Contracts), tender@nhpc.nic.in"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Documents Tab */}
                    {activeTab === "documents" && (
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() => setPickerField("tender_doc")}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                                >
                                    + Attach Tender Document (PDF)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPickerField("corrigendum")}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                                >
                                    + Attach Corrigendum
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPickerField("notice")}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                                >
                                    + Attach Notice / Addendum
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
                                <p className="text-xs text-slate-400">No PDF tender documents attached yet.</p>
                            )}
                        </div>
                    )}

                    {/* Eligibility & Terms Tab */}
                    {activeTab === "eligibility" && (
                        <div className="space-y-4">
                            <label className={labelClass}>Technical & Financial Eligibility Criteria</label>
                            <textarea
                                rows={6}
                                value={eligibilityCriteria}
                                onChange={(e) => setEligibilityCriteria(e.target.value)}
                                className={inputClass}
                                placeholder="Detail bidder turnover requirements, technical experience, joint venture conditions..."
                            />
                        </div>
                    )}

                    {/* Important Dates Tab */}
                    {activeTab === "dates" && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Publication Date</label>
                                    <input
                                        type="date"
                                        value={publishedAt}
                                        onChange={(e) => setPublishedAt(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Bid Submission Deadline</label>
                                    <input
                                        type="date"
                                        value={closingDate}
                                        onChange={(e) => setClosingDate(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Technical Bid Opening Date</label>
                                    <input
                                        type="date"
                                        value={openingDate}
                                        onChange={(e) => setOpeningDate(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Pre-Bid Meeting Date</label>
                                    <input
                                        type="date"
                                        value={preBidMeetingDate}
                                        onChange={(e) => setPreBidMeetingDate(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
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
                                    Mark as Featured Tender Notice
                                </label>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                    />
                                    Active in Public Registry
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
                            {saving ? "Saving Changes..." : "Save Tender Notice"}
                        </button>
                    </div>
                </form>
            </div>

            {/* PDF Media Picker Modal */}
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
