import { Router } from "express";

import validate from "../../../middlewares/validate.middleware.js";
import authMiddleware from "../../../middlewares/auth.middleware.js";

import projectAdminController from "./project.admin.controller.js";

import {

    getAdminProjectsSchema,

    getAdminProjectSchema,

    createProjectSchema

} from "./project.admin.validator.js";

const router = Router();

// =====================================================
// All Admin Routes Require Authentication
// =====================================================

router.use(

    authMiddleware

);

// =====================================================
// GET /admin/projects
// =====================================================

router.get(

    "/",

    validate(getAdminProjectsSchema),

    projectAdminController.getProjects

);

// =====================================================
// GET /admin/projects/:id
// =====================================================

router.get(

    "/:id",

    validate(getAdminProjectSchema),

    projectAdminController.getProjectById

);

router.post(

    "/",

    validate(createProjectSchema),

    projectAdminController.createProject

);

export default router;