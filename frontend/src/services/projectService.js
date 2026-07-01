import api from "./api";

export const getProjects = async () => {
    const response = await api.get("/projects?populate=*");
    return response.data;
};

export const getProjectBySlug = async (slug) => {
    const response = await api.get(
        `/projects?filters[slug][$eq]=${slug}&populate=*`
    );

    return response.data;
};