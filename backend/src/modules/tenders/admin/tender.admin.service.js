import CrudService from "../../../core/services/CrudService.js";

import tenderAdminRepository from "./tender.admin.repository.js";

import ApiError from "../../../errors/ApiError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import {

    TENDER_CARD_SELECT,

    TENDER_DETAIL_SELECT

} from "../constants/tender.selects.js";

import {

    mapTenderCard,

    mapTenderDetails

} from "../tender.mapper.js";

class TenderAdminService extends CrudService {

    constructor() {

        super(tenderAdminRepository);

    }

    // =====================================================
    // Listing
    // =====================================================

    async getTenders({

        page = 1,

        limit = 10

    }) {

        return this.list({

            page,

            limit,

            select: TENDER_CARD_SELECT,

            orderBy: [

                {

                    updated_at: "desc"

                },

                {

                    id: "desc"

                }

            ],

            mapper: mapTenderCard

        });

    }

    // =====================================================
    // Single
    // =====================================================

    async getTenderById(id) {

        const tender = await this.get(

            BigInt(id),

            TENDER_DETAIL_SELECT

        );

        return mapTenderDetails(

            tender

        );

    }

    // =====================================================
    // Create
    // =====================================================

    async createTender(data) {

        const existingTender = await tenderAdminRepository.getTenderBySlug(

            data.slug

        );

        if (existingTender) {

            throw new ApiError(

                HTTP_STATUS.CONFLICT,

                "A tender with this slug already exists."

            );

        }

        return tenderAdminRepository.createTender({

            ...data,

            tender_category_id: BigInt(data.tender_category_id),

            tender_status_id: BigInt(data.tender_status_id)

        });

    }

    // =====================================================
    // Update
    // =====================================================

    async updateTender(id, data) {

        const tenderId = BigInt(id);

        const existingTender = await tenderAdminRepository.getTenderById(

            tenderId

        );

        if (!existingTender) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Tender not found."

            );

        }

        if (existingTender.slug !== data.slug) {

            const duplicate = await tenderAdminRepository.getTenderBySlug(

                data.slug

            );

            if (duplicate) {

                throw new ApiError(

                    HTTP_STATUS.CONFLICT,

                    "A tender with this slug already exists."

                );

            }

        }

        return tenderAdminRepository.updateTender(

            tenderId,

            {

                ...data,

                tender_category_id: BigInt(

                    data.tender_category_id

                ),

                tender_status_id: BigInt(

                    data.tender_status_id

                ),

                updated_at: new Date()

            }

        );

    }

    // =====================================================
    // Status
    // =====================================================

    async updateTenderStatus(id, is_active) {

        const tenderId = BigInt(id);

        const tender = await tenderAdminRepository.getTenderById(

            tenderId

        );

        if (!tender) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Tender not found."

            );

        }

        return tenderAdminRepository.updateTenderStatus(

            tenderId,

            is_active

        );

    }

    // =====================================================
    // Delete
    // =====================================================

    async deleteTender(id) {

        const tenderId = BigInt(id);

        const tender = await tenderAdminRepository.getTenderById(

            tenderId

        );

        if (!tender) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Tender not found."

            );

        }

        await tenderAdminRepository.deleteTender(

            tenderId

        );

    }

}

export default new TenderAdminService();