import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import HTTP_STATUS from "../../constants/httpStatus.js";

import investorService from "./investor.service.js";

class InvestorController {

    // =====================================================
    // GET /financial-years
    // =====================================================

    getFinancialYears = asyncHandler(async (req, res) => {

        const data = await investorService.getFinancialYears();

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Financial years fetched successfully.",

                data

            )

        );

    });

    // =====================================================
    // GET /highlights
    // =====================================================

    getInvestorHighlights = asyncHandler(async (req, res) => {

        const data = await investorService.getInvestorHighlights();

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Investor highlights fetched successfully.",

                data

            )

        );

    });

    // =====================================================
    // GET /documents
    // =====================================================

    getInvestorDocuments = asyncHandler(async (req, res) => {

        const {

            page,

            limit

        } = req.validated.query;

        const data = await investorService.getInvestorDocuments({

            page,

            limit

        });

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Investor documents fetched successfully.",

                data

            )

        );

    });

}

export default new InvestorController();