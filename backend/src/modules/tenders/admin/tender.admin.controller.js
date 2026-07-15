import asyncHandler from "../../../utils/asyncHandler.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import tenderAdminService from "./tender.admin.service.js";

class TenderAdminController {

    // =====================================================
    // GET /admin/tenders
    // =====================================================

    getTenders = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await tenderAdminService.getTenders({

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
    // GET /admin/tenders/:id
    // =====================================================

    getTenderById = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const data = await tenderAdminService.getTenderById(id);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Tender fetched successfully.",

                data

            )

        );

    });

    // =====================================================
    // POST /admin/tenders
    // =====================================================

    createTender = asyncHandler(async (req, res) => {

        const data = await tenderAdminService.createTender(

            req.validated.body

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Tender created successfully.",

                data

            )

        );

    });

    // =====================================================
    // PUT /admin/tenders/:id
    // =====================================================

    updateTender = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const data = await tenderAdminService.updateTender(

            id,

            req.validated.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Tender updated successfully.",

                data

            )

        );

    });

    // =====================================================
    // PATCH /admin/tenders/:id/status
    // =====================================================

    updateTenderStatus = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const { is_active } = req.validated.body;

        const data = await tenderAdminService.updateTenderStatus(

            id,

            is_active

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Tender status updated successfully.",

                data

            )

        );

    });

    // =====================================================
    // DELETE /admin/tenders/:id
    // =====================================================

    deleteTender = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        await tenderAdminService.deleteTender(id);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Tender deleted successfully.",

                null

            )

        );

    });

}

export default new TenderAdminController();