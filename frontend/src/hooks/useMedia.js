import { useEffect, useState } from "react";
import { getMediaList } from "../services/mediaService";

export default function useMedia() {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadMedia = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getMediaList();
            setMediaFiles(data ?? []);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMedia();
    }, []);

    return {
        mediaFiles,
        loading,
        error,
        refresh: loadMedia,
    };
}
