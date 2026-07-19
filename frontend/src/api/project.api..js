export const getProjects = async () => {
    const { data } = await api.get("/projects");
    return data.data;
};

export const getProjectBySlug = async (slug) => {
    const { data } = await api.get(`/projects/${slug}`);
    return data.data;
};