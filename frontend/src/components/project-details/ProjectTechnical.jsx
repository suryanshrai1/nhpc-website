import { motion } from "framer-motion";
import Section from "../ui/Section";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

// Safely coerce API values (may be objects like {id, name, code}) to strings
function getDisplayValue(val) {
    if (val === null || val === undefined) return null;
    if (typeof val === "object") {
        return val.name ?? val.label ?? val.code ?? val.value ?? String(val);
    }
    return String(val);
}

function SpecItem({ label, value }) {
    const display = getDisplayValue(value);
    if (!display && display !== 0) return null;
    return (
        <div className="flex flex-col gap-1 p-5 bg-white rounded-xl border border-slate-200">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {label}
            </dt>
            <dd className="text-base font-semibold text-slate-900">{display}</dd>
        </div>
    );
}

export default function ProjectTechnical({ project }) {
    if (!project) return null;

    const basic = project.basic ?? project;
    const technical = project.technical ?? project.details?.technical ?? {};

    const specs = [
        { label: "Installed Capacity", value: basic.capacity ? `${basic.capacity} ${basic.capacityUnit ?? "MW"}` : null },
        { label: "Annual Generation", value: technical.annualGeneration ?? technical.energy },
        { label: "Project Type", value: basic.type },
        { label: "Number of Units", value: technical.units ?? technical.numberOfUnits },
        { label: "Turbine Type", value: technical.turbineType },
        { label: "Design Discharge", value: technical.designDischarge },
        { label: "Head (Gross)", value: technical.grossHead },
        { label: "Dam Height", value: technical.damHeight },
        { label: "Reservoir Capacity", value: technical.reservoirCapacity },
        { label: "Catchment Area", value: technical.catchmentArea },
        { label: "River", value: technical.river ?? technical.riverSystem },
        { label: "State", value: basic.state ?? technical.state },
    ].filter((s) => s.value);

    if (!specs.length) return null;

    return (
        <Section className="bg-slate-50 border-y border-slate-200/60">
            <Container>
                <SectionHeading title="Technical Specifications" />

                <motion.dl
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.05 } }, hidden: {} }}
                >
                    {specs.map((spec, i) => (
                        <motion.div
                            key={i}
                            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                        >
                            <SpecItem label={spec.label} value={spec.value} />
                        </motion.div>
                    ))}
                </motion.dl>
            </Container>
        </Section>
    );
}
