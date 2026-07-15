import { Router } from "express";

import authMiddleware from "../../../middlewares/auth.middleware.js";
import validate from "../../../middlewares/validate.middleware.js";

import newsAdminController from "./news.admin.controller.js";

import {

    getAdminNewsSchema,

    getAdminNewsByIdSchema,

    createNewsSchema,

    updateNewsSchema,

    updateNewsStatusSchema

} from "./news.admin.validator.js";

const router = Router();

router.use(authMiddleware);

router.get(

    "/",

    validate(getAdminNewsSchema),

    newsAdminController.getNews

);

router.get(

    "/:id",

    validate(getAdminNewsByIdSchema),

    newsAdminController.getNewsById

);

router.post(

    "/",

    validate(createNewsSchema),

    newsAdminController.createNews

);

router.put(

    "/:id",

    validate(updateNewsSchema),

    newsAdminController.updateNews

);

router.patch(

    "/:id/status",

    validate(updateNewsStatusSchema),

    newsAdminController.updateNewsStatus

);

router.delete(

    "/:id",

    validate(getAdminNewsByIdSchema),

    newsAdminController.deleteNews

);

export default router;