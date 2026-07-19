export const getButtonStyles = (variant = "primary") => {
    const baseStyles =
        "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm md:text-base font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-60";

    switch (variant.toLowerCase()) {

        case "primary":
            return `${baseStyles}
                bg-blue-600
                text-white
                hover:bg-blue-700
                shadow-lg
                shadow-blue-600/20
                hover:shadow-blue-600/40`;

        case "secondary":
            return `${baseStyles}
                bg-slate-800
                text-white
                border
                border-slate-700
                hover:bg-slate-700`;

        case "outline":
            return `${baseStyles}
                border-2
                border-white
                bg-transparent
                text-white
                hover:bg-white
                hover:text-slate-900`;

        case "ghost":
            return `${baseStyles}
                bg-transparent
                text-white
                hover:bg-white/10`;

        default:
            return `${baseStyles}
                bg-blue-600
                text-white
                hover:bg-blue-700`;
    }
};