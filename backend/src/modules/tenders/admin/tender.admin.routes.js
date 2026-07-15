import { Router } from "express";

import authMiddleware from "../../../middlewares/auth.middleware.js";
import validate from "../../../middlewares/validate.middleware.js";

import tenderAdminController from "./tender.admin.controller.js";

import {

    getAdminTendersSchema,

    getAdminTenderSchema,

    createTenderSchema,

    updateTenderSchema,

    updateTenderStatusSchema

} from "./tender.admin.validator.js";

const router = Router();

// =====================================================
// All Admin Routes Require Authentication
// =====================================================

router.use(authMiddleware);

// =====================================================
// GET
// =====================================================

router.get(

    "/",

    validate(getAdminTendersSchema),

    tenderAdminController.getTenders

);

router.get(

    "/:id",

    validate(getAdminTenderSchema),

    tenderAdminController.getTenderById

);

// =====================================================
// POST
// =====================================================

router.post(

    "/",

    validate(createTenderSchema),

    tenderAdminController.createTender

);

// =====================================================
// PUT
// =====================================================

router.put(

    "/:id",

    validate(updateTenderSchema),

    tenderAdminController.updateTender

);

// =====================================================
// PATCH
// =====================================================

router.patch(

    "/:id/status",

    validate(updateTenderStatusSchema),

    tenderAdminController.updateTenderStatus

);

// =====================================================
// DELETE
// =====================================================

router.delete(

    "/:id",

    validate(getAdminTenderSchema),

    tenderAdminController.deleteTender

);

export default router;