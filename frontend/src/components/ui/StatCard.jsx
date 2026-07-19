import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import * as Icons from "lucide-react";


const parseValue = (value = "") => {
    const match = value.match(/([0-9,.]+)/);

    if (!match) {
        return {
            number: 0,
            prefix: "",
            suffix: value,
            hasCommas: false,
        };
    }

    const numberString = match[0];

    return {
        number: parseFloat(numberString.replace(/,/g, "")),
        prefix: value.slice(0, value.indexOf(numberString)),
        suffix: value.slice(value.indexOf(numberString) + numberString.length),
        hasCommas: numberString.includes(","),
    };
};

export default function StatCard({ value, label, icon }) {
    const ref = useRef(null);

    const isInView = useInView(ref, {
        once: true,
        margin: "-10% 0px",
    });

    const { number, prefix, suffix, hasCommas } = parseValue(value);

    const [displayValue, setDisplayValue] = useState(
        `${prefix}0${suffix}`
    );

    useEffect(() => {
        if (!isInView || number === 0) {
            setDisplayValue(value);
            return;
        }

        const controls = animate(0, number, {
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],

            onUpdate(latest) {
                const formatted = hasCommas
                    ? Math.floor(latest).toLocaleString()
                    : Math.floor(latest).toString();

                setDisplayValue(
                    `${prefix}${formatted}${suffix}`
                );
            },

            onComplete() {
                setDisplayValue(value);
            },
        });

        return () => controls.stop();
    }, [isInView, number, prefix, suffix, hasCommas, value]);

    const Icon =
        icon && Icons[icon]
            ? Icons[icon]
            : Icons.BarChart3;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
            whileHover={{
                y: -6,
            }}
            className="
                group
                rounded-2xl
                border
                border-slate-200/70
                bg-white
                p-8
                md:p-10
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
            "
        >
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-100">
                <Icon size={28} strokeWidth={2} />
            </div>

            <h3 className="mb-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {displayValue}
            </h3>

            <p className="text-sm font-medium tracking-wide text-slate-500 md:text-base">
                {label}
            </p>
        </motion.div>
    );
}