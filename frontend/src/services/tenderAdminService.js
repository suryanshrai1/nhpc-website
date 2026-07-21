import api from "../api/api.js";

// Fetch paginated tenders list for admin CMS table
export const getAdminTenders = async (params = {}) => {
    const { data } = await api.get("/admin/tenders", { params });
    return data.data;
};

// Fetch details for a specific tender by numeric ID
export const getAdminTenderById = async (id) => {
    const { data } = await api.get(`/admin/tenders/${id}`);
    return data.data;
};

// Create a new tender record
export const createAdminTender = async (payload) => {
    const { data } = await api.post("/admin/tenders", payload);
    return data.data;
};

// Update an existing tender record
export const updateAdminTender = async (id, payload) => {
    const { data } = await api.put(`/admin/tenders/${id}`, payload);
    return data.data;
};

// Patch toggled status details (is_active)
export const patchAdminTenderStatus = async (id, is_active) => {
    const { data } = await api.patch(`/admin/tenders/${id}/status`, { is_active });
    return data.data;
};

// Delete a tender record from database
export const deleteAdminTender = async (id) => {
    const { data } = await api.delete(`/admin/tenders/${id}`);
    return data.data;
};

// Fetch lookup metadata (tender categories, statuses, etc.)
export const getAdminLookups = async () => {
    const { data } = await api.get("/admin/lookups");
    return data.data;
};
