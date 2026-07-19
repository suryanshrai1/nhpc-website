import Badge from "./Badge";

export default function SectionHeading({ badge, title, subtitle, className = "" }) {
    return (
        <div className={`flex flex-col mb-16 md:mb-20 max-w-2xl ${className}`}>
            {badge && (
                <div className="mb-4">
                    <Badge>{badge}</Badge>
                </div>
            )}
            {title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                    {title}
                </h2>
            )}
            {subtitle && (
                <p className="mt-4 text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
