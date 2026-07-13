import tenderRepository from "./tender.repository.js";

import ApiError from "../../errors/ApiError.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import buildPagination from "../../utils/pagination.js";

import {

    mapTenderCard,

    mapTenderDetails

} from "./tender.mapper.js";

class TenderService {

    // =====================================================
    // Tender Listing
    // =====================================================

    async getTenders({

        page = 1,

        limit = 10

    }) {

        const {

            items,

            total

        } = await tenderRepository.getTenders({

            page,

            limit

        });

        const mappedItems = items.map(

            mapTenderCard

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

    // =====================================================
    // Single Tender
    // =====================================================

    async getTenderBySlug(slug) {

        const tender = await tenderRepository.getTenderBySlug(

            slug

        );

        if (!tender) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Tender not found."

            );

        }

        return mapTenderDetails(

            tender

        );

    }

}

export default new TenderService();