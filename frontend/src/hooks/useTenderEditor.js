import { useState, useEffect } from "react";
import { getAdminTenderById, createAdminTender, updateAdminTender, getAdminLookups } from "../services/tenderAdminService";

export default function useTenderEditor(id) {
    const [tender, setTender] = useState(null);
    const [lookups, setLookups] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadEditorData() {
            try {
                setLoading(true);
                setError(null);
                
                const [lookupsData, tenderData] = await Promise.all([
                    getAdminLookups(),
                    id ? getAdminTenderById(id) : Promise.resolve(null)
                ]);

                setLookups(lookupsData);
                if (tenderData) {
                    setTender(tenderData);
                } else {
                    // Default values for new tender creation
                    setTender({
                        title: "",
                        tender_number: "",
                        slug: "",
                        tender_category_id: "",
                        tender_status_id: "",
                        summary: "",
                        description: "",
                        published_at: "",
                        opening_date: "",
                        closing_date: "",
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
                tender_number: payload.tender_number || payload.tenderNumber,
                slug: payload.slug,
                tender_category_id: Number(payload.tender_category_id || payload.tenderCategoryId),
                tender_status_id: Number(payload.tender_status_id || payload.tenderStatusId),
                summary: payload.summary || null,
                description: payload.description || null,
                published_at: payload.published_at ? new Date(payload.published_at).toISOString() : null,
                opening_date: payload.opening_date ? new Date(payload.opening_date).toISOString() : null,
                closing_date: payload.closing_date ? new Date(payload.closing_date).toISOString() : null,
                display_order: Number(payload.display_order || payload.displayOrder || 1),
                is_active: Boolean(payload.is_active || payload.isActive)
            };

            if (id) {
                await updateAdminTender(id, formatted);
            } else {
                await createAdminTender(formatted);
            }
            return true;
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "Failed to save tender record.");
            throw err;
        } finally {
            setSaving(false);
        }
    };

    return {
        tender,
        lookups,
        loading,
        saving,
        error,
        save
    };
}
