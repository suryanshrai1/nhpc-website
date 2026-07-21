import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";
import contactService from "./contact.service.js";

class ContactController {
    submitMessage = asyncHandler(async (req, res) => {
        const payload = req.validated.body;
        const result = await contactService.saveMessage(payload);

        return res.status(HTTP_STATUS.CREATED).json(
            new ApiResponse(
                HTTP_STATUS.CREATED,
                "Enquiry message submitted successfully.",
                result
            )
        );
    });
}

export default new ContactController();
