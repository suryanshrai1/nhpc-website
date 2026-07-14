import prisma from "../../config/prisma.js";

import {

    CAREER_CARD_SELECT,

    CAREER_DETAIL_SELECT

} from "./constants/career.selects.js";

class CareerRepository {

    // =====================================================
    // Job Listings
    // =====================================================

    async getCareers({

        page = 1,

        limit = 10

    }) {

        const skip = (page - 1) * limit;

        const where = {

            is_active: true

        };

        const [items, total] = await Promise.all([

            prisma.job_openings.findMany({

                where,

                select: CAREER_CARD_SELECT,

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

            prisma.job_openings.count({

                where

            })

        ]);

        return {

            items,

            total

        };

    }

    // =====================================================
    // Single Job
    // =====================================================

    async getCareerBySlug(slug) {

        return prisma.job_openings.findFirst({

            where: {

                slug,

                is_active: true

            },

            select: CAREER_DETAIL_SELECT

        });

    }

}

export default new CareerRepository();