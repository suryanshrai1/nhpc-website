import CrudService from "../../../core/services/CrudService.js";

import leadershipAdminRepository from "./leadership.admin.repository.js";

import ApiError from "../../../errors/ApiError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import {

    LEADERSHIP_CARD_SELECT,

    LEADERSHIP_DETAIL_SELECT

} from "../constants/leadership.selects.js";

import {

    mapLeaderCard,

    mapLeaderDetails

} from "../leadership.mapper.js";

class LeadershipAdminService extends CrudService {

    constructor() {

        super(

            leadershipAdminRepository

        );

    }

    async getLeaders({

        page = 1,

        limit = 10

    }) {

        return this.list({

            page,

            limit,

            select: LEADERSHIP_CARD_SELECT,

            orderBy: [

                {

                    updated_at: "desc"

                },

                {

                    id: "desc"

                }

            ],

            mapper: mapLeaderCard

        });

    }

    async getLeaderById(id) {

        const leader = await this.get(

            BigInt(id),

            LEADERSHIP_DETAIL_SELECT

        );

        return mapLeaderDetails(

            leader

        );

    }

    async createLeader(data) {

        const existingLeader = await leadershipAdminRepository.getLeaderBySlug(

            data.slug

        );

        if (existingLeader) {

            throw new ApiError(

                HTTP_STATUS.CONFLICT,

                "A leader with this slug already exists."

            );

        }

        return leadershipAdminRepository.createLeader({

            ...data,

            leadership_level_id: BigInt(

                data.leadership_level_id

            )

        });

    }

    async updateLeader(id, data) {

        const leaderId = BigInt(id);

        const leader = await leadershipAdminRepository.getLeaderById(

            leaderId

        );

        if (!leader) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Leader not found."

            );

        }

        if (leader.slug !== data.slug) {

            const duplicate = await leadershipAdminRepository.getLeaderBySlug(

                data.slug

            );

            if (duplicate) {

                throw new ApiError(

                    HTTP_STATUS.CONFLICT,

                    "A leader with this slug already exists."

                );

            }

        }

        return leadershipAdminRepository.updateLeader(

            leaderId,

            {

                ...data,

                leadership_level_id: BigInt(

                    data.leadership_level_id

                ),

                updated_at: new Date()

            }

        );

    }

    async updateLeaderStatus(id, is_active) {

        const leaderId = BigInt(id);

        const leader = await leadershipAdminRepository.getLeaderById(

            leaderId

        );

        if (!leader) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Leader not found."

            );

        }

        return leadershipAdminRepository.updateLeaderStatus(

            leaderId,

            is_active

        );

    }

    async deleteLeader(id) {

        const leaderId = BigInt(id);

        const leader = await leadershipAdminRepository.getLeaderById(

            leaderId

        );

        if (!leader) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Leader not found."

            );

        }

        await leadershipAdminRepository.deleteLeader(

            leaderId

        );

    }

}

export default new LeadershipAdminService();