import api from "../api/api.js";

// Fetch paginated investor documents list for admin CMS table
export const getAdminInvestors = async (params = {}) => {
    const { data } = await api.get("/admin/investors", { params });
    return data.data;
};

// Fetch details for a specific investor document by numeric ID
export const getAdminInvestorById = async (id) => {
    const { data } = await api.get(`/admin/investors/${id}`);
    return data.data;
};

// Create a new investor document record
export const createAdminInvestor = async (payload) => {
    const { data } = await api.post("/admin/investors", payload);
    return data.data;
};

// Update an existing investor document record
export const updateAdminInvestor = async (id, payload) => {
    const { data } = await api.put(`/admin/investors/${id}`, payload);
    return data.data;
};

// Patch toggled status details (is_active)
export const patchAdminInvestorStatus = async (id, is_active) => {
    const { data } = await api.patch(`/admin/investors/${id}/status`, { is_active });
    return data.data;
};

// Delete an investor document record from database
export const deleteAdminInvestor = async (id) => {
    const { data } = await api.delete(`/admin/investors/${id}`);
    return data.data;
};

// Fetch lookup metadata (document types, financial years, etc.)
export const getAdminLookups = async () => {
    const { data } = await api.get("/admin/lookups");
    return data.data;
};
