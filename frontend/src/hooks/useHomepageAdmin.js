import { useEffect, useState } from "react";
import { getAdminHomepageData, updateAdminHero } from "../services/homepageAdminService";

export default function useHomepageAdmin() {
    const [heroData, setHeroData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    const loadHomepage = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAdminHomepageData();
            setHeroData(data.hero ?? null);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const saveHero = async (updatedHero) => {
        try {
            setSaving(true);
            const data = await updateAdminHero(updatedHero);
            setHeroData(data.hero ?? null);
            return true;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        loadHomepage();
    }, []);

    return {
        heroData,
        loading,
        error,
        saving,
        saveHero,
        refresh: loadHomepage,
    };
}
