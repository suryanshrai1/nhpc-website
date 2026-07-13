import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import sustainabilityService from "./sustainability.service.js";

class SustainabilityController {

    // =====================================================
    // GET /sustainability
    // =====================================================

    getSustainability = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await sustainabilityService.getSustainability({

            page,

            limit

        });

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Sustainability articles fetched successfully.",

                data

            )

        );

    });

    // =====================================================
    // GET /sustainability/:slug
    // =====================================================

    getSustainabilityBySlug = asyncHandler(async (req, res) => {

        const { slug } = req.validated.params;

        const data = await sustainabilityService.getSustainabilityBySlug(slug);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Sustainability article fetched successfully.",

                data

            )

        );

    });

}

export default new SustainabilityController();