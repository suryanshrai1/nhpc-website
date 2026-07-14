import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import careerService from "./career.service.js";

class CareerController {

    // =====================================================
    // GET /careers
    // =====================================================

    getCareers = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await careerService.getCareers({

            page,

            limit

        });

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Job openings fetched successfully.",

                data

            )

        );

    });

    // =====================================================
    // GET /careers/:slug
    // =====================================================

    getCareerBySlug = asyncHandler(async (req, res) => {

        const { slug } = req.validated.params;

        const data = await careerService.getCareerBySlug(

            slug

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Job opening fetched successfully.",

                data

            )

        );

    });

}

export default new CareerController();