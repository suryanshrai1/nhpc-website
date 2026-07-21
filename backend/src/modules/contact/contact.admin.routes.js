import { Router } from "express";
import contactAdminController from "./contact.admin.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { getAdminMessagesSchema, getAdminMessageSchema, updateMessageStatusSchema } from "./contact.admin.validator.js";

const router = Router();

router.use(authMiddleware);

router.get("/", validate(getAdminMessagesSchema), contactAdminController.getMessages);
router.get("/:id", validate(getAdminMessageSchema), contactAdminController.getMessageById);
router.patch("/:id/status", validate(updateMessageStatusSchema), contactAdminController.updateMessageStatus);

export default router;
