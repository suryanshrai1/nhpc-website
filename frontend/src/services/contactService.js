import api from "../api/api.js";

export const submitContactForm = async (formData) => {
    const { data } = await api.post("/contact", formData);
    return data;
};
