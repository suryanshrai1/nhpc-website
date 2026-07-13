import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import tenderService from "./tender.service.js";

class TenderController {

    // =====================================================
    // GET /tenders
    // =====================================================

    getTenders = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await tenderService.getTenders({

            page,

            limit

        });

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Tenders fetched successfully.",

                data

            )

        );

    });

    // =====================================================
    // GET /tenders/:slug
    // =====================================================

    getTenderBySlug = asyncHandler(async (req, res) => {

        const { slug } = req.validated.params;

        const data = await tenderService.getTenderBySlug(

            slug

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Tender fetched successfully.",

                data

            )

        );

    });

}

export default new TenderController();