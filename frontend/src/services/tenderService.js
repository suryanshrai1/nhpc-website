import api from "../api/api.js";

export const getTenders = async (params = {}) => {
    const { data } = await api.get("/tenders", {
        params,
    });
    return data.data;
};

export const getTender = async (slug) => {
    const { data } = await api.get(`/tenders/${slug}`);
    return data.data;
};
