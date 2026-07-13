import { Router } from "express";

import tenderController from "./tender.controller.js";

import validate from "../../middlewares/validate.middleware.js";

import {

    getTendersSchema,

    getTenderBySlugSchema

} from "./tender.validator.js";

const router = Router();

// =====================================================
// Public Routes
// =====================================================

router.get(

    "/",

    validate(getTendersSchema),

    tenderController.getTenders

);

router.get(

    "/:slug",

    validate(getTenderBySlugSchema),

    tenderController.getTenderBySlug

);

export default router;