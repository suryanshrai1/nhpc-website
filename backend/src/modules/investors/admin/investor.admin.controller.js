import asyncHandler from "../../../utils/asyncHandler.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import investorAdminService from "./investor.admin.service.js";

class InvestorAdminController {

    getDocuments = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await investorAdminService.getDocuments({

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

    getDocumentById = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const data = await investorAdminService.getDocumentById(id);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Investor document fetched successfully.",

                data

            )

        );

    });

    createDocument = asyncHandler(async (req, res) => {

        const data = await investorAdminService.createDocument(

            req.validated.body

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Investor document created successfully.",

                data

            )

        );

    });

    updateDocument = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const data = await investorAdminService.updateDocument(

            id,

            req.validated.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Investor document updated successfully.",

                data

            )

        );

    });

    updateDocumentStatus = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const { is_active } = req.validated.body;

        const data = await investorAdminService.updateDocumentStatus(

            id,

            is_active

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Investor document status updated successfully.",

                data

            )

        );

    });

    deleteDocument = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        await investorAdminService.deleteDocument(id);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Investor document deleted successfully.",

                null

            )

        );

    });

}

export default new InvestorAdminController();