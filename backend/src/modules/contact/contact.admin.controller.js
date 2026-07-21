import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";
import contactAdminService from "./contact.admin.service.js";

class ContactAdminController {
    getMessages = asyncHandler(async (req, res) => {
        const { page, limit, status_id } = req.validated.query;
        const data = await contactAdminService.getMessages({ page, limit, status_id });
        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(HTTP_STATUS.OK, "Enquiries fetched successfully.", data)
        );
    });

    getMessageById = asyncHandler(async (req, res) => {
        const { id } = req.validated.params;
        const data = await contactAdminService.getMessageById(id);
        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(HTTP_STATUS.OK, "Enquiry detail fetched successfully.", data)
        );
    });

    updateMessageStatus = asyncHandler(async (req, res) => {
        const { id } = req.validated.params;
        const { message_status_id } = req.validated.body;
        const data = await contactAdminService.updateMessageStatus(id, message_status_id);
        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(HTTP_STATUS.OK, "Enquiry status updated successfully.", data)
        );
    });
}

export default new ContactAdminController();
