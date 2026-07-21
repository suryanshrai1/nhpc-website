import api from "../api/api.js";

export const getMediaList = async () => {
    const { data } = await api.get("/media");
    return data.data;
};

export const getMediaItem = async (id) => {
    const { data } = await api.get(`/media/${id}`);
    return data.data;
};
