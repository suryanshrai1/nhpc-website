import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { getMediaUrl } from "../../utils/media";

// Parse numbers, prefixes, suffixes, and commas from values like "7,144 MW", "+50", "49 Years"
const parseValue = (valStr) => {
    if (!valStr) return { number: 0, prefix: "", suffix: "", hasCommas: false };

    const match = valStr.match(/([0-9,.]+)/);
    if (!match) return { number: 0, prefix: "", suffix: valStr, hasCommas: false };

    const numStr = match[0];
    const number = parseFloat(numStr.replace(/,/g, ""));
    const hasCommas = numStr.includes(",");

    const index = valStr.indexOf(numStr);
    const prefix = valStr.slice(0, index);
    const suffix = valStr.slice(index + numStr.length);

    return { number, prefix, suffix, hasCommas };
};

export default function StatCard({ value, label, icon }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const { number, prefix, suffix, hasCommas } = parseValue(value);
    const [displayValue, setDisplayValue] = useState(prefix + "0" + suffix);

    useEffect(() => {
        if (!isInView || number === 0) {
            if (value) setDisplayValue(value);
            return;
        }

        const controls = animate(0, number, {
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1], // easeOutExpo
            onUpdate: (latest) => {
                let formatted = Math.floor(latest).toString();
                if (hasCommas) {
                    formatted = Math.floor(latest).toLocaleString();
                }
                setDisplayValue(`${prefix}${formatted}${suffix}`);
            },
            onComplete: () => {
                // Ensure exact final value is displayed
                setDisplayValue(value);
            }
        });

        return () => controls.stop();
    }, [isInView, number, prefix, suffix, hasCommas, value]);

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20,
            },
        },
    };

    const iconUrl = getMediaUrl(icon);

    return (
        <motion.div
            ref={ref}
            variants={cardVariants}
            whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.06)", 
                borderColor: "rgb(191, 219, 254)" // blue-200 border on hover
            }}
            className="bg-white rounded-2xl border border-slate-100 p-8 md:p-10 shadow-sm transition-all duration-300 flex flex-col justify-between items-start text-left group"
        >
            {/* Top Row: Icon if available */}
            {iconUrl ? (
                <div className="mb-6 p-3 bg-blue-50/50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                    <img src={iconUrl} alt={label || "icon"} className="h-6 w-6 object-contain text-blue-600" />
                </div>
            ) : (
                <div className="mb-6 h-2 w-10 bg-blue-600 rounded-full" /> // fallback subtle blue accent bar
            )}

            {/* Content Row */}
            <div className="w-full">
                {/* Large animated number */}
                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {displayValue}
                </h3>
                {/* Label */}
                <p className="text-sm md:text-base text-slate-500 font-medium tracking-wide">
                    {label}
                </p>
            </div>
        </motion.div>
    );
}
