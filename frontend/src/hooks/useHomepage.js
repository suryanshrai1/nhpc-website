import { useQuery } from "@tanstack/react-query";
import { getHomepage } from "../api/homepage.api";

export default function useHomepage() {
    return useQuery({
        queryKey: ["homepage"],
        queryFn: getHomepage,
    });
}