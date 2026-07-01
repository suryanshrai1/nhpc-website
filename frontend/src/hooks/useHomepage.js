import { useEffect, useState } from "react";
import { getHomepage } from "../services/homepageService";

export default function useHomepage() {
    const [homepage, setHomepage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchHomepage() {
            try {
                const response = await getHomepage();
                setHomepage(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchHomepage();
    }, []);

    return {
        homepage,
        loading,
        error,
    };
}