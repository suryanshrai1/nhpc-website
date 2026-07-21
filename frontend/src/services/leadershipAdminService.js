import api from "../api/api.js";

// Fetch paginated leadership profile items
export const getAdminLeaders = async (params = {}) => {
    const { data } = await api.get("/admin/leadership", { params });
    return data.data;
};

// Fetch single leader details
export const getAdminLeaderById = async (id) => {
    const { data } = await api.get(`/admin/leadership/${id}`);
    return data.data;
};

// Create a new board member profile
export const createAdminLeader = async (payload) => {
    const { data } = await api.post("/admin/leadership", payload);
    return data.data;
};

// Update an existing board member profile
export const updateAdminLeader = async (id, payload) => {
    const { data } = await api.put(`/admin/leadership/${id}`, payload);
    return data.data;
};

// Patch toggled status details (is_active)
export const patchAdminLeaderStatus = async (id, is_active) => {
    const { data } = await api.patch(`/admin/leadership/${id}/status`, { is_active });
    return data.data;
};

// Delete a board member profile
export const deleteAdminLeader = async (id) => {
    const { data } = await api.delete(`/admin/leadership/${id}`);
    return data.data;
};

// Fetch lookup metadata
export const getAdminLookups = async () => {
    const { data } = await api.get("/admin/lookups");
    return data.data;
};
