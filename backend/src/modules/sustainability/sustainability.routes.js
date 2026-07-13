import { Router } from "express";

import sustainabilityController from "./sustainability.controller.js";

import validate from "../../middlewares/validate.middleware.js";

import {

    getSustainabilitySchema,

    getSustainabilityBySlugSchema

} from "./sustainability.validator.js";

const router = Router();

// =====================================================
// Public Routes
// =====================================================

router.get(

    "/",

    validate(getSustainabilitySchema),

    sustainabilityController.getSustainability

);

router.get(

    "/:slug",

    validate(getSustainabilityBySlugSchema),

    sustainabilityController.getSustainabilityBySlug

);

export default router;