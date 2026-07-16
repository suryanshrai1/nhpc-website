import asyncHandler from "../../../utils/asyncHandler.js";

import ApiResponse from "../../../utils/ApiResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import lookupService from "./lookup.admin.service.js";

class LookupController {

    getAll = asyncHandler(async (req, res) => {

        const data = await lookupService.getAllLookups();

        return res.status(HTTP_STATUS.OK).json(

            new ApiResponse(

                HTTP_STATUS.OK,

                "Lookups fetched successfully.",

                data

            )

        );

    });

}

export default new LookupController();