import asyncHandler from "../../../utils/asyncHandler.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import projectAdminService from "./project.admin.service.js";

class ProjectAdminController {

    // =====================================================
    // GET /admin/projects
    // =====================================================

    getProjects = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await projectAdminService.getProjects({

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
    // GET /admin/projects/:id
    // =====================================================

    getProjectById = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const data = await projectAdminService.getProject(id);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Project fetched successfully.",

                data

            )

        );

    });

    createProject = asyncHandler(async (req, res) => {

        const project = await projectAdminService.createProject(

            req.validated.body

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Project created successfully.",

                project

            )

        );

    });

}

export default new ProjectAdminController();