import { useState, useEffect } from "react";
import { getAdminCareerById, createAdminCareer, updateAdminCareer, getAdminLookups } from "../services/careerAdminService";

export default function useCareerEditor(id) {
    const [career, setCareer] = useState(null);
    const [lookups, setLookups] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadEditorData() {
            try {
                setLoading(true);
                setError(null);
                
                const [lookupsData, careerData] = await Promise.all([
                    getAdminLookups(),
                    id ? getAdminCareerById(id) : Promise.resolve(null)
                ]);

                setLookups(lookupsData);
                if (careerData) {
                    setCareer(careerData);
                } else {
                    // Default values for new recruitment job opening
                    setCareer({
                        title: "",
                        slug: "",
                        employment_type_id: "",
                        location: "",
                        vacancies: 1,
                        summary: "",
                        description: "",
                        published_at: "",
                        application_deadline: "",
                        display_order: 1,
                        is_active: true
                    });
                }
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        loadEditorData();
    }, [id]);

    const save = async (payload) => {
        try {
            setSaving(true);
            setError(null);
            
            // Format payload expected by backend Zod schemas
            const formatted = {
                title: payload.title,
                slug: payload.slug,
                employment_type_id: Number(payload.employment_type_id || payload.employmentTypeId),
                location: payload.location,
                vacancies: Number(payload.vacancies || 1),
                summary: payload.summary || null,
                description: payload.description || null,
                published_at: payload.published_at ? new Date(payload.published_at).toISOString() : null,
                application_deadline: payload.application_deadline ? new Date(payload.application_deadline).toISOString() : null,
                display_order: Number(payload.display_order || payload.displayOrder || 1),
                is_active: Boolean(payload.is_active || payload.isActive)
            };

            if (id) {
                await updateAdminCareer(id, formatted);
            } else {
                await createAdminCareer(formatted);
            }
            return true;
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "Failed to save job opening.");
            throw err;
        } finally {
            setSaving(false);
        }
    };

    return {
        career,
        lookups,
        loading,
        saving,
        error,
        save
    };
}
