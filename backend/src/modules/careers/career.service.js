import careerRepository from "./career.repository.js";

import ApiError from "../../errors/ApiError.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import buildPagination from "../../utils/pagination.js";

import {

    mapCareerCard,

    mapCareerDetails

} from "./career.mapper.js";

class CareerService {

    // =====================================================
    // Career Listing
    // =====================================================

    async getCareers({

        page = 1,

        limit = 10

    }) {

        const {

            items,

            total

        } = await careerRepository.getCareers({

            page,

            limit

        });

        const mappedItems = items.map(

            mapCareerCard

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
    // Single Career
    // =====================================================

    async getCareerBySlug(slug) {

        const job = await careerRepository.getCareerBySlug(

            slug

        );

        if (!job) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Job opening not found."

            );

        }

        return mapCareerDetails(

            job

        );

    }

}

export default new CareerService();