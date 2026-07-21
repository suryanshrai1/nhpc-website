export default function Section({ children, className = "", id }) {
    return (
        <section
            id={id}
            className={`py-8 md:py-10 lg:py-12 w-full relative overflow-hidden ${className}`}
        >
            {children}
        </section>
    );
}