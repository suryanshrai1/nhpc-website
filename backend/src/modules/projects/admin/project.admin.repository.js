import prisma from "../../../config/prisma.js";

import BaseRepository from "../../../core/repositories/BaseRepository.js";

class ProjectAdminRepository extends BaseRepository {

    constructor() {

        super(prisma.projects);

    }

    // =====================================================
    // Find By Slug
    // =====================================================

    async getProjectBySlug(slug) {

        return this.model.findUnique({

            where: {

                slug

            }

        });

    }

    // =====================================================
    // Create Project
    // =====================================================

    async createProject(data) {

        return this.create(

            data

        );

    }

}

export default new ProjectAdminRepository();