import { Router } from "express";

import careerController from "./career.controller.js";

import validate from "../../middlewares/validate.middleware.js";

import {

    getCareersSchema,

    getCareerBySlugSchema

} from "./career.validator.js";

const router = Router();

// =====================================================
// Public Routes
// =====================================================

router.get(

    "/",

    validate(getCareersSchema),

    careerController.getCareers

);

router.get(

    "/:slug",

    validate(getCareerBySlugSchema),

    careerController.getCareerBySlug

);

export default router;