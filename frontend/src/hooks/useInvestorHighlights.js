import { useEffect, useState } from "react";
import { getInvestorHighlights } from "../services/investorService";

export default function useInvestorHighlights() {
    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadHighlights = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getInvestorHighlights();
            setHighlights(data ?? []);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHighlights();
    }, []);

    return {
        highlights,
        loading,
        error,
        refresh: loadHighlights,
    };
}
