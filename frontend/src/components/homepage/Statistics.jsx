import { motion } from "framer-motion";
import Section from "../ui/Section";
import Container from "../ui/Container";
import StatCard from "../ui/StatCard";

export default function Statistics({ statistics }) {
    if (!statistics || statistics.length === 0) return null;

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    return (
        <Section className="bg-slate-50/50 border-t border-b border-slate-100">
            <Container>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10% 0px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
                >
                    {statistics.map((stat) => (
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
