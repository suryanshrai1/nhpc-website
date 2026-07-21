import { useEffect, useState } from "react";
import { getTender } from "../services/tenderService";

export default function useTender(slug) {
    const [tender, setTender] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        async function loadTender() {
            try {
                setLoading(true);
                setError(null);
                const data = await getTender(slug);
                setTender(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadTender();
    }, [slug]);

    return {
        tender,
        loading,
        error,
    };
}
