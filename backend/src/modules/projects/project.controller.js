import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import HTTP_STATUS from "../../constants/httpStatus.js";

import projectService from "./project.service.js";

class ProjectController {

    // =====================================================
    // GET /projects
    // =====================================================

    getProjects = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await projectService.getProjects({

            page,

            limit

        });

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Projects fetched successfully.",

                data

            )

        );

    });

    // =====================================================
    // GET /projects/:slug
    // =====================================================

    getProjectBySlug = asyncHandler(async (req, res) => {

        const { slug } = req.validated.params;

        const data = await projectService.getProjectBySlug(slug);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Project fetched successfully.",

                data

            )

        );

    });

}

export default new ProjectController();