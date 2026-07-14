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

            capacity_unit_id: BigInt(data.capacity_unit_id)

        });

    }

}

export default new ProjectAdminService();