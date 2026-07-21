import { useState, useEffect, useCallback } from "react";
import { getAdminTenders, patchAdminTenderStatus, deleteAdminTender } from "../services/tenderAdminService";

export default function useTendersAdmin() {
    const [tenders, setTenders] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const loadTenders = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAdminTenders({ page, limit });
            setTenders(data.items ?? []);
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
            setTenders((prev) => 
                prev.map((t) => (t.id === id ? { ...t, is_active: nextStatus } : t))
            );

            await patchAdminTenderStatus(id, nextStatus);
        } catch (err) {
            console.error(err);
            // Revert on error
            setTenders((prev) => 
                prev.map((t) => (t.id === id ? { ...t, is_active: currentStatus } : t))
            );
            throw err;
        }
    };

    const removeTender = async (id) => {
        try {
            await deleteAdminTender(id);
            setTenders((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    useEffect(() => {
        loadTenders();
    }, [loadTenders]);

    return {
        tenders,
        pagination,
        loading,
        error,
        page,
        setPage,
        toggleStatus,
        removeTender,
        refresh: loadTenders
    };
}
