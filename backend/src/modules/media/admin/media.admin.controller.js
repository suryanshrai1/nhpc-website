import asyncHandler from "../../../utils/asyncHandler.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import mediaAdminService from "./media.admin.service.js";

class MediaAdminController {

    upload = asyncHandler(async (req, res) => {

        const data = await mediaAdminService.upload(

            req.file,

            req.validated.body,

            req.user

        );

        return res.status(HTTP_STATUS.CREATED).json(

            new ApiResponse(

                HTTP_STATUS.CREATED,

                "Media uploaded successfully.",

                data

            )

        );

    });

    getMedia = asyncHandler(async (req, res) => {

        const { page, limit } = req.validated.query;

        const data = await mediaAdminService.getMedia(

            page,

            limit

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Media fetched successfully.",

                data

            )

        );

    });

    getMediaById = asyncHandler(async (req, res) => {

        const data = await mediaAdminService.getMediaById(

            req.validated.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Media fetched successfully.",

                data

            )

        );

    });

    deleteMedia = asyncHandler(async (req, res) => {

        await mediaAdminService.deleteMedia(

            req.validated.params.id

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Media deleted successfully.",

                null

            )

        );

    });

}

export default new MediaAdminController();