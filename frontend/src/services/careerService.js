import api from "../api/api.js";

export const getCareers = async (params = {}) => {
    const { data } = await api.get("/careers", {
        params,
    });
    return data.data;
};

export const getCareer = async (slug) => {
    const { data } = await api.get(`/careers/${slug}`);
    return data.data;
};
