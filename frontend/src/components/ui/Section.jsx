export default function Section({ children, className = "", id }) {
    return (
        <section id={id} className={`py-20 md:py-28 w-full relative overflow-hidden ${className}`}>
            {children}
        </section>
    );
}
