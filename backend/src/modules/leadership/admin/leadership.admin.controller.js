import asyncHandler from "../../../utils/asyncHandler.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import leadershipAdminService from "./leadership.admin.service.js";

class LeadershipAdminController {

    getLeaders = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await leadershipAdminService.getLeaders({

            page,

            limit

        });

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Leadership fetched successfully.",

                data

            )

        );

    });

    getLeaderById = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const data = await leadershipAdminService.getLeaderById(id);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Leader fetched successfully.",

                data

            )

        );

    });

    createLeader = asyncHandler(async (req, res) => {

        const data = await leadershipAdminService.createLeader(

            req.validated.body

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Leader created successfully.",

                data

            )

        );

    });

    updateLeader = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const data = await leadershipAdminService.updateLeader(

            id,

            req.validated.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Leader updated successfully.",

                data

            )

        );

    });

    updateLeaderStatus = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const { is_active } = req.validated.body;

        const data = await leadershipAdminService.updateLeaderStatus(

            id,

            is_active

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Leader status updated successfully.",

                data

            )

        );

    });

    deleteLeader = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        await leadershipAdminService.deleteLeader(id);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Leader deleted successfully.",

                null

            )

        );

    });

}

export default new LeadershipAdminController();