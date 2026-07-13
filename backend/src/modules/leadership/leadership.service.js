import leadershipRepository from "./leadership.repository.js";

import ApiError from "../../errors/ApiError.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import buildPagination from "../../utils/pagination.js";

import {

    mapLeaderCard,

    mapLeaderDetails

} from "./leadership.mapper.js";

class LeadershipService {

    // =====================================================
    // Leadership Listing
    // =====================================================

    async getLeadership({

        page = 1,

        limit = 10

    }) {

        const {

            items,

            total

        } = await leadershipRepository.getLeadership({

            page,

            limit

        });

        const mappedItems = items.map(

            mapLeaderCard

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
    // Single Leader
    // =====================================================

    async getLeaderBySlug(slug) {

        const leader = await leadershipRepository.getLeaderBySlug(

            slug

        );

        if (!leader) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Leader not found."

            );

        }

        return mapLeaderDetails(

            leader

        );

    }

}

export default new LeadershipService();