import { Router } from "express";

import authMiddleware from "../../../middlewares/auth.middleware.js";
import validate from "../../../middlewares/validate.middleware.js";

import homepageAdminController from "./homepage.admin.controller.js";

import {

    updateHeroSchema

} from "./homepage.admin.validator.js";

const router = Router();

router.use(

    authMiddleware

);

// =====================================================
// GET Homepage
// =====================================================

router.get(

    "/",

    homepageAdminController.getHomepage

);

// =====================================================
// Update Hero
// =====================================================

router.put(

    "/hero",

    validate(updateHeroSchema),

    homepageAdminController.updateHero

);

export default router;