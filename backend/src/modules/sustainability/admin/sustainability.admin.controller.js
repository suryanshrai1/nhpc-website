import asyncHandler from "../../../utils/asyncHandler.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import sustainabilityAdminService from "./sustainability.admin.service.js";

class SustainabilityAdminController {

    getArticles = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await sustainabilityAdminService.getArticles({

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

    getArticleById = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const data = await sustainabilityAdminService.getArticleById(id);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Sustainability article fetched successfully.",

                data

            )

        );

    });

    createArticle = asyncHandler(async (req, res) => {

        const data = await sustainabilityAdminService.createArticle(

            req.validated.body

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Sustainability article created successfully.",

                data

            )

        );

    });

    updateArticle = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const data = await sustainabilityAdminService.updateArticle(

            id,

            req.validated.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Sustainability article updated successfully.",

                data

            )

        );

    });

    updateArticleStatus = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const { is_active } = req.validated.body;

        const data = await sustainabilityAdminService.updateArticleStatus(

            id,

            is_active

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Sustainability article status updated successfully.",

                data

            )

        );

    });

    deleteArticle = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        await sustainabilityAdminService.deleteArticle(id);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Sustainability article deleted successfully.",

                null

            )

        );

    });

}

export default new SustainabilityAdminController();