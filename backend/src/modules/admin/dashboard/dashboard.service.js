import dashboardRepository from "./dashboard.repository.js";

class DashboardService {

    async getDashboard() {

        const statistics = await dashboardRepository.getStatistics();

        return {

            statistics,

            system: {

                version: "1.0.0"

            }

        };

    }

}

export default new DashboardService();