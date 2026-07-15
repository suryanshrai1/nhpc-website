import prisma from "../../../config/prisma.js";

import BaseRepository from "../../../core/repositories/BaseRepository.js";

class NewsAdminRepository extends BaseRepository {

    constructor() {

        super(prisma.news);

    }

    // =====================================================
    // Find By Id
    // =====================================================

    async getNewsById(id) {

        return this.findById(id);

    }

    // =====================================================
    // Find By Slug
    // =====================================================

    async getNewsBySlug(slug) {

        return this.model.findUnique({

            where: {

                slug

            }

        });

    }

    // =====================================================
    // Create
    // =====================================================

    async createNews(data) {

        return this.create(data);

    }

    // =====================================================
    // Update
    // =====================================================

    async updateNews(id, data) {

        return this.update(id, data);

    }

    // =====================================================
    // Status
    // =====================================================

    async updateNewsStatus(id, is_active) {

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

    async deleteNews(id) {

        return this.delete(id);

    }

}

export default new NewsAdminRepository();