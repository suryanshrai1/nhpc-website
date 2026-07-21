import api from "../api/api.js";

// GET raw editable homepage options
export const getAdminHomepageData = async () => {
    const { data } = await api.get("/admin/homepage");
    return data.data;
};

// PUT/update Hero section content (title, subtitle, description, media, action buttons)
export const updateAdminHero = async (payload) => {
    const { data } = await api.put("/admin/homepage/hero", payload);
    return data.data;
};
