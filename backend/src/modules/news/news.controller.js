import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import newsService from "./news.service.js";

class NewsController {

    // =====================================================
    // GET /news
    // =====================================================

    getNews = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await newsService.getNews({

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
    // GET /news/:slug
    // =====================================================

    getNewsBySlug = asyncHandler(async (req, res) => {

        const { slug } = req.validated.params;

        const data = await newsService.getNewsBySlug(slug);

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "News fetched successfully.",

                data

            )

        );

    });

}

export default new NewsController();