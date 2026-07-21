import { useState, useEffect, useCallback } from "react";
import { getAdminProjects, patchAdminProjectStatus, deleteAdminProject } from "../services/projectAdminService";

export default function useProjectsAdmin() {
    const [projects, setProjects] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const loadProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAdminProjects({ page, limit });
            setProjects(data.items ?? []);
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
            setProjects((prev) => 
                prev.map((p) => (p.id === id ? { ...p, is_active: nextStatus } : p))
            );

            await patchAdminProjectStatus(id, nextStatus);
        } catch (err) {
            console.error(err);
            // Revert on error
            setProjects((prev) => 
                prev.map((p) => (p.id === id ? { ...p, is_active: currentStatus } : p))
            );
            throw err;
        }
    };

    const removeProject = async (id) => {
        try {
            await deleteAdminProject(id);
            setProjects((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    return {
        projects,
        pagination,
        loading,
        error,
        page,
        setPage,
        toggleStatus,
        removeProject,
        refresh: loadProjects
    };
}
