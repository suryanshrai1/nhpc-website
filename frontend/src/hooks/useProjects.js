import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/project.api";
import { getProjectBySlug } from "../api/project.api";


export default function useProjects() {
    return useQuery({
        queryKey: ["projects"],
        queryFn: getProjects,
    });
}

export default function useProject(slug) {
    return useQuery({
        queryKey: ["project", slug],
        queryFn: () => getProjectBySlug(slug),
        enabled: !!slug,
    });
}