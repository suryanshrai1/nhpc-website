import prisma from "../../config/prisma.js";

import {

    PROJECT_CARD_SELECT,

    NEWS_CARD_SELECT,

    SUSTAINABILITY_CARD_SELECT,

    OPS_CARD_SELECT

} from "./constants/homepage.selects.js";

class HomepageRepository {

    async getHomepageData() {

        const tasks = [

            this.getSections(),

            this.getStatistics(),

            this.getFeaturedProjects(),

            this.getLatestNews(),

            this.getSustainability(),

            this.getInvestorHighlights(),

            this.getOperationalStations()

        ];

        const [

            sections,

            statistics,

            featuredProjects,

            latestNews,

            sustainability,

            investorHighlights,

            operationalStations

        ] = await Promise.all(tasks);

        return {

            sections,

            statistics,

            featuredProjects,

            latestNews,

            sustainability,

            investorHighlights,

            operationalStations

        };

    }

    async getSections() {

        return prisma.homepage_sections.findMany({

            where: {

                is_visible: true

            },

            include: {

                homepage_content: true,

                hero_buttons: {

                    where: {

                        is_active: true

                    },

                    orderBy: {

                        display_order: "asc"

                    }

                }

            },

            orderBy: {

                display_order: "asc"

            }

        });

    }

    async getStatistics() {

        return prisma.statistics.findMany({

            where: {

                is_active: true

            },

            orderBy: {

                display_order: "asc"

            }

        });

    }

    async getFeaturedProjects() {

        return prisma.projects.findMany({

            where: {

                is_active: true,

                is_featured: true

            },

            select: PROJECT_CARD_SELECT,

            orderBy: {

                display_order: "asc"

            },

            take: 6

        });

    }

    async getLatestNews() {

        return prisma.news.findMany({

            where: {

                is_active: true,

                is_featured: true

            },

            select: NEWS_CARD_SELECT,

            orderBy: [

                {

                    display_order: "asc"

                },

                {

                    published_at: "desc"

                }

            ],

            take: 4

        });

    }

    async getSustainability() {

        return prisma.sustainability.findMany({

            where: {

                is_active: true,

                is_featured: true

            },

            select: SUSTAINABILITY_CARD_SELECT,

            orderBy: {

                display_order: "asc"

            },

            take: 4

        });

    }

    async getInvestorHighlights() {

        const latestYear = await prisma.financial_years.findFirst({

            where: {

                is_active: true

            },

            orderBy: {

                end_year: "desc"

            }

        });

        if (!latestYear) {

            return [];

        }

        return prisma.investor_highlights.findMany({

            where: {

                financial_year_id: latestYear.id

            },

            include: {

                financial_years: true

            },

            orderBy: {

                display_order: "asc"

            }

        });

    }

    async getOperationalStations() {

        return prisma.operational_power_stations.findMany({

            where: {

                is_active: true,

                is_featured: true

            },

            select: OPS_CARD_SELECT,

            orderBy: {

                display_order: "asc"

            },

            take: 6

        });

    }

}

export default new HomepageRepository();