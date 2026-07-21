import React from "react";

export default function TenderCardSkeleton() {
    return (
        <div className="flex flex-col justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-pulse h-full">
            <div className="space-y-4">
                {/* Badges */}
                <div className="flex gap-2">
                    <div className="h-5 w-20 bg-slate-200 rounded-full" />
                    <div className="h-5 w-16 bg-slate-200 rounded-full" />
                </div>

                {/* Tender Number & Title */}
                <div className="space-y-2">
                    <div className="h-3 w-32 bg-slate-200 rounded" />
                    <div className="h-5 w-3/4 bg-slate-200 rounded" />
                    <div className="h-5 w-1/2 bg-slate-200 rounded" />
                </div>

                {/* Summary */}
                <div className="space-y-2 pt-2">
                    <div className="h-4 w-full bg-slate-100 rounded" />
                    <div className="h-4 w-5/6 bg-slate-100 rounded" />
                </div>
            </div>

            {/* Dates & CTA */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-end justify-between">
                <div className="space-y-2">
                    <div className="h-3.5 w-28 bg-slate-100 rounded" />
                    <div className="h-3.5 w-32 bg-slate-100 rounded" />
                </div>
                <div className="h-10 w-28 bg-slate-200 rounded-xl" />
            </div>
        </div>
    );
}
