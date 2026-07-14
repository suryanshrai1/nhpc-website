import prisma from "../../config/prisma.js";

import {

    FINANCIAL_YEAR_SELECT,

    INVESTOR_HIGHLIGHT_SELECT,

    INVESTOR_DOCUMENT_SELECT

} from "./constants/investor.selects.js";

class InvestorRepository {

    // =====================================================
    // Financial Years
    // =====================================================

    async getFinancialYears() {

        return prisma.financial_years.findMany({

            where: {

                is_active: true

            },

            select: FINANCIAL_YEAR_SELECT,

            orderBy: {

                end_year: "desc"

            }

        });

    }

    // =====================================================
    // Investor Highlights
    // =====================================================

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

            select: INVESTOR_HIGHLIGHT_SELECT,

            orderBy: {

                display_order: "asc"

            }

        });

    }

    // =====================================================
    // Investor Documents
    // =====================================================

    async getInvestorDocuments({

        page = 1,

        limit = 10

    }) {

        const skip = (page - 1) * limit;

        const where = {

            is_active: true

        };

        const [items, total] = await Promise.all([

            prisma.investor_documents.findMany({

                where,

                select: INVESTOR_DOCUMENT_SELECT,

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

            prisma.investor_documents.count({

                where

            })

        ]);

        return {

            items,

            total

        };

    }

}

export default new InvestorRepository();