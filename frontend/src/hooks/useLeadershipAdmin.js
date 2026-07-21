import { useState, useEffect, useCallback } from "react";
import { getAdminLeaders, patchAdminLeaderStatus, deleteAdminLeader } from "../services/leadershipAdminService";

export default function useLeadershipAdmin() {
    const [leaders, setLeaders] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const loadLeaders = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAdminLeaders({ page, limit });
            setLeaders(data.items ?? []);
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
            setLeaders((prev) => 
                prev.map((l) => (l.id === id ? { ...l, is_active: nextStatus, isActive: nextStatus } : l))
            );

            await patchAdminLeaderStatus(id, nextStatus);
        } catch (err) {
            console.error(err);
            // Revert
            setLeaders((prev) => 
                prev.map((l) => (l.id === id ? { ...l, is_active: currentStatus, isActive: currentStatus } : l))
            );
            throw err;
        }
    };

    const removeLeader = async (id) => {
        try {
            await deleteAdminLeader(id);
            setLeaders((prev) => prev.filter((l) => l.id !== id));
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    useEffect(() => {
        loadLeaders();
    }, [loadLeaders]);

    return {
        leaders,
        pagination,
        loading,
        error,
        page,
        setPage,
        toggleStatus,
        removeLeader,
        refresh: loadLeaders
    };
}
