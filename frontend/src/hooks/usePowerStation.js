import { useEffect, useState } from "react";
import { getPowerStationBySlug } from "../services/powerStationService";

export default function usePowerStation(slug) {
    const [station, setStation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        async function loadStation() {
            try {
                setLoading(true);
                setError(null);
                const data = await getPowerStationBySlug(slug);
                setStation(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadStation();
    }, [slug]);

    return {
        station,
        loading,
        error,
    };
}
