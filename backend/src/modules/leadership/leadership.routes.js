import { Router } from "express";

import leadershipController from "./leadership.controller.js";

import validate from "../../middlewares/validate.middleware.js";

import {

    getLeadershipSchema,

    getLeaderBySlugSchema

} from "./leadership.validator.js";

const router = Router();

// =====================================================
// Public Routes
// =====================================================

router.get(

    "/",

    validate(getLeadershipSchema),

    leadershipController.getLeadership

);

router.get(

    "/:slug",

    validate(getLeaderBySlugSchema),

    leadershipController.getLeaderBySlug

);

export default router;