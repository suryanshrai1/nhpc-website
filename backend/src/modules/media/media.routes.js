import { Router } from "express";

import mediaController from "./media.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import upload from "../../middlewares/upload.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import { uploadMediaSchema } from "./media.validator.js";

const router = Router();

router.use(authMiddleware);

router.post(
    "/upload",
    upload.single("file"),
    validate(uploadMediaSchema),
    mediaController.upload
);

router.get(
    "/",
    mediaController.getAll
);

router.get(
    "/:id",
    mediaController.getById
);

router.delete(
    "/:id",
    mediaController.delete
);

export default router;