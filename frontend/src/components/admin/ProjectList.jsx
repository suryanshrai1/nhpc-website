import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit3, Trash2, ToggleLeft, ToggleRight, Landmark } from "lucide-react";
import useProjectsAdmin from "../../hooks/useProjectsAdmin";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

export default function ProjectList({ onEdit, onCreate }) {
    const { projects, pagination, loading, error, page, setPage, toggleStatus, removeProject } = useProjectsAdmin();
    const [search, setSearch] = useState("");

    const filtered = projects.filter((p) => 
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.slug?.toLowerCase().includes(search.toLowerCase()) ||
        p.type?.toLowerCase().includes(search.toLowerCase())
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
                        placeholder="Search registry by project name or type..."
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
                    Register Project
                </button>
            </div>

            {/* List Table */}
            {filtered.length === 0 ? (
                <EmptyState
                    icon={Landmark}
                    title="No projects registered"
                    description="Get started by creating your first renewable NHPC power project."
                />
            ) : (
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Name</th>
                                    <th className="py-4 px-6">Type</th>
                                    <th className="py-4 px-6">Capacity</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6">CMS Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {filtered.map((proj) => (
                                    <tr key={proj.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900">
                                            {proj.name}
                                            <span className="block text-[10px] text-slate-400 font-medium font-mono mt-0.5">{proj.slug}</span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-500 font-medium">{proj.type}</td>
                                        <td className="py-4 px-6 font-semibold text-slate-800">{proj.capacity} {proj.capacityUnit || "MW"}</td>
                                        <td className="py-4 px-6">
                                            <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                                {proj.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => toggleStatus(proj.id, proj.is_active ?? proj.isActive ?? true)}
                                                className={`flex items-center gap-1 text-xs font-semibold ${
                                                    (proj.is_active ?? proj.isActive ?? true) ? "text-green-600" : "text-slate-400"
                                                }`}
                                            >
                                                {(proj.is_active ?? proj.isActive ?? true) ? (
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
                                                onClick={() => onEdit(proj.id)}
                                                className="p-2 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-xl transition-all"
                                                title="Edit Project"
                                            >
                                                <Edit3 size={15} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to delete this project?")) {
                                                        removeProject(proj.id);
                                                    }
                                                }}
                                                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"
                                                title="Delete Project"
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
