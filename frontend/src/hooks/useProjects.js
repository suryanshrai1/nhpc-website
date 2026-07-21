import { useCallback, useEffect, useMemo, useState } from "react";
import { getProjects } from "../services/projectService";

export default function useProjects(params = {}) {

  const memoParams = useMemo(() => params, [JSON.stringify(params)]);

  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {

    try {

      setLoading(true);
      setError(null);

      const data = await getProjects(memoParams);

      setProjects(data.items ?? []);
      setPagination(data.pagination ?? null);

    } catch (err) {

      console.error(err);

      setError(err);

    } finally {

      setLoading(false);

    }

  }, [memoParams]);

  useEffect(() => {

    loadProjects();

  }, [loadProjects]);

  return {

    projects,
    pagination,
    loading,
    error,
    refresh: loadProjects

  };

}