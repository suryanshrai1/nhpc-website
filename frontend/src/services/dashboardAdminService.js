import api from "../api/api.js";

// Fetch aggregated live dashboard statistics and logs
export const getAdminDashboardData = async () => {
    const { data } = await api.get("/admin/dashboard");
    return data.data;
};
