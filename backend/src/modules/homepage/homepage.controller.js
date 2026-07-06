import HTTP_STATUS from "../../constants/httpStatus.js";

import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import homepageService from "./homepage.service.js";

class HomepageController {

    getHomepage = asyncHandler(async (req, res) => {

        const homepage =
            await homepageService.getHomepage();

        return res
            .status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    HTTP_STATUS.OK,
                    "Homepage fetched successfully.",
                    homepage
                )
            );

    });

}

export default new HomepageController();