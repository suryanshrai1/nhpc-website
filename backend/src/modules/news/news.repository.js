import prisma from "../../config/prisma.js";

import {

    NEWS_CARD_SELECT,

    NEWS_DETAIL_SELECT,

    NEWS_RELATED_SELECT

} from "./constants/news.selects.js";

class NewsRepository {

    // =====================================================
    // News Listing
    // =====================================================

    async getNews({

        page = 1,

        limit = 10

    }) {

        const skip = (page - 1) * limit;

        const where = {

            is_active: true

        };

        const [items, total] = await Promise.all([

            prisma.news.findMany({

                where,

                select: NEWS_CARD_SELECT,

                orderBy: [

                    {

                        published_at: "desc"

                    },

                    {

                        display_order: "asc"

                    }

                ],

                skip,

                take: limit

            }),

            prisma.news.count({

                where

            })

        ]);

        return {

            items,

            total

        };

    }

    // =====================================================
    // Single News Article
    // =====================================================

    async getNewsBySlug(slug) {

        return prisma.news.findFirst({

            where: {

                slug,

                is_active: true

            },

            select: NEWS_DETAIL_SELECT

        });

    }

    // =====================================================
    // Related News
    // =====================================================

    async getRelatedNews(newsId, categoryId, limit = 4) {

        return prisma.news.findMany({

            where: {

                id: {

                    not: newsId

                },

                news_category_id: categoryId,

                is_active: true

            },

            select: NEWS_RELATED_SELECT,

            orderBy: {

                published_at: "desc"

            },

            take: limit

        });

    }

    // =====================================================
    // News Categories
    // =====================================================

    async getCategories() {

        return prisma.news_categories.findMany({

            where: {

                is_active: true

            },

            orderBy: {

                display_order: "asc"

            }

        });

    }

}

export default new NewsRepository();