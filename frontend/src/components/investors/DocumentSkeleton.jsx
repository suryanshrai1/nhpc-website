import React from "react";

export default function DocumentSkeleton() {
    return (
        <div className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm animate-pulse">
            <div>
                {/* Badges */}
                <div className="flex gap-2 mb-4">
                    <div className="h-5 w-20 bg-slate-200 rounded-full" />
                    <div className="h-5 w-16 bg-slate-200 rounded-full" />
                </div>

                {/* File Icon & Title */}
                <div className="flex items-start gap-3">
                    <div className="h-10 w-10 shrink-0 bg-slate-200 rounded-xl" />
                    <div className="space-y-2 flex-1">
                        <div className="h-4 w-3/4 bg-slate-200 rounded" />
                        <div className="h-4 w-1/2 bg-slate-200 rounded" />
                    </div>
                </div>

                {/* Description */}
                <div className="mt-4 space-y-2">
                    <div className="h-3.5 w-full bg-slate-100 rounded" />
                    <div className="h-3.5 w-5/6 bg-slate-100 rounded" />
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="space-y-1">
                    <div className="h-3 w-24 bg-slate-200 rounded" />
                    <div className="h-3 w-16 bg-slate-200 rounded" />
                </div>
                <div className="h-9 w-9 bg-slate-200 rounded-full" />
            </div>
        </div>
    );
}
