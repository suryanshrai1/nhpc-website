import { useState, useEffect, useCallback } from "react";
import { getAdminStations, patchAdminStationStatus, deleteAdminStation } from "../services/stationAdminService";

export default function useStationsAdmin() {
    const [stations, setStations] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const loadStations = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAdminStations({ page, limit });
            setStations(data.items ?? []);
            setPagination(data.pagination ?? null);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [page, limit]);

    const toggleStatus = async (id, currentStatus) => {
        try {
            const nextStatus = !currentStatus;
            
            // Optimistic UI updates
            setStations((prev) => 
                prev.map((s) => (s.id === id ? { ...s, is_active: nextStatus } : s))
            );

            await patchAdminStationStatus(id, nextStatus);
        } catch (err) {
            console.error(err);
            // Revert on error
            setStations((prev) => 
                prev.map((s) => (s.id === id ? { ...s, is_active: currentStatus } : s))
            );
            throw err;
        }
    };

    const removeStation = async (id) => {
        try {
            await deleteAdminStation(id);
            setStations((prev) => prev.filter((s) => s.id !== id));
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    useEffect(() => {
        loadStations();
    }, [loadStations]);

    return {
        stations,
        pagination,
        loading,
        error,
        page,
        setPage,
        toggleStatus,
        removeStation,
        refresh: loadStations
    };
}
