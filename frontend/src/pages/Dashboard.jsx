import React from "react";
import { Landmark, FileText, Image, Briefcase, Mail, Activity, Server, Database } from "lucide-react";
import DashboardCard from "../components/admin/DashboardCard";
import QuickActions from "../components/admin/QuickActions";
import RecentActivity from "../components/admin/RecentActivity";
import useDashboardAdmin from "../hooks/useDashboardAdmin";

export default function Dashboard() {
  const { data, loading, error } = useDashboardAdmin();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-3xl text-center text-red-700 max-w-lg mx-auto mt-12">
        <h3 className="font-bold text-lg mb-2">Failed to Load Dashboard</h3>
        <p className="text-sm">There was a problem communicating with the operations aggregator service.</p>
      </div>
    );
  }

  const stats = data?.statistics || {};
  const system = data?.system || {};

  return (
    <div className="space-y-6">
      {/* Overview stats KPI */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <DashboardCard
          title="Projects"
          value={stats.projects || 0}
          description="Registered NHPC power stations"
          icon={Landmark}
        />
        <DashboardCard
          title="Active Tenders"
          value={stats.tenders || 0}
          description="Live procurement listings"
          icon={FileText}
        />
        <DashboardCard
          title="Media Library"
          value={stats.media || 0}
          description="DAM files in system storage"
          icon={Image}
        />
        <DashboardCard
          title="Vacancy Openings"
          value={stats.careers || 0}
          description="Active career opportunities"
          icon={Briefcase}
        />
        <DashboardCard
          title="Contact Inbox"
          value={stats.messages || 0}
          description="Total received enquiries"
          icon={Mail}
        />
      </div>

      {/* Quick CMS Trigger Panel */}
      <QuickActions />

      {/* Operations Details and System Specs */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* Left Column: System Health Status */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity size={18} className="text-blue-600" />
              Real-time System Status
            </h3>
            <p className="text-xs text-slate-400 mt-1">Live operational parameters and metadata.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Database size={18} />
              </div>
              <div>
                <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Database</span>
                <span className="block text-xs font-bold text-slate-800 mt-0.5">{system.databaseStatus || "Connected"}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Server size={18} />
              </div>
              <div>
                <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Environment</span>
                <span className="block text-xs font-bold text-slate-800 mt-0.5 capitalize">{system.environment || "development"}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Activity size={18} />
              </div>
              <div>
                <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">App Version</span>
                <span className="block text-xs font-bold text-slate-800 mt-0.5">v{system.version || "1.0.0"}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
            Welcome to the NHPC Admin Console dashboard. Every widget has been wired to the live database. Use the navigation sidebar on the left to add power stations, upload images/documents to the media library, audit contact enquiries, or publish updates to the homepage content sections.
          </div>
        </div>

        {/* Right Column: Dynamic Activity Logger */}
        <div className="lg:col-span-4">
          <RecentActivity activities={data?.recentActivity} />
        </div>
      </div>
    </div>
  );
}
