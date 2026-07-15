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

    // update
    async updateProject(id, data) {

        return this.update(

            id,

            data

        );

    }

    async getProjectById(id) {

        return this.findById(

            id

        );

    }

    // =====================================================
    // Update Project Status
    // =====================================================

    async updateProjectStatus(id, is_active) {

        return this.update(

            id,

            {

                is_active,

                updated_at: new Date()

            }

        );

    }

    // =====================================================
    // Delete Project
    // =====================================================

    async deleteProject(id) {

        return this.delete(

            id

        );

    }

}

export default new ProjectAdminRepository();