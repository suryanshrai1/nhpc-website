import { SearchX } from "lucide-react";

export default function EmptyState({
    icon: Icon = SearchX,
    title = "Nothing here yet",
    description = "No items match your current criteria.",
    action = null,
}) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-2xl border border-slate-200">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-5">
                <Icon size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-500 max-w-sm">{description}</p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}
