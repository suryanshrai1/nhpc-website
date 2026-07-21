import { useState, useEffect, useCallback } from "react";
import { getAdminInvestors, patchAdminInvestorStatus, deleteAdminInvestor } from "../services/investorAdminService";

export default function useInvestorsAdmin() {
    const [documents, setDocuments] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const loadDocuments = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAdminInvestors({ page, limit });
            setDocuments(data.items ?? []);
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
            setDocuments((prev) => 
                prev.map((doc) => (doc.id === id ? { ...doc, is_active: nextStatus } : doc))
            );

            await patchAdminInvestorStatus(id, nextStatus);
        } catch (err) {
            console.error(err);
            // Revert on error
            setDocuments((prev) => 
                prev.map((doc) => (doc.id === id ? { ...doc, is_active: currentStatus } : doc))
            );
            throw err;
        }
    };

    const removeDocument = async (id) => {
        try {
            await deleteAdminInvestor(id);
            setDocuments((prev) => prev.filter((doc) => doc.id !== id));
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    useEffect(() => {
        loadDocuments();
    }, [loadDocuments]);

    return {
        documents,
        pagination,
        loading,
        error,
        page,
        setPage,
        toggleStatus,
        removeDocument,
        refresh: loadDocuments
    };
}
