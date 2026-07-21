import { useState, useEffect } from "react";
import { getAdminStationById, createAdminStation, updateAdminStation, getAdminLookups } from "../services/stationAdminService";

export default function useStationEditor(id) {
    const [station, setStation] = useState(null);
    const [lookups, setLookups] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadEditorData() {
            try {
                setLoading(true);
                setError(null);
                
                const [lookupsData, stationData] = await Promise.all([
                    getAdminLookups(),
                    id ? getAdminStationById(id) : Promise.resolve(null)
                ]);

                setLookups(lookupsData);
                if (stationData) {
                    setStation(stationData);
                } else {
                    // Default values for new station creation
                    setStation({
                        name: "",
                        slug: "",
                        project_type_id: "",
                        state_id: "",
                        installed_capacity: "",
                        capacity_unit_id: "",
                        commissioned_on: "",
                        description: "",
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
            
            // Format payload expected by backend Zod schemas
            const formatted = {
                name: payload.name,
                slug: payload.slug,
                project_type_id: Number(payload.project_type_id || payload.projectTypeId),
                state_id: Number(payload.state_id || payload.stateId),
                installed_capacity: Number(payload.installed_capacity || payload.installedCapacity),
                capacity_unit_id: Number(payload.capacity_unit_id || payload.capacityUnitId),
                commissioned_on: payload.commissioned_on ? new Date(payload.commissioned_on).toISOString() : null,
                description: payload.description || null,
                latitude: payload.latitude ? Number(payload.latitude) : null,
                longitude: payload.longitude ? Number(payload.longitude) : null,
                is_featured: Boolean(payload.is_featured || payload.isFeatured),
                display_order: Number(payload.display_order || payload.displayOrder || 1),
                is_active: Boolean(payload.is_active || payload.isActive)
            };

            if (id) {
                await updateAdminStation(id, formatted);
            } else {
                await createAdminStation(formatted);
            }
            return true;
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "Failed to save power station.");
            throw err;
        } finally {
            setSaving(false);
        }
    };

    return {
        station,
        lookups,
        loading,
        saving,
        error,
        save
    };
}
