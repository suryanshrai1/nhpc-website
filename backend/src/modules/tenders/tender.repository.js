import prisma from "../../config/prisma.js";

import {

    TENDER_CARD_SELECT,

    TENDER_DETAIL_SELECT

} from "./constants/tender.selects.js";

class TenderRepository {

    // =====================================================
    // Tender Listing
    // =====================================================

    async getTenders({

        page = 1,

        limit = 10

    }) {

        const skip = (page - 1) * limit;

        const where = {

            is_active: true

        };

        const [items, total] = await Promise.all([

            prisma.tenders.findMany({

                where,

                select: TENDER_CARD_SELECT,

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

            prisma.tenders.count({

                where

            })

        ]);

        return {

            items,

            total

        };

    }

    // =====================================================
    // Single Tender
    // =====================================================

    async getTenderBySlug(slug) {

        return prisma.tenders.findFirst({

            where: {

                slug,

                is_active: true

            },

            select: TENDER_DETAIL_SELECT

        });

    }

}

export default new TenderRepository();