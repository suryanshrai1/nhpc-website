export default function Card({ children, className = "" }) {
    return (
        <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 ${className}`}>
            {children}
        </div>
    );
}
