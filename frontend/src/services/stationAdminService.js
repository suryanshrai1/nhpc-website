import api from "../api/api.js";

// Fetch paginated stations list for admin CMS table
export const getAdminStations = async (params = {}) => {
  const { data } = await api.get("/admin/stations", { params });
  return data.data;
};

// Fetch details for a specific station by numeric ID
export const getAdminStationById = async (id) => {
  const { data } = await api.get(`/admin/stations/${id}`);
  return data.data;
};

// Create a new station record
export const createAdminStation = async (payload) => {
  const { data } = await api.post("/admin/stations", payload);
  return data.data;
};

// Update an existing station record
export const updateAdminStation = async (id, payload) => {
  const { data } = await api.put(`/admin/stations/${id}`, payload);
  return data.data;
};

// Patch toggled status details (is_active)
export const patchAdminStationStatus = async (id, is_active) => {
  const { data } = await api.patch(`/admin/stations/${id}/status`, { is_active });
  return data.data;
};

// Delete a station record from database
export const deleteAdminStation = async (id) => {
  const { data } = await api.delete(`/admin/stations/${id}`);
  return data.data;
};

// Fetch lookup metadata (states, types, capacity units, etc.)
export const getAdminLookups = async () => {
  const { data } = await api.get("/admin/lookups");
  return data.data;
};
