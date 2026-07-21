import api from "../api/api.js";

export const getProjects = async (params = {}) => {
    const { data } = await api.get("/projects", {
        params,
    });

    return data.data;
};

export const getProject = async (slug) => {
    const { data } = await api.get(`/projects/${slug}`);

    return data.data;
};