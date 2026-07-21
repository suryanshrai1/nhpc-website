import { useState, useEffect } from "react";
import { getAdminProjectById, createAdminProject, updateAdminProject, getAdminLookups } from "../services/projectAdminService";

export default function useProjectEditor(id) {
    const [project, setProject] = useState(null);
    const [lookups, setLookups] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadEditorData() {
            try {
                setLoading(true);
                setError(null);
                
                const [lookupsData, projectData] = await Promise.all([
                    getAdminLookups(),
                    id ? getAdminProjectById(id) : Promise.resolve(null)
                ]);

                setLookups(lookupsData);
                if (projectData) {
                    setProject(projectData);
                } else {
                    // Default values for new project creation
                    setProject({
                        name: "",
                        slug: "",
                        project_type_id: "",
                        project_status_id: "",
                        state_id: "",
                        capacity: "",
                        capacity_unit_id: "",
                        summary: "",
                        latitude: "",
                        longitude: "",
                        is_featured: false,
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
            
            // Map camelCase keys back to snake_case payload mapping expected by backend Zod schemas
            const formatted = {
                name: payload.name,
                slug: payload.slug,
                project_type_id: Number(payload.project_type_id || payload.projectTypeId),
                project_status_id: Number(payload.project_status_id || payload.projectStatusId),
                state_id: Number(payload.state_id || payload.stateId),
                capacity: Number(payload.capacity),
                capacity_unit_id: Number(payload.capacity_unit_id || payload.capacityUnitId),
                summary: payload.summary,
                latitude: payload.latitude ? String(payload.latitude) : undefined,
                longitude: payload.longitude ? String(payload.longitude) : undefined,
                is_featured: Boolean(payload.is_featured || payload.isFeatured),
                display_order: Number(payload.display_order || payload.displayOrder || 1),
                is_active: Boolean(payload.is_active || payload.isActive),
                thumbnail_media_id: payload.thumbnail_media_id || undefined,
                hero_media_id: payload.hero_media_id || undefined
            };

            if (id) {
                await updateAdminProject(id, formatted);
            } else {
                await createAdminProject(formatted);
            }
            return true;
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "Failed to save project.");
            throw err;
        } finally {
            setSaving(false);
        }
    };

    return {
        project,
        lookups,
        loading,
        saving,
        error,
        save
    };
}
