import { useEffect, useState } from "react";
import { getLeadership } from "../services/aboutService";

export default function useAbout() {
    const [leadership, setLeadership] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadLeadership = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getLeadership({ limit: 50 }); // Load all active team members
            setLeadership(data.items ?? []);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLeadership();
    }, []);

    return {
        leadership,
        loading,
        error,
        refresh: loadLeadership,
    };
}
