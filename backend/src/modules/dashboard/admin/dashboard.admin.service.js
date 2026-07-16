import dashboardRepository from "./dashboard.admin.repository.js";

class DashboardService {

    async getDashboard() {

        const [

            statistics,

            recentProjects,

            recentNews,

            recentCareers,

            recentTenders

        ] = await Promise.all([

            dashboardRepository.getStatistics(),

            dashboardRepository.getRecentProjects(),

            dashboardRepository.getRecentNews(),

            dashboardRepository.getRecentCareers(),

            dashboardRepository.getRecentTenders()

        ]);

        return {

            statistics,

            recentProjects: recentProjects.map(project => ({

                id: Number(project.id),

                name: project.name,

                slug: project.slug,

                createdAt: project.created_at

            })),

            recentNews: recentNews.map(news => ({

                id: Number(news.id),

                title: news.title,

                slug: news.slug,

                publishedAt: news.published_at

            })),

            recentCareers: recentCareers.map(job => ({

                id: Number(job.id),

                title: job.title,

                slug: job.slug,

                publishedAt: job.published_at

            })),

            recentTenders: recentTenders.map(tender => ({

                id: Number(tender.id),

                title: tender.title,

                slug: tender.slug,

                publishedAt: tender.published_at

            }))

        };

    }

}

export default new DashboardService();