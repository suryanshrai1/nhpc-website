import prisma from "../../../config/prisma.js";

import BaseRepository from "../../../core/repositories/BaseRepository.js";

class CareerAdminRepository extends BaseRepository {

    constructor() {

        super(prisma.job_openings);

    }

    // =====================================================
    // Find By Id
    // =====================================================

    async getCareerById(id) {

        return this.findById(id);

    }

    // =====================================================
    // Find By Slug
    // =====================================================

    async getCareerBySlug(slug) {

        return this.model.findUnique({

            where: {

                slug

            }

        });

    }

    // =====================================================
    // Create
    // =====================================================

    async createCareer(data) {

        return this.create(data);

    }

    // =====================================================
    // Update
    // =====================================================

    async updateCareer(id, data) {

        return this.update(id, data);

    }

    // =====================================================
    // Update Status
    // =====================================================

    async updateCareerStatus(id, is_active) {

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

    async deleteCareer(id) {

        return this.delete(id);

    }

}

export default new CareerAdminRepository();