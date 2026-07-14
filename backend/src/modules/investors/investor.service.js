import investorRepository from "./investor.repository.js";

import buildPagination from "../../utils/pagination.js";

import {

    mapFinancialYear,

    mapInvestorHighlight,

    mapInvestorDocument

} from "./investor.mapper.js";

class InvestorService {

    // =====================================================
    // Financial Years
    // =====================================================

    async getFinancialYears() {

        const years = await investorRepository.getFinancialYears();

        return years.map(

            mapFinancialYear

        );

    }

    // =====================================================
    // Investor Highlights
    // =====================================================

    async getInvestorHighlights() {

        const highlights = await investorRepository.getInvestorHighlights();

        return highlights.map(

            mapInvestorHighlight

        );

    }

    // =====================================================
    // Investor Documents
    // =====================================================

    async getInvestorDocuments({

        page = 1,

        limit = 10

    }) {

        const {

            items,

            total

        } = await investorRepository.getInvestorDocuments({

            page,

            limit

        });

        const mappedItems = items.map(

            mapInvestorDocument

        );

        return {

            items: mappedItems,

            pagination: buildPagination({

                page,

                limit,

                total,

                count: mappedItems.length

            })

        };

    }

}

export default new InvestorService();