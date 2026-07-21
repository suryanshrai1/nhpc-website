import { useState, useEffect, useCallback } from "react";
import { getAdminMessages, patchAdminMessageStatus } from "../services/contactAdminService";

export default function useContactAdmin() {
    const [messages, setMessages] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [statusFilter, setStatusFilter] = useState("all"); // 'all' | status_id

    const loadMessages = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const params = { page, limit };
            if (statusFilter !== "all") {
                params.status_id = Number(statusFilter);
            }

            const data = await getAdminMessages(params);
            setMessages(data.items ?? []);
            setPagination(data.pagination ?? null);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, statusFilter]);

    const changeStatus = async (id, statusId) => {
        try {
            // Optimistic UI updates
            setMessages((prev) => 
                prev.map((msg) => (msg.id === id ? { ...msg, status: { ...msg.status, id: statusId } } : msg))
            );
            await patchAdminMessageStatus(id, statusId);
            await loadMessages();
        } catch (err) {
            console.error(err);
            loadMessages(); // Revert
            throw err;
        }
    };

    useEffect(() => {
        loadMessages();
    }, [loadMessages]);

    return {
        messages,
        pagination,
        loading,
        error,
        page,
        setPage,
        statusFilter,
        setStatusFilter,
        changeStatus,
        refresh: loadMessages
    };
}
