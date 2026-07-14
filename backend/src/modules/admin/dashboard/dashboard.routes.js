import { Router } from "express";

import authMiddleware from "../../../middlewares/auth.middleware.js";
import dashboardController from "./dashboard.controller.js";

const router = Router();

router.get(

    "/",

    authMiddleware,

    dashboardController.getDashboard

);

export default router;