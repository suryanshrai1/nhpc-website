import dashboardRepository from "./dashboard.repository.js";

class DashboardService {
    async getDashboard() {
        const [statistics, recentActivity] = await Promise.all([
            dashboardRepository.getStatistics(),
            dashboardRepository.getRecentActivity()
        ]);

        return {
            statistics,
            recentActivity,
            system: {
                version: "1.0.0",
                environment: process.env.NODE_ENV || "development",
                databaseStatus: "Connected"
            }
        };
    }
}

export default new DashboardService();