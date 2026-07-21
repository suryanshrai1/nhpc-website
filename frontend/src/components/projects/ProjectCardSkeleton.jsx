export default function ProjectCardSkeleton({ isLarge = false }) {
    return (
        <div
            className={`overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col animate-pulse ${
                isLarge ? "md:col-span-2 lg:flex-row" : ""
            }`}
        >
            {/* Image skeleton */}
            <div
                className={`bg-slate-200 ${
                    isLarge
                        ? "w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:min-h-[320px]"
                        : "aspect-[16/10]"
                }`}
            />

            {/* Content skeleton */}
            <div className={`flex flex-1 flex-col gap-4 p-8 md:p-10 ${isLarge ? "lg:w-1/2" : ""}`}>
                {/* Meta */}
                <div className="flex gap-3">
                    <div className="h-5 w-24 rounded-full bg-slate-200" />
                    <div className="h-5 w-16 rounded-full bg-slate-200" />
                </div>
                {/* Title */}
                <div className="space-y-2">
                    <div className="h-6 w-3/4 rounded bg-slate-200" />
                    {isLarge && <div className="h-6 w-1/2 rounded bg-slate-200" />}
                </div>
                {/* Description */}
                <div className="space-y-2 mt-2">
                    <div className="h-4 w-full rounded bg-slate-100" />
                    <div className="h-4 w-5/6 rounded bg-slate-100" />
                    <div className="h-4 w-4/6 rounded bg-slate-100" />
                </div>
                {/* Button */}
                <div className="mt-auto h-10 w-36 rounded-xl bg-slate-200" />
            </div>
        </div>
    );
}
