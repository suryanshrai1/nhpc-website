import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";

export default function useProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await getProjects();
                setProjects(response.data || []);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    return {
        projects,
        loading,
        error,
    };
}
