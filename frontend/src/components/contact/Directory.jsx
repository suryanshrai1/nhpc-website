import React from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function Directory() {
    const offices = [
        {
            title: "Corporate Headquarters",
            address: "NHPC Office Complex, Sector-33, Faridabad, Haryana - 121003",
            phone: "+91 (129) 2588110",
            email: "webmaster@nhpc.nic.in"
        },
        {
            title: "Liaison Office, New Delhi",
            address: "Room No. 306, 3rd Floor, Shram Shakti Bhawan, Rafi Marg, New Delhi - 110001",
            phone: "+91 (11) 23717279",
            email: "delhilio@nhpc.nic.in"
        },
        {
            title: "Regional Office, Jammu",
            address: "Grid Sub-Station Complex, Gladni, Narwal, Jammu - 180006",
            phone: "+91 (191) 2470075",
            email: "rojammu@nhpc.nic.in"
        },
        {
            title: "Regional Office, Siliguri",
            address: "Vidyut Nagar, P.O. Satellite Township, Siliguri, West Bengal - 734015",
            phone: "+91 (353) 2568650",
            email: "rosiliguri@nhpc.nic.in"
        }
    ];

    return (
        <Section className="bg-slate-50 border-t border-slate-200/60">
            <Container>
                <SectionHeading
                    title="Office Directory"
                    subtitle="Contact information for NHPC regional and liaison offices across regions."
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {offices.map((office, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
                        >
                            <div>
                                <h4 className="font-bold text-slate-900 text-base mb-3">
                                    {office.title}
                                </h4>
                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4">
                                    {office.address}
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-500 font-medium">
                                <p>Phone: <span className="text-slate-800">{office.phone}</span></p>
                                <p>Email: <span className="text-slate-800">{office.email}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
