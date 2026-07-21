import React from "react";
import Container from "../components/ui/Container";

import ContactHero from "../components/contact/ContactHero";
import OfficeDetails from "../components/contact/OfficeDetails";
import Directory from "../components/contact/Directory";
import ContactForm from "../components/contact/ContactForm";

export default function Contact() {
    return (
        <main>
            <ContactHero />
            <OfficeDetails />
            <Directory />
            <ContactForm />
        </main>
    );
}