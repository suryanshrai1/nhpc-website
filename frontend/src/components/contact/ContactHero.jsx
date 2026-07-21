import React from "react";
import Container from "../ui/Container";

export default function ContactHero() {
    return (
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            <Container>
                <div className="py-20 max-w-3xl">
                    <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300">
                        GET IN TOUCH
                    </span>
                    <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-lg text-slate-300 max-w-2xl">
                        Have questions or need assistance? Reach out to NHPC corporate offices or view our department contacts.
                    </p>
                </div>
            </Container>
        </section>
    );
}
