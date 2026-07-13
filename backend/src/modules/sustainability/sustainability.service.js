import sustainabilityRepository from "./sustainability.repository.js";

import ApiError from "../../errors/ApiError.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import buildPagination from "../../utils/pagination.js";

import {

    mapSustainabilityCard,

    mapSustainabilityDetails

} from "./sustainability.mapper.js";

class SustainabilityService {

    // =====================================================
    // Sustainability Listing
    // =====================================================

    async getSustainability({

        page = 1,

        limit = 10

    }) {

        const {

            items,

            total

        } = await sustainabilityRepository.getSustainability({

            page,

            limit

        });

        const mappedItems = items.map(

            mapSustainabilityCard

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
    // Single Sustainability Article
    // =====================================================

    async getSustainabilityBySlug(slug) {

        const item = await sustainabilityRepository.getSustainabilityBySlug(

            slug

        );

        if (!item) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Sustainability article not found."

            );

        }

        const relatedItems = await sustainabilityRepository.getRelatedSustainability(

            item.id,

            item.sustainability_type_id

        );

        return mapSustainabilityDetails(

            item,

            relatedItems

        );

    }

}

export default new SustainabilityService();