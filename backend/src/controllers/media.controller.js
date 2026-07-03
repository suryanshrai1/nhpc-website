import mediaService from "../services/media.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import HTTP_STATUS from "../constants/httpStatus.js";

class MediaController {

    upload = asyncHandler(async (req, res) => {

        const media = await mediaService.upload(
            req.file,
            req.body,
            req.user.id
        );

        return res
            .status(HTTP_STATUS.CREATED)
            .json(
                new ApiResponse(
                    HTTP_STATUS.CREATED,
                    "File uploaded successfully.",
                    media
                )
            );

    });

    getAll = asyncHandler(async (req, res) => {

        const media =
            await mediaService.getAll();

        return res
            .status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    HTTP_STATUS.OK,
                    "Media fetched successfully.",
                    media
                )
            );

    });

    getById = asyncHandler(async (req, res) => {

        const media =
            await mediaService.getById(
                BigInt(req.params.id)
            );

        return res
            .status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    HTTP_STATUS.OK,
                    "Media fetched successfully.",
                    media
                )
            );

    });

    delete = asyncHandler(async (req, res) => {

        await mediaService.delete(
            BigInt(req.params.id)
        );

        return res
            .status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    HTTP_STATUS.OK,
                    "Media deleted successfully."
                )
            );

    });

}

export default new MediaController();