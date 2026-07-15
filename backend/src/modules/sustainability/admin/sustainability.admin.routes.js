import { Router } from "express";

import authMiddleware from "../../../middlewares/auth.middleware.js";
import validate from "../../../middlewares/validate.middleware.js";

import sustainabilityAdminController from "./sustainability.admin.controller.js";

import {

    getAdminArticlesSchema,

    getAdminArticleSchema,

    createArticleSchema,

    updateArticleSchema,

    updateArticleStatusSchema

} from "./sustainability.admin.validator.js";

const router = Router();

router.use(authMiddleware);

// =====================================================
// GET
// =====================================================

router.get(

    "/",

    validate(getAdminArticlesSchema),

    sustainabilityAdminController.getArticles

);

router.get(

    "/:id",

    validate(getAdminArticleSchema),

    sustainabilityAdminController.getArticleById

);

// =====================================================
// POST
// =====================================================

router.post(

    "/",

    validate(createArticleSchema),

    sustainabilityAdminController.createArticle

);

// =====================================================
// PUT
// =====================================================

router.put(

    "/:id",

    validate(updateArticleSchema),

    sustainabilityAdminController.updateArticle

);

// =====================================================
// PATCH
// =====================================================

router.patch(

    "/:id/status",

    validate(updateArticleStatusSchema),

    sustainabilityAdminController.updateArticleStatus

);

// =====================================================
// DELETE
// =====================================================

router.delete(

    "/:id",

    validate(getAdminArticleSchema),

    sustainabilityAdminController.deleteArticle

);

export default router;