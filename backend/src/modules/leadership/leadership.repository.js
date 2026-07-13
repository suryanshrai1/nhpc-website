import prisma from "../../config/prisma.js";

import {

    LEADERSHIP_CARD_SELECT,

    LEADERSHIP_DETAIL_SELECT

} from "./constants/leadership.selects.js";

class LeadershipRepository {

    // =====================================================
    // Leadership Listing
    // =====================================================

    async getLeadership({

        page,

        limit

    }) {

        const skip = (page - 1) * limit;

        const where = {

            is_active: true

        };

        const [

            items,

            total

        ] = await Promise.all([

            prisma.leadership.findMany({

                where,

                select: LEADERSHIP_CARD_SELECT,

                orderBy: [

                    {

                        display_order: "asc"

                    }

                ],

                skip,

                take: limit

            }),

            prisma.leadership.count({

                where

            })

        ]);

        return {

            items,

            total

        };

    }

    // =====================================================
    // Single Leader
    // =====================================================

    async getLeaderBySlug(slug) {

        return prisma.leadership.findFirst({

            where: {

                slug,

                is_active: true

            },

            select: LEADERSHIP_DETAIL_SELECT

        });

    }

}

export default new LeadershipRepository();