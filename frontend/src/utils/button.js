export const getButtonStyles = (variant) => {
    const baseStyles = "inline-flex items-center justify-center font-medium px-8 py-3.5 rounded-lg text-base transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer";
    
    switch (variant) {
        case "Primary":
            return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/20 active:scale-95`;
        case "Outline":
            return `${baseStyles} border-2 border-white text-white hover:bg-white hover:text-slate-900 active:scale-95`;
        case "Secondary":
        default:
            return `${baseStyles} bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 active:scale-95`;
    }
};
