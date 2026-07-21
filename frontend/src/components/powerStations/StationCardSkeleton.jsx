import React from "react";

export default function StationCardSkeleton() {
    return (
        <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm animate-pulse h-full">
            <div className="aspect-[16/10] bg-slate-200" />
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                    <div className="h-5 w-20 bg-slate-200 rounded-full" />
                    <div className="h-5 w-3/4 bg-slate-200 rounded" />
                </div>
                <div className="space-y-1.5 pt-4 border-t border-slate-100">
                    <div className="h-3.5 w-24 bg-slate-100 rounded" />
                    <div className="h-3.5 w-36 bg-slate-100 rounded" />
                </div>
            </div>
        </div>
    );
}
