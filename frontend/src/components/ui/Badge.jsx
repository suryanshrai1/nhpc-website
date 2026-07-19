export default function Badge({ children, className = "" }) {
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full whitespace-nowrap text-xs font-semibold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-100 ${className}`}>
            {children}
        </span>
    );
}
