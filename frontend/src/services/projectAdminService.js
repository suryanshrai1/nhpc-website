import api from "../api/api.js";

// Fetch paginated projects list for the admin CMS table
export const getAdminProjects = async (params = {}) => {
    const { data } = await api.get("/admin/projects", { params });
    return data.data;
};

// Fetch details for a specific project by numeric ID
export const getAdminProjectById = async (id) => {
    const { data } = await api.get(`/admin/projects/${id}`);
    return data.data;
};

// Create a new project record
export const createAdminProject = async (payload) => {
    const { data } = await api.post("/admin/projects", payload);
    return data.data;
};

// Update an existing project record
export const updateAdminProject = async (id, payload) => {
    const { data } = await api.put(`/admin/projects/${id}`, payload);
    return data.data;
};

// Patch toggled status details (is_active)
export const patchAdminProjectStatus = async (id, is_active) => {
    const { data } = await api.patch(`/admin/projects/${id}/status`, { is_active });
    return data.data;
};

// Delete a project record from database
export const deleteAdminProject = async (id) => {
    const { data } = await api.delete(`/admin/projects/${id}`);
    return data.data;
};

// Fetch lookup metadata (states, types, statuses, capacity units)
export const getAdminLookups = async () => {
    const { data } = await api.get("/admin/lookups");
    return data.data;
};
