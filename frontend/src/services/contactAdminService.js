import api from "../api/api.js";

// Fetch paginated unread/read messages
export const getAdminMessages = async (params = {}) => {
    const { data } = await api.get("/admin/contact-messages", { params });
    return data.data;
};

// Fetch details for a specific message by ID
export const getAdminMessageById = async (id) => {
    const { data } = await api.get(`/admin/contact-messages/${id}`);
    return data.data;
};

// Patch status change workflow
export const patchAdminMessageStatus = async (id, message_status_id) => {
    const { data } = await api.patch(`/admin/contact-messages/${id}/status`, { message_status_id });
    return data.data;
};
