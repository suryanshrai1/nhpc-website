import api from "./api";

export const getHomepage = async () => {
    const { data } = await api.get("/homepage");
    return data.data;
};