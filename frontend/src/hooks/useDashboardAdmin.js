import { useState, useEffect } from "react";
import { getAdminDashboardData } from "../services/dashboardAdminService";

export default function useDashboardAdmin() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getAdminDashboardData();
            setData(res);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();

        // 60-seconds automatic refresh interval
        const interval = setInterval(loadDashboard, 60000);
        return () => clearInterval(interval);
    }, []);

    return {
        data,
        loading,
        error,
        refresh: loadDashboard
    };
}
