import prisma from "../../config/prisma.js";

import {

    SUSTAINABILITY_CARD_SELECT,

    SUSTAINABILITY_DETAIL_SELECT,

    SUSTAINABILITY_RELATED_SELECT

} from "./constants/sustainability.selects.js";

class SustainabilityRepository {

    // =====================================================
    // Sustainability Listing
    // =====================================================

    async getSustainability({

        page = 1,

        limit = 10

    }) {

        const skip = (page - 1) * limit;

        const where = {

            is_active: true

        };

        const [items, total] = await Promise.all([

            prisma.sustainability.findMany({

                where,

                select: SUSTAINABILITY_CARD_SELECT,

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

            prisma.sustainability.count({

                where

            })

        ]);

        return {

            items,

            total

        };

    }

    // =====================================================
    // Single Sustainability Article
    // =====================================================

    async getSustainabilityBySlug(slug) {

        return prisma.sustainability.findFirst({

            where: {

                slug,

                is_active: true

            },

            select: SUSTAINABILITY_DETAIL_SELECT

        });

    }

    // =====================================================
    // Related Sustainability
    // =====================================================

    async getRelatedSustainability(

        sustainabilityId,

        sustainabilityTypeId,

        limit = 4

    ) {

        return prisma.sustainability.findMany({

            where: {

                id: {

                    not: sustainabilityId

                },

                sustainability_type_id: sustainabilityTypeId,

                is_active: true

            },

            select: SUSTAINABILITY_RELATED_SELECT,

            orderBy: {

                published_at: "desc"

            },

            take: limit

        });

    }

    // =====================================================
    // Sustainability Types
    // =====================================================

    async getTypes() {

        return prisma.sustainability_types.findMany({

            where: {

                is_active: true

            },

            orderBy: {

                display_order: "asc"

            }

        });

    }

}

export default new SustainabilityRepository();                                                                                                                                                                      