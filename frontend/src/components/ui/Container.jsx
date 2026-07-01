export default function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto max-w-7xl px-6 md:px-12 lg:px-16 w-full ${className}`}>
            {children}
        </div>
    );
}
