import React, { useState } from "react";
import { Plus, Search, Edit3, Trash2, ToggleLeft, ToggleRight, FileText, Download, Calendar, Filter } from "lucide-react";
import useInvestorsAdmin from "../../hooks/useInvestorsAdmin";
import { getMediaPublicUrl } from "../../utils/fileHelpers";
import EmptyState from "../ui/EmptyState";

export default function InvestorList({ onEdit, onCreate }) {
    const { documents, pagination, loading, error, page, setPage, toggleStatus, removeDocument } = useInvestorsAdmin();
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const filtered = documents.filter((doc) => {
        const matchesSearch = 
            doc.title?.toLowerCase().includes(search.toLowerCase()) ||
            doc.type?.name?.toLowerCase().includes(search.toLowerCase()) ||
            doc.financialYear?.label?.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = selectedCategory ? doc.type?.code === selectedCategory : true;

        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="flex flex-1 items-center gap-3 max-w-2xl">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search investor documents by title or financial year..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Categories</option>
                        <option value="annual-report">Annual Reports</option>
                        <option value="quarterly-result">Quarterly Results</option>
                        <option value="financial-statement">Financial Statements</option>
                        <option value="corporate-governance">Corporate Governance</option>
                        <option value="shareholding-pattern">Shareholding Pattern</option>
                    </select>
                </div>

                <button
                    onClick={onCreate}
                    className="inline-flex h-11 px-6 items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                    <Plus size={16} />
                    Upload Investor Document
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold">
                    Failed to load investor relations documents registry.
                </div>
            )}

            {/* List Table */}
            {filtered.length === 0 ? (
                <EmptyState
                    icon={FileText}
                    title="No investor documents published"
                    description="Get started by uploading your first financial report or corporate filing."
                />
            ) : (
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Document Title</th>
                                    <th className="py-4 px-6">Category</th>
                                    <th className="py-4 px-6">Financial Year</th>
                                    <th className="py-4 px-6">Published Date</th>
                                    <th className="py-4 px-6">Download</th>
                                    <th className="py-4 px-6">CMS Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {filtered.map((doc) => {
                                    const fileUrl = doc.file?.url ? getMediaPublicUrl(doc.file.url) : null;
                                    return (
                                        <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-6 font-bold text-slate-900">
                                                {doc.title}
                                            </td>
                                            <td className="py-4 px-6 text-slate-600 font-medium">
                                                <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                                                    {doc.type?.name ?? "—"}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-slate-700 font-semibold">{doc.financialYear?.label ?? "—"}</td>
                                            <td className="py-4 px-6 text-slate-600 font-medium text-xs">
                                                {doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString() : "—"}
                                            </td>
                                            <td className="py-4 px-6">
                                                {fileUrl ? (
                                                    <a
                                                        href={fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                                                    >
                                                        <Download size={14} /> PDF
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-400 text-xs">—</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => toggleStatus(doc.id, doc.is_active ?? doc.isActive ?? true)}
                                                    className={`flex items-center gap-1 text-xs font-semibold ${
                                                        (doc.is_active ?? doc.isActive ?? true) ? "text-green-600" : "text-slate-400"
                                                    }`}
                                                >
                                                    {(doc.is_active ?? doc.isActive ?? true) ? (
                                                        <>
                                                            <ToggleRight size={20} />
                                                            Active
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ToggleLeft size={20} />
                                                            Inactive
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2">
                                                <button
                                                    onClick={() => onEdit(doc.id)}
                                                    className="p-2 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-xl transition-all"
                                                    title="Edit Document"
                                                >
                                                    <Edit3 size={15} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm("Are you sure you want to delete this investor document?")) {
                                                            removeDocument(doc.id);
                                                        }
                                                    }}
                                                    className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"
                                                    title="Delete Document"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
