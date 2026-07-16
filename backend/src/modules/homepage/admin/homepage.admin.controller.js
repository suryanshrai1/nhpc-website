import asyncHandler from "../../../utils/asyncHandler.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import homepageAdminService from "./homepage.admin.service.js";

class HomepageAdminController {

    getHomepage = asyncHandler(async (req, res) => {

        const data = await homepageAdminService.getHomepage();

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Homepage fetched successfully.",

                data

            )

        );

    });

    updateHero = asyncHandler(async (req, res) => {

        const data = await homepageAdminService.updateHero(

            req.validated.body

        );

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Hero updated successfully.",

                data

            )

        );

    });

}

export default new HomepageAdminController();