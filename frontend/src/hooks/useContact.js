import { useState } from "react";
import { submitContactForm } from "../services/contactService";

export default function useContact() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState(null);

    const submit = async (formData) => {
        try {
            setSubmitting(true);
            setError(null);
            setValidationErrors(null);
            setSuccess(false);
            
            await submitContactForm(formData);
            
            setSuccess(true);
        } catch (err) {
            console.error(err);
            
            // Extract validation errors from backend response
            if (err.response?.data?.errors) {
                setValidationErrors(err.response.data.errors);
                setError("Validation failed. Please correct the highlighted errors.");
            } else {
                setError(err.response?.data?.message || err.message || "Failed to submit enquiry.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return {
        submit,
        submitting,
        success,
        error,
        validationErrors,
        resetState: () => {
            setSuccess(false);
            setError(null);
            setValidationErrors(null);
        }
    };
}
