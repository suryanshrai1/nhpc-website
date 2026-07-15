import prisma from "../../../config/prisma.js";

import BaseRepository from "../../../core/repositories/BaseRepository.js";

class SustainabilityAdminRepository extends BaseRepository {

    constructor() {

        super(prisma.sustainability);

    }

    async getSustainabilityById(id) {

        return this.findById(id);

    }

    async getSustainabilityBySlug(slug) {

        return this.model.findUnique({

            where: {

                slug

            }

        });

    }

    async createSustainability(data) {

        return this.create(data);

    }

    async updateSustainability(id, data) {

        return this.update(id, data);

    }

    async updateSustainabilityStatus(id, is_active) {

        return this.update(

            id,

            {

                is_active,

                updated_at: new Date()

            }

        );

    }

    async deleteSustainability(id) {

        return this.delete(id);

    }

}

export default new SustainabilityAdminRepository();