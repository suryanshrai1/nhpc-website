export default function Section({ children, className = "", id }) {
    return (
        <section id={id} className={`py-16 md:py-24 lg:py-28 w-full relative overflow-hidden ${className}`}>
            {children}
        </section>
    );
}
