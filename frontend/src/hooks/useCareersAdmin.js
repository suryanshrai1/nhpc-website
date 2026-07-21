import { useState, useEffect, useCallback } from "react";
import { getAdminCareers, patchAdminCareerStatus, deleteAdminCareer } from "../services/careerAdminService";

export default function useCareersAdmin() {
    const [careers, setCareers] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const loadCareers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAdminCareers({ page, limit });
            setCareers(data.items ?? []);
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
            setCareers((prev) => 
                prev.map((c) => (c.id === id ? { ...c, is_active: nextStatus } : c))
            );

            await patchAdminCareerStatus(id, nextStatus);
        } catch (err) {
            console.error(err);
            // Revert on error
            setCareers((prev) => 
                prev.map((c) => (c.id === id ? { ...c, is_active: currentStatus } : c))
            );
            throw err;
        }
    };

    const removeCareer = async (id) => {
        try {
            await deleteAdminCareer(id);
            setCareers((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    useEffect(() => {
        loadCareers();
    }, [loadCareers]);

    return {
        careers,
        pagination,
        loading,
        error,
        page,
        setPage,
        toggleStatus,
        removeCareer,
        refresh: loadCareers
    };
}
