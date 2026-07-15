import { Router } from "express";

import authMiddleware from "../../../middlewares/auth.middleware.js";
import validate from "../../../middlewares/validate.middleware.js";

import investorAdminController from "./investor.admin.controller.js";

import {

    getAdminDocumentsSchema,

    getAdminDocumentSchema,

    createDocumentSchema,

    updateDocumentSchema,

    updateDocumentStatusSchema

} from "./investor.admin.validator.js";

const router = Router();

router.use(authMiddleware);

// =====================================================
// GET
// =====================================================

router.get(

    "/",

    validate(getAdminDocumentsSchema),

    investorAdminController.getDocuments

);

router.get(

    "/:id",

    validate(getAdminDocumentSchema),

    investorAdminController.getDocumentById

);

// =====================================================
// POST
// =====================================================

router.post(

    "/",

    validate(createDocumentSchema),

    investorAdminController.createDocument

);

// =====================================================
// PUT
// =====================================================

router.put(

    "/:id",

    validate(updateDocumentSchema),

    investorAdminController.updateDocument

);

// =====================================================
// PATCH
// =====================================================

router.patch(

    "/:id/status",

    validate(updateDocumentStatusSchema),

    investorAdminController.updateDocumentStatus

);

// =====================================================
// DELETE
// =====================================================

router.delete(

    "/:id",

    validate(getAdminDocumentSchema),

    investorAdminController.deleteDocument

);

export default router;