/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/

import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import HTTP_STATUS from "../../constants/httpStatus.js";

import moduleService from "./module.service.js";

class ModuleController {

    getItems = asyncHandler(async (req, res) => {

    });

    getItemBySlug = asyncHandler(async (req, res) => {

    });

}

export default new ModuleController();