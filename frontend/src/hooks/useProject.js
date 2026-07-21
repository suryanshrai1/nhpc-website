import { useEffect, useState } from "react";
import { getProject } from "../services/projectService";

export default function useProject(slug) {

  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {

    if (!slug) return;

    async function loadProject() {

      try {

        setLoading(true);

        setError(null);

        const data = await getProject(slug);

        setProject(data);

      } catch (err) {

        console.error(err);

        setError(err);

      } finally {

        setLoading(false);

      }

    }

    loadProject();

  }, [slug]);

  return {

    project,
    loading,
    error

  };

}