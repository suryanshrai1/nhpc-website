import React from "react";
import Container from "../ui/Container";

export default function AboutHero() {
    return (
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            <Container>
                <div className="py-20 max-w-3xl">
                    <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300">
                        ABOUT US
                    </span>
                    <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                        Powering India's Growth with Clean Energy
                    </h1>
                    <p className="mt-4 text-lg text-slate-300 max-w-2xl">
                        NHPC is a premier Government of India enterprise dedicated to harnessing the power of water, solar, and wind for sustainable development.
                    </p>
                </div>
            </Container>
        </section>
    );
}
