import React from "react";
import { Mail, Phone, Clock, Copy, Check } from "lucide-react";
import Section from "../ui/Section";
import Container from "../ui/Container";

export default function OfficeDetails() {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const address = "NHPC Office Complex, Sector-33, Faridabad, Haryana - 121003";

    return (
        <Section className="bg-white">
            <Container>
                <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                    {/* Left details */}
                    <div className="flex-1 space-y-6 flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase block mb-2">
                                CORPORATE OFFICE
                            </span>
                            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                                NHPC Headquarters
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-6">
                                {address}
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Phone size={16} className="text-blue-600 shrink-0" />
                                    <a href="tel:+911292588110" className="hover:text-blue-600 font-medium">
                                        +91 (129) 2588110
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Mail size={16} className="text-blue-600 shrink-0" />
                                    <a href="mailto:webmaster@nhpc.nic.in" className="hover:text-blue-600 font-medium">
                                        webmaster@nhpc.nic.in
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Clock size={16} className="text-blue-600 shrink-0" />
                                    <span>Mon - Fri: 9:00 AM - 5:30 PM</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex gap-4">
                            <button
                                onClick={() => handleCopy(address)}
                                className="inline-flex h-10 px-4 items-center justify-center gap-1.5 rounded-xl border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                                {copied ? "Copied!" : "Copy Address"}
                            </button>
                        </div>
                    </div>

                    {/* Right placeholder map */}
                    <div className="flex-1 w-full rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                            Interactive Location Map
                        </span>
                        <p className="text-slate-500 text-xs max-w-xs leading-relaxed mb-6">
                            Sector-33, Faridabad, Haryana, India
                        </p>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 px-6 items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                            Open in Google Maps
                        </a>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
