import prisma from "../../../config/prisma.js";

class DashboardRepository {

    async getStatistics() {

        const [

            projects,

            news,

            tenders,

            careers,

            sustainability,

            leadership,

            investorDocuments,

            operationalStations

        ] = await Promise.all([

            prisma.projects.count(),

            prisma.news.count(),

            prisma.tenders.count(),

            prisma.job_openings.count(),

            prisma.sustainability.count(),

            prisma.leadership.count(),

            prisma.investor_documents.count(),

            prisma.operational_power_stations.count()

        ]);

        return {

            projects,

            news,

            tenders,

            careers,

            sustainability,

            leadership,

            investorDocuments,

            operationalStations

        };

    }

}

export default new DashboardRepository();