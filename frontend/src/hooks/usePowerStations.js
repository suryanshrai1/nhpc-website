import { useEffect, useState } from "react";
import { getPowerStationsList } from "../services/powerStationService";

export default function usePowerStations() {
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadStations = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPowerStationsList();
            setStations(data);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStations();
    }, []);

    return {
        stations,
        loading,
        error,
        refresh: loadStations,
    };
}
