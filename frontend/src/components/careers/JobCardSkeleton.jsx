import React from "react";

export default function JobCardSkeleton() {
    return (
        <div className="flex flex-col justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-pulse h-full">
            <div className="space-y-4">
                <div className="flex gap-2">
                    <div className="h-5 w-20 bg-slate-200 rounded-full" />
                </div>
                <div className="space-y-2">
                    <div className="h-6 w-3/4 bg-slate-200 rounded" />
                    <div className="h-4 w-1/2 bg-slate-200 rounded" />
                </div>
                <div className="space-y-1.5 pt-2">
                    <div className="h-3.5 w-full bg-slate-100 rounded" />
                    <div className="h-3.5 w-4/5 bg-slate-100 rounded" />
                </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="h-4 w-28 bg-slate-100 rounded" />
                <div className="h-9 w-28 bg-slate-200 rounded-xl" />
            </div>
        </div>
    );
}
