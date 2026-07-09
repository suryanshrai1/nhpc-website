import prisma from "../../config/prisma.js";

import {

    PROJECT_CARD_SELECT,

    PROJECT_DETAIL_SELECT,

    PROJECT_RELATED_SELECT

} from "./constants/project.selects.js";

class ProjectRepository {

    // =====================================================
    // Get Projects (Listing)
    // =====================================================

    async getProjects({

        page = 1,

        limit = 12

    }) {

        const skip = (page - 1) * limit;

        const where = {

            is_active: true

        };

        const [items, total] = await Promise.all([

            prisma.projects.findMany({

                where,

                select: PROJECT_CARD_SELECT,

                orderBy: {

                    display_order: "asc"

                },

                skip,

                take: limit

            }),

            prisma.projects.count({

                where

            })

        ]);

        return {

            items,

            total

        };

    }

    // =====================================================
    // Get Single Project
    // =====================================================

    async getProjectBySlug(slug) {

        return prisma.projects.findFirst({

            where: {

                slug,

                is_active: true

            },

            select: PROJECT_DETAIL_SELECT

        });

    }

    // =====================================================
    // Related Projects
    // =====================================================

    async getRelatedProjects(projectId, limit = 4) {

        return prisma.projects.findMany({

            where: {

                id: {

                    not: projectId

                },

                is_active: true

            },

            select: PROJECT_RELATED_SELECT,

            take: limit

        });

    }

}

export default new ProjectRepository();