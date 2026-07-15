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

    // =====================================================
    // PUT /admin/projects/:id
    // =====================================================

    updateProject = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const data = await projectAdminService.updateProject(

            id,

            req.validated.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Project updated successfully.",

                data

            )

        );

    });

    // =====================================================
    // PATCH /admin/projects/:id/status
    // =====================================================

    updateProjectStatus = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const { is_active } = req.validated.body;

        const data = await projectAdminService.updateProjectStatus(

            id,

            is_active

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Project status updated successfully.",

                data

            )

        );

    });

    // =====================================================
    // DELETE /admin/projects/:id
    // =====================================================

    deleteProject = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        await projectAdminService.deleteProject(

            id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Project deleted successfully.",

                null

            )

        );

    });

}

export default new ProjectAdminController();