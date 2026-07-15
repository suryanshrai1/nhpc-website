import CrudService from "../../../core/services/CrudService.js";

import careerAdminRepository from "./career.admin.repository.js";

import ApiError from "../../../errors/ApiError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import {

    CAREER_CARD_SELECT,

    CAREER_DETAIL_SELECT

} from "../constants/career.selects.js";

import {

    mapCareerCard,

    mapCareerDetails

} from "../career.mapper.js";

class CareerAdminService extends CrudService {

    constructor() {

        super(careerAdminRepository);

    }

    // =====================================================
    // Listing
    // =====================================================

    async getCareers({

        page = 1,

        limit = 10

    }) {

        return this.list({

            page,

            limit,

            select: CAREER_CARD_SELECT,

            orderBy: [

                {

                    updated_at: "desc"

                },

                {

                    id: "desc"

                }

            ],

            mapper: mapCareerCard

        });

    }

    // =====================================================
    // Single
    // =====================================================

    async getCareerById(id) {

        const career = await this.get(

            BigInt(id),

            CAREER_DETAIL_SELECT

        );

        return mapCareerDetails(

            career

        );

    }

    // =====================================================
    // Create
    // =====================================================

    async createCareer(data) {

        const existingCareer = await careerAdminRepository.getCareerBySlug(

            data.slug

        );

        if (existingCareer) {

            throw new ApiError(

                HTTP_STATUS.CONFLICT,

                "A job opening with this slug already exists."

            );

        }

        return careerAdminRepository.createCareer({

            ...data,

            employment_type_id: BigInt(

                data.employment_type_id

            )

        });

    }

    // =====================================================
    // Update
    // =====================================================

    async updateCareer(id, data) {

        const careerId = BigInt(id);

        const existingCareer = await careerAdminRepository.getCareerById(

            careerId

        );

        if (!existingCareer) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Job opening not found."

            );

        }

        if (existingCareer.slug !== data.slug) {

            const duplicate = await careerAdminRepository.getCareerBySlug(

                data.slug

            );

            if (duplicate) {

                throw new ApiError(

                    HTTP_STATUS.CONFLICT,

                    "A job opening with this slug already exists."

                );

            }

        }

        return careerAdminRepository.updateCareer(

            careerId,

            {

                ...data,

                employment_type_id: BigInt(

                    data.employment_type_id

                ),

                updated_at: new Date()

            }

        );

    }

    // =====================================================
    // Status
    // =====================================================

    async updateCareerStatus(id, is_active) {

        const careerId = BigInt(id);

        const career = await careerAdminRepository.getCareerById(

            careerId

        );

        if (!career) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Job opening not found."

            );

        }

        return careerAdminRepository.updateCareerStatus(

            careerId,

            is_active

        );

    }

    // =====================================================
    // Delete
    // =====================================================

    async deleteCareer(id) {

        const careerId = BigInt(id);

        const career = await careerAdminRepository.getCareerById(

            careerId

        );

        if (!career) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Job opening not found."

            );

        }

        await careerAdminRepository.deleteCareer(

            careerId

        );

    }

}

export default new CareerAdminService();