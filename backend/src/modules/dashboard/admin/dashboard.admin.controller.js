import asyncHandler from "../../../utils/asyncHandler.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import dashboardService from "./dashboard.admin.service.js";

class DashboardController {

    getDashboard = asyncHandler(async (req, res) => {

        const data = await dashboardService.getDashboard();

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Dashboard fetched successfully.",

                data

            )

        );

    });

}

export default new DashboardController();