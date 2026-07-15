import asyncHandler from "../../../utils/asyncHandler.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import newsAdminService from "./news.admin.service.js";

class NewsAdminController {

    // =====================================================
    // GET /admin/news
    // =====================================================

    getNews = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await newsAdminService.getNews({

            page,

            limit

        });

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "News fetched successfully.",

                data

            )

        );

    });

    // =====================================================
    // GET /admin/news/:id
    // =====================================================

    getNewsById = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const data = await newsAdminService.getNewsById(id);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "News fetched successfully.",

                data

            )

        );

    });

    // =====================================================
    // POST /admin/news
    // =====================================================

    createNews = asyncHandler(async (req, res) => {

        const data = await newsAdminService.createNews(

            req.validated.body

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "News created successfully.",

                data

            )

        );

    });

    // =====================================================
    // PUT /admin/news/:id
    // =====================================================

    updateNews = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const data = await newsAdminService.updateNews(

            id,

            req.validated.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "News updated successfully.",

                data

            )

        );

    });

    // =====================================================
    // PATCH /admin/news/:id/status
    // =====================================================

    updateNewsStatus = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        const { is_active } = req.validated.body;

        const data = await newsAdminService.updateNewsStatus(

            id,

            is_active

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "News status updated successfully.",

                data

            )

        );

    });

    // =====================================================
    // DELETE /admin/news/:id
    // =====================================================

    deleteNews = asyncHandler(async (req, res) => {

        const { id } = req.validated.params;

        await newsAdminService.deleteNews(id);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "News deleted successfully.",

                null

            )

        );

    });

}

export default new NewsAdminController();