import React, { useState, useEffect } from "react";
import { Save, ArrowLeft, FileText, Calendar, Globe, Share2, Layers, Tag, Upload } from "lucide-react";
import useInvestorEditor from "../../hooks/useInvestorEditor";
import MediaPickerModal from "./MediaPickerModal";

export default function InvestorForm({ documentId, onBack }) {
    const { document, lookups, loading, saving, error, save } = useInvestorEditor(documentId);

    // Active Tab
    const [activeTab, setActiveTab] = useState("general");

    // General & Metadata
    const [title, setTitle] = useState("");
    const [investorDocumentTypeId, setInvestorDocumentTypeId] = useState("");
    const [financialYearId, setFinancialYearId] = useState("");
    const [description, setDescription] = useState("");

    // Document File
    const [mediaFileId, setMediaFileId] = useState("");
    const [filePath, setFilePath] = useState("");
    const [pickerOpen, setPickerOpen] = useState(false);

    // Classification & Dates
    const [publishedAt, setPublishedAt] = useState("");
    const [effectiveDate, setEffectiveDate] = useState("");
    const [quarter, setQuarter] = useState("");

    // SEO & Publishing
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    const [displayOrder, setDisplayOrder] = useState(1);
    const [isActive, setIsActive] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isDownloadable, setIsDownloadable] = useState(true);

    useEffect(() => {
        if (!document) return;

        // Backend mapped document structure
        const info = document.basic || document;

        setTitle(info.title || "");
        setInvestorDocumentTypeId(info.investor_document_type_id || info.type?.id || "");
        setFinancialYearId(info.financial_year_id || info.financialYear?.id || "");
        setDescription(info.description || "");
        
        setPublishedAt(info.publishedAt ? info.publishedAt.split("T")[0] : info.published_at ? info.published_at.split("T")[0] : "");
        setDisplayOrder(info.display_order || info.displayOrder || 1);
        setIsActive(info.is_active ?? info.isActive ?? true);

        if (info.file) {
            setMediaFileId(info.file.id || "");
            setFilePath(info.file.url || info.file.path || "");
        }
    }, [document]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await save({
            title,
            investor_document_type_id: investorDocumentTypeId,
            financial_year_id: financialYearId || undefined,
            description,
            media_file_id: mediaFileId,
            published_at: publishedAt || undefined,
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
        { id: "general", label: "General & Classification", icon: Tag },
        { id: "document", label: "PDF Attachment", icon: Layers },
        { id: "classification", label: "Dates & Year", icon: Calendar },
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
                    Back to Investor Documents
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
                        {documentId ? `Edit Investor Document: ${title}` : "Upload New Investor Document"}
                    </h2>
                    <p className="text-xs text-slate-500">Configure financial report metadata, category, attached PDF, and publication year.</p>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold">
                        {typeof error === "string" ? error : "Failed to save investor document."}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* General Tab */}
                    {activeTab === "general" && (
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Document Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={inputClass}
                                    placeholder="e.g. Annual Report 2025-26"
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>Category / Document Type *</label>
                                    <select
                                        required
                                        value={investorDocumentTypeId}
                                        onChange={(e) => setInvestorDocumentTypeId(e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select Category</option>
                                        {lookups?.investorDocumentTypes?.map((dt) => (
                                            <option key={dt.id} value={dt.id}>{dt.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Financial Year</label>
                                    <select
                                        value={financialYearId}
                                        onChange={(e) => setFinancialYearId(e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select Financial Year</option>
                                        {lookups?.financialYears?.map((fy) => (
                                            <option key={fy.id} value={fy.id}>{fy.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Description & Notes</label>
                                <textarea
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={inputClass}
                                    placeholder="Brief overview or highlights of this report..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Document Tab */}
                    {activeTab === "document" && (
                        <div className="space-y-4">
                            <label className={labelClass}>Attached PDF File *</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    required
                                    placeholder="No PDF file selected..."
                                    value={filePath}
                                    className={`${inputClass} bg-slate-50`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setPickerOpen(true)}
                                    className="px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shrink-0"
                                >
                                    Choose PDF
                                </button>
                            </div>
                            <p className="text-xs text-slate-400">Select an existing PDF file from the Media Library or upload a new one directly.</p>
                        </div>
                    )}

                    {/* Classification & Dates Tab */}
                    {activeTab === "classification" && (
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
                                    <label className={labelClass}>Quarter (Optional)</label>
                                    <select
                                        value={quarter}
                                        onChange={(e) => setQuarter(e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Full Year / N/A</option>
                                        <option value="Q1">Q1 (April - June)</option>
                                        <option value="Q2">Q2 (July - September)</option>
                                        <option value="Q3">Q3 (October - December)</option>
                                        <option value="Q4">Q4 (January - March)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SEO Tab */}
                    {activeTab === "seo" && (
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Meta Title</label>
                                <input
                                    type="text"
                                    value={seoTitle}
                                    onChange={(e) => setSeoTitle(e.target.value)}
                                    className={inputClass}
                                    placeholder="SEO Title..."
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Meta Description</label>
                                <textarea
                                    rows={3}
                                    value={seoDescription}
                                    onChange={(e) => setSeoDescription(e.target.value)}
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
                                    Mark as Featured Report
                                </label>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                    />
                                    Active in Public Portal
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
                            {saving ? "Saving Changes..." : "Save Investor Document"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Media Picker Modal for PDF attachment */}
            <MediaPickerModal
                isOpen={pickerOpen}
                onClose={() => setPickerOpen(false)}
                allowedTypes={["pdf"]}
                onSelect={(item) => {
                    setMediaFileId(item.id);
                    setFilePath(item.storage_path || item.original_name);
                    setPickerOpen(false);
                }}
            />
        </div>
    );
}
