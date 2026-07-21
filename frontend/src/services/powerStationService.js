import api from "../api/api.js";

// Fetch the power station items from the homepage endpoint since there is no separate public list route
export const getPowerStationsList = async () => {
    const { data } = await api.get("/homepage");
    return data.data.operationalStations?.items ?? [];
};

// Fetch details for a specific power station.
// If the backend has no individual detail route, we look it up from the full list.
export const getPowerStationBySlug = async (slug) => {
    const list = await getPowerStationsList();
    const station = list.find((s) => s.slug === slug);
    return station ?? null;
};
