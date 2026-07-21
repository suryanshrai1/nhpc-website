import { useState, useEffect, useCallback } from "react";
import { getAdminMediaList, uploadAdminMedia, deleteAdminMedia } from "../services/mediaAdminService";

export default function useMediaAdmin() {
    const [mediaItems, setMediaItems] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [page, setPage] = useState(1);
    const [limit] = useState(24);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all"); // 'all' | 'image' | 'video' | 'pdf'

    const loadMedia = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Map filters to backend query payload parameters
            const params = {
                page,
                limit
            };
            if (search) params.search = search;
            if (typeFilter !== "all") params.type = typeFilter;

            const data = await getAdminMediaList(params);
            
            // Handle array or paginated responses
            if (data && Array.isArray(data)) {
                setMediaItems(data);
                setPagination(null);
            } else if (data && data.items) {
                setMediaItems(data.items);
                setPagination(data.pagination);
            } else {
                setMediaItems([]);
            }
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, search, typeFilter]);

    const uploadFile = async (file, metadata = {}) => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", file);
            if (metadata.alt_text) formData.append("alt_text", metadata.alt_text);
            if (metadata.caption) formData.append("caption", metadata.caption);
            if (metadata.description) formData.append("description", metadata.description);

            const result = await uploadAdminMedia(formData);
            setMediaItems((prev) => [result, ...prev]);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            setUploading(false);
        }
    };

    const removeFile = async (id) => {
        try {
            await deleteAdminMedia(id);
            setMediaItems((prev) => prev.filter((item) => item.id !== id && Number(item.id) !== Number(id)));
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    useEffect(() => {
        loadMedia();
    }, [loadMedia]);

    return {
        mediaItems,
        pagination,
        loading,
        error,
        uploading,
        page,
        setPage,
        search,
        setSearch,
        typeFilter,
        setTypeFilter,
        uploadFile,
        removeFile,
        refresh: loadMedia
    };
}
