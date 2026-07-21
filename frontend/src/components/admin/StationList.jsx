import React, { useState } from "react";
import { Plus, Search, Edit3, Trash2, ToggleLeft, ToggleRight, MapPin } from "lucide-react";
import useStationsAdmin from "../../hooks/useStationsAdmin";
import EmptyState from "../ui/EmptyState";

export default function StationList({ onEdit, onCreate }) {
    const { stations, pagination, loading, error, page, setPage, toggleStatus, removeStation } = useStationsAdmin();
    const [search, setSearch] = useState("");

    const filtered = stations.filter((s) => 
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.slug?.toLowerCase().includes(search.toLowerCase()) ||
        s.projectType?.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.state?.name?.toLowerCase().includes(search.toLowerCase())
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
                        placeholder="Search power stations by name, type or state..."
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
                    Register Station
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold">
                    Failed to load operational power stations.
                </div>
            )}

            {/* List Table */}
            {filtered.length === 0 ? (
                <EmptyState
                    icon={MapPin}
                    title="No power stations registered"
                    description="Get started by registering your first operational NHPC power station."
                />
            ) : (
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Station Name</th>
                                    <th className="py-4 px-6">State / Region</th>
                                    <th className="py-4 px-6">Type</th>
                                    <th className="py-4 px-6">Installed Capacity</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {filtered.map((station) => (
                                    <tr key={station.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900">
                                            {station.name}
                                            <span className="block text-[10px] text-slate-400 font-medium font-mono mt-0.5">{station.slug}</span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600 font-medium">{station.state?.name ?? "—"}</td>
                                        <td className="py-4 px-6 text-slate-500 font-medium">{station.projectType?.name ?? "—"}</td>
                                        <td className="py-4 px-6 font-semibold text-slate-800">
                                            {station.installed_capacity} {station.capacityUnit?.code || station.capacityUnit?.name || "MW"}
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => toggleStatus(station.id, station.is_active)}
                                                className={`flex items-center gap-1 text-xs font-semibold ${
                                                    station.is_active ? "text-green-600" : "text-slate-400"
                                                }`}
                                            >
                                                {station.is_active ? (
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
                                                onClick={() => onEdit(station.id)}
                                                className="p-2 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-xl transition-all"
                                                title="Edit Power Station"
                                            >
                                                <Edit3 size={15} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to delete this power station?")) {
                                                        removeStation(station.id);
                                                    }
                                                }}
                                                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"
                                                title="Delete Power Station"
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
