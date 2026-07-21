import { useCallback, useEffect, useMemo, useState } from "react";
import { getTenders } from "../services/tenderService";

export default function useTenders(params = {}) {
    const memoParams = useMemo(() => params, [JSON.stringify(params)]);

    const [tenders, setTenders] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTenders = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getTenders(memoParams);
            setTenders(data.items ?? []);
            setPagination(data.pagination ?? null);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [memoParams]);

    useEffect(() => {
        loadTenders();
    }, [loadTenders]);

    return {
        tenders,
        pagination,
        loading,
        error,
        refresh: loadTenders,
    };
}
