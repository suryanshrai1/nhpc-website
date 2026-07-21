import { useEffect, useState } from "react";
import { getFinancialYears } from "../services/investorService";

export default function useFinancialYears() {
    const [financialYears, setFinancialYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadYears() {
            try {
                setLoading(true);
                setError(null);
                const data = await getFinancialYears();
                setFinancialYears(data ?? []);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadYears();
    }, []);

    return {
        financialYears,
        loading,
        error,
    };
}
