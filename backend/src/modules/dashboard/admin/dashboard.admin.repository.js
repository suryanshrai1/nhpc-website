import prisma from "../../../config/prisma.js";

class DashboardRepository {

    async getStatistics() {

        const [

            projects,

            news,

            tenders,

            careers,

            leadership,

            sustainability,

            investors,

            media

        ] = await prisma.$transaction([

            prisma.projects.count(),

            prisma.news.count(),

            prisma.tenders.count(),

            prisma.job_openings.count(),

            prisma.leadership.count(),

            prisma.sustainability.count(),

            prisma.investor_documents.count(),

            prisma.media_files.count()

        ]);

        return {

            projects,

            news,

            tenders,

            careers,

            leadership,

            sustainability,

            investorDocuments: investors,

            mediaFiles: media

        };

    }

    async getRecentProjects() {

        return prisma.projects.findMany({

            take: 5,

            orderBy: {

                created_at: "desc"

            },

            select: {

                id: true,

                name: true,

                slug: true,

                created_at: true

            }

        });

    }

    async getRecentNews() {

        return prisma.news.findMany({

            take: 5,

            orderBy: {

                published_at: "desc"

            },

            select: {

                id: true,

                title: true,

                slug: true,

                published_at: true

            }

        });

    }

    async getRecentCareers() {

        return prisma.job_openings.findMany({

            take: 5,

            orderBy: {

                published_at: "desc"

            },

            select: {

                id: true,

                title: true,

                slug: true,

                published_at: true

            }

        });

    }

    async getRecentTenders() {

        return prisma.tenders.findMany({

            take: 5,

            orderBy: {

                published_at: "desc"

            },

            select: {

                id: true,

                title: true,

                slug: true,

                published_at: true

            }

        });

    }

}

export default new DashboardRepository();