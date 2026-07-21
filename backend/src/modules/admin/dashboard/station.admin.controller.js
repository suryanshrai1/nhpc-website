import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";
import stationAdminService from "./station.admin.service.js";

class StationAdminController {
    getStations = asyncHandler(async (req, res) => {
        const { page, limit } = req.validated.query;
        const data = await stationAdminService.getStations({ page, limit });
        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Stations fetched successfully.",
                data
            )
        );
    });

    getStationById = asyncHandler(async (req, res) => {
        const { id } = req.validated.params;
        const data = await stationAdminService.getStationById(id);
        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Station fetched successfully.",
                data
            )
        );
    });

    createStation = asyncHandler(async (req, res) => {
        const station = await stationAdminService.createStation(req.validated.body);
        return res.status(HTTP_STATUS.CREATED).json(
            new ApiResponse(
                HTTP_STATUS.CREATED,
                "Station created successfully.",
                station
            )
        );
    });

    updateStation = asyncHandler(async (req, res) => {
        const { id } = req.validated.params;
        const data = await stationAdminService.updateStation(id, req.validated.body);
        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Station updated successfully.",
                data
            )
        );
    });

    updateStationStatus = asyncHandler(async (req, res) => {
        const { id } = req.validated.params;
        const { is_active } = req.validated.body;
        const data = await stationAdminService.updateStatus(id, is_active);
        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Station status updated successfully.",
                data
            )
        );
    });

    deleteStation = asyncHandler(async (req, res) => {
        const { id } = req.validated.params;
        await stationAdminService.deleteStation(id);
        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Station deleted successfully.",
                null
            )
        );
    });
}

export default new StationAdminController();
