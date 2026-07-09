import projectRepository from "./project.repository.js";

import ApiError from "../../errors/ApiError.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import {

    mapProjectCard,

    mapProjectDetails

} from "./project.mapper.js";

class ProjectService {

    // =====================================================
    // Projects Listing
    // =====================================================

    async getProjects({

        page = 1,

        limit = 12

    }) {

        const {

            items,

            total

        } = await projectRepository.getProjects({

            page,

            limit

        });

        return {

            items: items.map(mapProjectCard),

            "pagination": {

                "page": 10,

                "limit": 12,

                "total": 6,

                "pages": 1,

                "hasNext": false,

                "hasPrevious": true

            }

        };

    }

    // =====================================================
    // Single Project
    // =====================================================

    async getProjectBySlug(slug) {

        const project = await projectRepository.getProjectBySlug(slug);

        if (!project) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Project not found."

            );

        }

        return mapProjectDetails(project);

    }

}

export default new ProjectService();