import React from "react";
import { Plus, Image, FileText, Briefcase, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickActions() {
  const actions = [
    { label: "Add Project", to: "/admin/projects", icon: Plus, color: "bg-blue-600 hover:bg-blue-700 text-white" },
    { label: "Upload Media", to: "/admin/media", icon: Image, color: "bg-emerald-600 hover:bg-emerald-700 text-white" },
    { label: "Create Tender", to: "/admin/tenders", icon: FileText, color: "bg-amber-600 hover:bg-amber-700 text-white" },
    { label: "Create Career", to: "/admin/careers", icon: Briefcase, color: "bg-indigo-600 hover:bg-indigo-700 text-white" },
    { label: "View Messages", to: "/admin/messages", icon: Mail, color: "border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 bg-white" },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <h3 className="text-base font-bold text-slate-900 mb-4">
        Quick CMS Actions
      </h3>
      
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <Link
              key={idx}
              to={act.to}
              className={`flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${act.color}`}
            >
              <Icon size={14} />
              {act.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
