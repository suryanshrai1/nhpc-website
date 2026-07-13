import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import leadershipService from "./leadership.service.js";

class LeadershipController {

    // =====================================================
    // GET /leadership
    // =====================================================

    getLeadership = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await leadershipService.getLeadership({

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

    // =====================================================
    // GET /leadership/:slug
    // =====================================================

    getLeaderBySlug = asyncHandler(async (req, res) => {

        const { slug } = req.validated.params;

        const data = await leadershipService.getLeaderBySlug(

            slug

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Leader fetched successfully.",

                data

            )

        );

    });

}

export default new LeadershipController();