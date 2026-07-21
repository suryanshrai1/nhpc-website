import React from "react";

export function HighlightSkeleton() {
    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-slate-100 shadow-sm animate-pulse">
            <div className="h-14 w-14 rounded-2xl bg-slate-200 mb-4" />
            <div className="h-6 w-24 bg-slate-200 rounded mb-2" />
            <div className="h-4 w-16 bg-slate-200 rounded mb-1" />
            <div className="h-3 w-12 bg-slate-100 rounded" />
        </div>
    );
}
