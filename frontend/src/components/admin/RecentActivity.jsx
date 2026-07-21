import React from "react";
import { Clock, Landmark, FileText, Image, Briefcase, Mail } from "lucide-react";

export default function RecentActivity({ activities }) {
  const getIcon = (type) => {
    switch (type) {
      case "project": return Landmark;
      case "media": return Image;
      case "message": return Mail;
      default: return FileText;
    }
  };

  const logs = activities || [];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full">
      <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
        <Clock size={16} className="text-blue-600" />
        System Log &amp; Activity
      </h3>

      {logs.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-8">No recent activities recorded.</p>
      ) : (
        <div className="space-y-4">
          {logs.map((log, idx) => {
            const Icon = getIcon(log.type);
            const timeStr = new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + new Date(log.time).toLocaleDateString();
            return (
              <div key={idx} className="flex gap-3 text-xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-500 shrink-0">
                  <Icon size={14} />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <p className="font-semibold text-slate-700 leading-normal break-words">
                    {log.text}
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    {timeStr}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
