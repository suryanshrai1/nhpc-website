import { Router } from "express";
import contactController from "./contact.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { contactSubmitSchema } from "./contact.validator.js";

const router = Router();

router.post(
    "/",
    validate(contactSubmitSchema),
    contactController.submitMessage
);

export default router;
