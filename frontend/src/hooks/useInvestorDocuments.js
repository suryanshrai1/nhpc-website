import { useCallback, useEffect, useState, useMemo } from "react";
import { getInvestorDocuments } from "../services/investorService";

export default function useInvestorDocuments(params = {}) {
    const memoParams = useMemo(() => params, [JSON.stringify(params)]);

    const [documents, setDocuments] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadDocuments = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getInvestorDocuments(memoParams);
            setDocuments(data.items ?? []);
            setPagination(data.pagination ?? null);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [memoParams]);

    useEffect(() => {
        loadDocuments();
    }, [loadDocuments]);

    return {
        documents,
        pagination,
        loading,
        error,
        refresh: loadDocuments,
    };
}
