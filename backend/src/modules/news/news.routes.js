import { Router } from "express";

import newsController from "./news.controller.js";

import validate from "../../middlewares/validate.middleware.js";

import {

    getNewsSchema,

    getNewsBySlugSchema

} from "./news.validator.js";

const router = Router();

// =====================================================
// Public Routes
// =====================================================

router.get(

    "/",

    validate(getNewsSchema),

    newsController.getNews

);

router.get(

    "/:slug",

    validate(getNewsBySlugSchema),

    newsController.getNewsBySlug

);

export default router;