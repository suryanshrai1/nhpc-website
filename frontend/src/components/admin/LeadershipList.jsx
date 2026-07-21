import React, { useState } from "react";
import { Plus, Search, Edit3, Trash2, ToggleLeft, ToggleRight, ShieldAlert } from "lucide-react";
import useLeadershipAdmin from "../../hooks/useLeadershipAdmin";
import EmptyState from "../ui/EmptyState";

export default function LeadershipList({ onEdit, onCreate }) {
    const { leaders, pagination, loading, error, page, setPage, toggleStatus, removeLeader } = useLeadershipAdmin();
    const [search, setSearch] = useState("");

    const filtered = leaders.filter((l) => 
        l.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        l.designation?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search directors, management..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={onCreate}
                    className="inline-flex h-11 px-6 items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all focus-visible:outline-none"
                >
                    <Plus size={16} />
                    Add Board Profile
                </button>
            </div>

            {filtered.length === 0 ? (
                <EmptyState
                    icon={ShieldAlert}
                    title="No profiles registered"
                    description="Get started by listing your first management or board of director profile."
                />
            ) : (
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Name</th>
                                    <th className="py-4 px-6">Designation</th>
                                    <th className="py-4 px-6">Level</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {filtered.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900">
                                            {lead.full_name || lead.fullName}
                                            <span className="block text-[10px] text-slate-400 font-medium font-mono mt-0.5">{lead.slug}</span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-500 font-medium">{lead.designation}</td>
                                        <td className="py-4 px-6 font-semibold text-slate-800">{lead.level?.name || "Director"}</td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => toggleStatus(lead.id, lead.is_active ?? lead.isActive ?? true)}
                                                className={`flex items-center gap-1 text-xs font-semibold ${
                                                    (lead.is_active ?? lead.isActive ?? true) ? "text-green-600" : "text-slate-400"
                                                }`}
                                            >
                                                {(lead.is_active ?? lead.isActive ?? true) ? (
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
                                                onClick={() => onEdit(lead.id)}
                                                className="p-2 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-xl transition-all"
                                            >
                                                <Edit3 size={15} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to delete this profile?")) {
                                                        removeLeader(lead.id);
                                                    }
                                                }}
                                                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
