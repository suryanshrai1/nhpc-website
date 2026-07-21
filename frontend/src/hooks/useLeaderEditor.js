import { useState, useEffect } from "react";
import { getAdminLeaderById, createAdminLeader, updateAdminLeader, getAdminLookups } from "../services/leadershipAdminService";

export default function useLeaderEditor(id) {
    const [leader, setLeader] = useState(null);
    const [lookups, setLookups] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadEditorData() {
            try {
                setLoading(true);
                setError(null);
                
                const [lookupsData, leaderData] = await Promise.all([
                    getAdminLookups(),
                    id ? getAdminLeaderById(id) : Promise.resolve(null)
                ]);

                setLookups(lookupsData);
                if (leaderData) {
                    setLeader(leaderData);
                } else {
                    setLeader({
                        full_name: "",
                        slug: "",
                        designation: "",
                        qualification: "",
                        experience_summary: "",
                        description: "",
                        email: "",
                        phone: "",
                        leadership_level_id: "",
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

            const formatted = {
                full_name: payload.full_name,
                slug: payload.slug,
                designation: payload.designation,
                qualification: payload.qualification || undefined,
                experience_summary: payload.experience_summary || undefined,
                description: payload.description || undefined,
                email: payload.email || undefined,
                phone: payload.phone || undefined,
                leadership_level_id: Number(payload.leadership_level_id),
                display_order: Number(payload.display_order || 1),
                is_active: Boolean(payload.is_active ?? true)
            };

            if (id) {
                await updateAdminLeader(id, formatted);
            } else {
                await createAdminLeader(formatted);
            }
            return true;
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "Failed to save profile.");
            throw err;
        } finally {
            setSaving(false);
        }
    };

    return {
        leader,
        lookups,
        loading,
        saving,
        error,
        save
    };
}
