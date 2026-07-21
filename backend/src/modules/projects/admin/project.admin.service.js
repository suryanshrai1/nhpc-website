import CrudService from "../../../core/services/CrudService.js";

import projectAdminRepository from "./project.admin.repository.js";

import ApiError from "../../../errors/ApiError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import {

    PROJECT_CARD_SELECT,

    PROJECT_DETAIL_SELECT

} from "../constants/project.selects.js";

import {

    mapProjectCard,

    mapProjectDetails

} from "../project.mapper.js";

class ProjectAdminService extends CrudService {

    constructor() {

        super(projectAdminRepository);

    }

    // =====================================================
    // Projects Listing
    // =====================================================

    async getProjects({

        page = 1,

        limit = 10

    }) {

        return this.list({

            page,

            limit,

            select: PROJECT_CARD_SELECT,

            orderBy: [

                {

                    updated_at: "desc"

                },

                {

                    id: "desc"

                }

            ],

            mapper: mapProjectCard

        });

    }

    // =====================================================
    // Single Project
    // =====================================================

    async getProject(id) {

        const project = await this.get(

            BigInt(id),

            PROJECT_DETAIL_SELECT

        );

        return mapProjectDetails(

            project

        );

    }

    // =====================================================
    // Create Project
    // =====================================================

    async createProject(data) {

        const existingProject = await projectAdminRepository.getProjectBySlug(

            data.slug

        );

        if (existingProject) {

            throw new ApiError(

                HTTP_STATUS.CONFLICT,

                "A project with this slug already exists."

            );

        }

        return projectAdminRepository.createProject({

            ...data,

            project_type_id: BigInt(data.project_type_id),

            project_status_id: BigInt(data.project_status_id),

            state_id: BigInt(data.state_id),

            capacity_unit_id: BigInt(data.capacity_unit_id),

            thumbnail_media_id: data.thumbnail_media_id ? BigInt(data.thumbnail_media_id) : null,

            hero_media_id: data.hero_media_id ? BigInt(data.hero_media_id) : null

        });

    }

    // =====================================================
    // Update Project
    // =====================================================

    async updateProject(id, data) {

        const projectId = BigInt(id);

        // Check if project exists
        const existingProject = await projectAdminRepository.getProjectById(

            projectId

        );

        if (!existingProject) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Project not found."

            );

        }

        // Check slug uniqueness only if changed
        if (existingProject.slug !== data.slug) {

            const slugExists = await projectAdminRepository.getProjectBySlug(

                data.slug

            );

            if (slugExists) {

                throw new ApiError(

                    HTTP_STATUS.CONFLICT,

                    "A project with this slug already exists."

                );

            }

        }

        // Update project
        return await projectAdminRepository.updateProject(

            projectId,

            {

                name: data.name,

                slug: data.slug,

                project_type_id: BigInt(data.project_type_id),

                project_status_id: BigInt(data.project_status_id),

                state_id: BigInt(data.state_id),

                capacity: data.capacity,

                capacity_unit_id: BigInt(data.capacity_unit_id),

                summary: data.summary,

                latitude: data.latitude,

                longitude: data.longitude,

                is_featured: data.is_featured,

                display_order: data.display_order,

                is_active: data.is_active,

                thumbnail_media_id: data.thumbnail_media_id ? BigInt(data.thumbnail_media_id) : null,

                hero_media_id: data.hero_media_id ? BigInt(data.hero_media_id) : null,

                updated_at: new Date()

            }

        );

    }

    // =====================================================
    // Update Project Status
    // =====================================================

    async updateProjectStatus(id, is_active) {

        const projectId = BigInt(id);

        const project = await projectAdminRepository.getProjectById(

            projectId

        );

        if (!project) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Project not found."

            );

        }

        return projectAdminRepository.updateProjectStatus(

            projectId,

            is_active

        );

    }

    // =====================================================
    // Delete Project
    // =====================================================

    async deleteProject(id) {

        const projectId = BigInt(id);

        const project = await projectAdminRepository.getProjectById(

            projectId

        );

        if (!project) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Project not found."

            );

        }

        await projectAdminRepository.deleteProject(

            projectId

        );

    }

}

export default new ProjectAdminService();