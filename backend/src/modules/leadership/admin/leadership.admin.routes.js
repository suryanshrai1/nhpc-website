import { Router } from "express";

import authMiddleware from "../../../middlewares/auth.middleware.js";
import validate from "../../../middlewares/validate.middleware.js";

import leadershipAdminController from "./leadership.admin.controller.js";

import {

    getAdminLeadersSchema,

    getAdminLeaderSchema,

    createLeaderSchema,

    updateLeaderSchema,

    updateLeaderStatusSchema

} from "./leadership.admin.validator.js";

const router = Router();

router.use(authMiddleware);

// =====================================================
// GET
// =====================================================

router.get(

    "/",

    validate(getAdminLeadersSchema),

    leadershipAdminController.getLeaders

);

router.get(

    "/:id",

    validate(getAdminLeaderSchema),

    leadershipAdminController.getLeaderById

);

// =====================================================
// POST
// =====================================================

router.post(

    "/",

    validate(createLeaderSchema),

    leadershipAdminController.createLeader

);

// =====================================================
// PUT
// =====================================================

router.put(

    "/:id",

    validate(updateLeaderSchema),

    leadershipAdminController.updateLeader

);

// =====================================================
// PATCH
// =====================================================

router.patch(

    "/:id/status",

    validate(updateLeaderStatusSchema),

    leadershipAdminController.updateLeaderStatus

);

// =====================================================
// DELETE
// =====================================================

router.delete(

    "/:id",

    validate(getAdminLeaderSchema),

    leadershipAdminController.deleteLeader

);

export default router;