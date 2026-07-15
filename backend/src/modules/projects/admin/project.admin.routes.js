import { Router } from "express";

import validate from "../../../middlewares/validate.middleware.js";
import authMiddleware from "../../../middlewares/auth.middleware.js";

import projectAdminController from "./project.admin.controller.js";

import {

    getAdminProjectsSchema,

    getAdminProjectSchema,

    createProjectSchema,

    updateProjectSchema,

    updateProjectStatusSchema

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

// =====================================================
// PUT /admin/projects/:id
// =====================================================

router.put(

    "/:id",

    validate(updateProjectSchema),

    projectAdminController.updateProject

);
// to change status of project
router.patch(

    "/:id/status",

    validate(updateProjectStatusSchema),

    projectAdminController.updateProjectStatus

);

// delete project
router.delete(

    "/:id",

    validate(getAdminProjectSchema),

    projectAdminController.deleteProject

);

export default router;