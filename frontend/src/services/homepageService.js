import api from "./api";

export const getHomepage = async () => {
    const response = await api.get("/homepage?populate=*");
    return response.data;
};