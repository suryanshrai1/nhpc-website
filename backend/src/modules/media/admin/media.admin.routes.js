import { Router } from "express";

import authMiddleware from "../../../middlewares/auth.middleware.js";
import validate from "../../../middlewares/validate.middleware.js";

import {

    uploadSingle

} from "../../../middlewares/upload.middleware.js";

import mediaAdminController from "./media.admin.controller.js";

import {

    getMediaListSchema,

    getMediaSchema,

    uploadMediaSchema

} from "./media.admin.validator.js";

const router = Router();

router.use(authMiddleware);

// =====================================================
// Upload
// =====================================================

router.post(

    "/",

    uploadSingle("file"),

    validate(uploadMediaSchema),

    mediaAdminController.upload

);

// =====================================================
// List
// =====================================================

router.get(

    "/",

    validate(getMediaListSchema),

    mediaAdminController.getMedia

);

// =====================================================
// Details
// =====================================================

router.get(

    "/:id",

    validate(getMediaSchema),

    mediaAdminController.getMediaById

);

// =====================================================
// Delete
// =====================================================

router.delete(

    "/:id",

    validate(getMediaSchema),

    mediaAdminController.deleteMedia

);

export default router;