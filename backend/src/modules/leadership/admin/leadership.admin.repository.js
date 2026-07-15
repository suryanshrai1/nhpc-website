import prisma from "../../../config/prisma.js";

import BaseRepository from "../../../core/repositories/BaseRepository.js";

class LeadershipAdminRepository extends BaseRepository {

    constructor() {

        super(prisma.leadership);

    }

    async getLeaderById(id) {

        return this.findById(id);

    }

    async getLeaderBySlug(slug) {

        return this.model.findUnique({

            where: {

                slug

            }

        });

    }

    async createLeader(data) {

        return this.create(data);

    }

    async updateLeader(id, data) {

        return this.update(id, data);

    }

    async updateLeaderStatus(id, is_active) {

        return this.update(

            id,

            {

                is_active,

                updated_at: new Date()

            }

        );

    }

    async deleteLeader(id) {

        return this.delete(id);

    }

}

export default new LeadershipAdminRepository();