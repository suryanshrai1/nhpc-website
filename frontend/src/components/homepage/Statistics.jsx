import { motion } from "framer-motion";

import Section from "../ui/Section";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import StatCard from "../ui/StatCard";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export default function Statistics({ statistics }) {
    if (
        !statistics ||
        !statistics.isVisible ||
        !statistics.items?.length
    ) {
        return null;
    }

    return (
        <Section className="border-y border-slate-200/60 bg-slate-50/50">
            <Container>
                <SectionHeading
                    title={statistics.title}
                    subtitle={statistics.subtitle}
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-10% 0px",
                    }}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
                >
                    {statistics.items.map((stat) => (
                        <StatCard
                            key={stat.id}
                            value={stat.value}
                            label={stat.label}
                            icon={stat.icon}
                        />
                    ))}
                </motion.div>
            </Container>
        </Section>
    );
}