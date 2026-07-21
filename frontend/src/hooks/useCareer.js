import { useEffect, useState } from "react";
import { getCareer } from "../services/careerService";

export default function useCareer(slug) {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        async function loadJob() {
            try {
                setLoading(true);
                setError(null);
                const data = await getCareer(slug);
                setJob(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadJob();
    }, [slug]);

    return {
        job,
        loading,
        error,
    };
}
