import api from "../api/api.js";

export const getLeadership = async (params = {}) => {
    const { data } = await api.get("/leadership", {
        params,
    });
    return data.data;
};

export const getLeaderBySlug = async (slug) => {
    const { data } = await api.get(`/leadership/${slug}`);
    return data.data;
};
