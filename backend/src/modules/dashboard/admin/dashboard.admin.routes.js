import { Router } from "express";

import authMiddleware from "../../../middlewares/auth.middleware.js";

import dashboardController from "./dashboard.admin.controller.js";

const router = Router();

router.use(

    authMiddleware

);

router.get(

    "/",

    dashboardController.getDashboard

);

export default router;