import api from "../api/api.js";

// Fetch paginated, filterable media assets list
export const getAdminMediaList = async (params = {}) => {
    const { data } = await api.get("/admin/media", { params });
    return data.data;
};

// Fetch single media file details
export const getAdminMediaById = async (id) => {
    const { data } = await api.get(`/admin/media/${id}`);
    return data.data;
};

// Upload new media asset multipart file
export const uploadAdminMedia = async (formData) => {
    const { data } = await api.post("/admin/media", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return data.data;
};

// Delete a media asset record
export const deleteAdminMedia = async (id) => {
    const { data } = await api.delete(`/admin/media/${id}`);
    return data.data;
};
