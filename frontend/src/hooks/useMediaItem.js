import { useEffect, useState } from "react";
import { getMediaItem } from "../services/mediaService";

export default function useMediaItem(id) {
    const [mediaItem, setMediaItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        async function loadMediaItem() {
            try {
                setLoading(true);
                setError(null);
                const data = await getMediaItem(id);
                setMediaItem(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadMediaItem();
    }, [id]);

    return {
        mediaItem,
        loading,
        error,
    };
}
