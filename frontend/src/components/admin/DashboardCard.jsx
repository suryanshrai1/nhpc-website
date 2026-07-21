import React from "react";

export default function DashboardCard({ title, value, description, icon: Icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {title}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon size={20} />
          </div>
        </div>
        
        <p className="mt-4 text-3xl font-extrabold text-slate-900">
          {value}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          {description}
        </span>
        {trend && (
          <span className="font-semibold text-green-600">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
