import { useCallback, useEffect, useMemo, useState } from "react";
import { getCareers } from "../services/careerService";

export default function useCareers(params = {}) {
    const memoParams = useMemo(() => params, [JSON.stringify(params)]);

    const [jobs, setJobs] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadJobs = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getCareers(memoParams);
            setJobs(data.items ?? []);
            setPagination(data.pagination ?? null);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [memoParams]);

    useEffect(() => {
        loadJobs();
    }, [loadJobs]);

    return {
        jobs,
        pagination,
        loading,
        error,
        refresh: loadJobs,
    };
}
