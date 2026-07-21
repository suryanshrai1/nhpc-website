import { useState, useEffect } from "react";
import { getAdminInvestorById, createAdminInvestor, updateAdminInvestor, getAdminLookups } from "../services/investorAdminService";

export default function useInvestorEditor(id) {
    const [document, setDocument] = useState(null);
    const [lookups, setLookups] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadEditorData() {
            try {
                setLoading(true);
                setError(null);
                
                const [lookupsData, docData] = await Promise.all([
                    getAdminLookups(),
                    id ? getAdminInvestorById(id) : Promise.resolve(null)
                ]);

                setLookups(lookupsData);
                if (docData) {
                    setDocument(docData);
                } else {
                    // Default values for new investor document creation
                    setDocument({
                        title: "",
                        investor_document_type_id: "",
                        financial_year_id: "",
                        description: "",
                        media_file_id: "",
                        published_at: "",
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
                investor_document_type_id: Number(payload.investor_document_type_id || payload.investorDocumentTypeId),
                financial_year_id: payload.financial_year_id ? Number(payload.financial_year_id) : undefined,
                description: payload.description || undefined,
                media_file_id: Number(payload.media_file_id || payload.mediaFileId),
                published_at: payload.published_at ? new Date(payload.published_at).toISOString() : undefined,
                display_order: Number(payload.display_order || payload.displayOrder || 1),
                is_active: Boolean(payload.is_active || payload.isActive)
            };

            if (id) {
                await updateAdminInvestor(id, formatted);
            } else {
                await createAdminInvestor(formatted);
            }
            return true;
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "Failed to save investor document.");
            throw err;
        } finally {
            setSaving(false);
        }
    };

    return {
        document,
        lookups,
        loading,
        saving,
        error,
        save
    };
}
