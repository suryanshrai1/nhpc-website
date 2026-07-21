import React, { useState } from "react";
import { Send, AlertCircle, CheckCircle2 } from "lucide-react";
import useContact from "../../hooks/useContact";
import Section from "../ui/Section";
import Container from "../ui/Container";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const { submit, submitting, success, error, validationErrors, resetState } = useContact();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            full_name: name,
            email: email,
            phone: phone || null,
            department: department || null,
            subject: subject,
            message: message
        };

        await submit(payload);
    };

    const handleReset = () => {
        resetState();
        setName("");
        setEmail("");
        setPhone("");
        setDepartment("");
        setSubject("");
        setMessage("");
    };

    const labelClass = "text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5";
    const inputClass = "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

    return (
        <Section className="bg-slate-50 border-t border-slate-200/60">
            <Container>
                <div className="max-w-2xl mx-auto bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                    <span className="text-xs font-bold text-blue-600 tracking-wider uppercase block mb-1 text-center">
                        ONLINE ENQUIRY
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-6">
                        Send a Message
                    </h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-700 text-sm">
                            <AlertCircle className="shrink-0 mt-0.5" size={16} />
                            <div>
                                <p className="font-semibold">{error}</p>
                                {validationErrors && (
                                    <ul className="list-disc pl-4 mt-1.5 space-y-1">
                                        {Object.entries(validationErrors).map(([field, msg]) => (
                                            <li key={field}>{msg}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}

                    {success ? (
                        <div className="text-center py-8 space-y-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 mx-auto">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Message Sent Successfully</h3>
                            <p className="text-sm text-slate-500 max-w-sm mx-auto">
                                Thank you for contacting NHPC. Our administrative office will review your enquiry.
                            </p>
                            <button
                                onClick={handleReset}
                                className="mt-4 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="form-name" className={labelClass}>Full Name *</label>
                                    <input
                                        id="form-name"
                                        type="text"
                                        required
                                        placeholder="e.g. John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="form-email" className={labelClass}>Email Address *</label>
                                    <input
                                        id="form-email"
                                        type="email"
                                        required
                                        placeholder="e.g. john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="form-phone" className={labelClass}>Phone Number</label>
                                    <input
                                        id="form-phone"
                                        type="tel"
                                        placeholder="e.g. +91 9876543210"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="form-dept" className={labelClass}>Department</label>
                                    <input
                                        id="form-dept"
                                        type="text"
                                        placeholder="e.g. Public Relations"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="form-subject" className={labelClass}>Subject *</label>
                                <input
                                    id="form-subject"
                                    type="text"
                                    required
                                    placeholder="Topic of your inquiry..."
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label htmlFor="form-message" className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Message *</label>
                                    <span className="text-[10px] text-slate-400 font-semibold">{message.length}/2000</span>
                                </div>
                                <textarea
                                    id="form-message"
                                    rows={4}
                                    required
                                    maxLength={2000}
                                    placeholder="Write your details here..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
                            >
                                <Send size={15} />
                                {submitting ? "Sending..." : "Submit Message"}
                            </button>
                        </form>
                    )}
                </div>
            </Container>
        </Section>
    );
}
