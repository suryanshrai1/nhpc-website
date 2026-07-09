import { Router } from "express";

import projectController from "./project.controller.js";

import validate from "../../middlewares/validate.middleware.js";

import {

    getProjectsSchema,

    getProjectBySlugSchema

} from "./project.validator.js";

const router = Router();

// =====================================================
// Public Routes
// =====================================================

router.get(

    "/",

    validate(getProjectsSchema),

    projectController.getProjects

);

router.get(

    "/:slug",

    validate(getProjectBySlugSchema),

    projectController.getProjectBySlug

);

export default router;