import React, { useState } from "react";
import { Plus, Search, Edit3, Trash2, ToggleLeft, ToggleRight, Briefcase, Calendar, MapPin, Users } from "lucide-react";
import useCareersAdmin from "../../hooks/useCareersAdmin";
import EmptyState from "../ui/EmptyState";

export default function CareerList({ onEdit, onCreate }) {
    const { careers, pagination, loading, error, page, setPage, toggleStatus, removeCareer } = useCareersAdmin();
    const [search, setSearch] = useState("");

    const filtered = careers.filter((c) => 
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.location?.toLowerCase().includes(search.toLowerCase()) ||
        c.employmentType?.name?.toLowerCase().includes(search.toLowerCase())
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
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search job openings by title, location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={onCreate}
                    className="inline-flex h-11 px-6 items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                    <Plus size={16} />
                    Post Job Opening
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold">
                    Failed to load recruitment job openings registry.
                </div>
            )}

            {/* List Table */}
            {filtered.length === 0 ? (
                <EmptyState
                    icon={Briefcase}
                    title="No job openings posted"
                    description="Get started by creating your first recruitment job opening."
                />
            ) : (
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Job Title</th>
                                    <th className="py-4 px-6">Type</th>
                                    <th className="py-4 px-6">Location</th>
                                    <th className="py-4 px-6">Vacancies</th>
                                    <th className="py-4 px-6">Deadline</th>
                                    <th className="py-4 px-6">CMS Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {filtered.map((job) => (
                                    <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900">
                                            {job.title}
                                            <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{job.slug}</span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600 font-medium">
                                            <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                                {job.employmentType?.name ?? "Full Time"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600 font-medium">{job.location ?? "—"}</td>
                                        <td className="py-4 px-6 font-bold text-slate-800">{job.vacancies ?? 1}</td>
                                        <td className="py-4 px-6 text-slate-600 font-medium text-xs">
                                            {job.deadline ? new Date(job.deadline).toLocaleDateString() : "—"}
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => toggleStatus(job.id, job.is_active)}
                                                className={`flex items-center gap-1 text-xs font-semibold ${
                                                    job.is_active ? "text-green-600" : "text-slate-400"
                                                }`}
                                            >
                                                {job.is_active ? (
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
                                                onClick={() => onEdit(job.id)}
                                                className="p-2 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-xl transition-all"
                                                title="Edit Job Opening"
                                            >
                                                <Edit3 size={15} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to delete this job opening?")) {
                                                        removeCareer(job.id);
                                                    }
                                                }}
                                                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"
                                                title="Delete Job Opening"
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
