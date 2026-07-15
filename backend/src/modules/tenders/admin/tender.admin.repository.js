import prisma from "../../../config/prisma.js";

import BaseRepository from "../../../core/repositories/BaseRepository.js";

class TenderAdminRepository extends BaseRepository {

    constructor() {

        super(prisma.tenders);

    }

    // =====================================================
    // Find By Id
    // =====================================================

    async getTenderById(id) {

        return this.findById(id);

    }

    // =====================================================
    // Find By Slug
    // =====================================================

    async getTenderBySlug(slug) {

        return this.model.findUnique({

            where: {

                slug

            }

        });

    }

    // =====================================================
    // Create
    // =====================================================

    async createTender(data) {

        return this.create(data);

    }

    // =====================================================
    // Update
    // =====================================================

    async updateTender(id, data) {

        return this.update(id, data);

    }

    // =====================================================
    // Update Status
    // =====================================================

    async updateTenderStatus(id, is_active) {

        return this.update(

            id,

            {

                is_active,

                updated_at: new Date()

            }

        );

    }

    // =====================================================
    // Delete
    // =====================================================

    async deleteTender(id) {

        return this.delete(id);

    }

}

export default new TenderAdminRepository();