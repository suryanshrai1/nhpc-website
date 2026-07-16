import { Router } from "express";

import authMiddleware from "../../../middlewares/auth.middleware.js";

import lookupController from "./lookup.admin.controller.js";

const router = Router();

router.use(authMiddleware);

router.get(

    "/",

    lookupController.getAll

);

export default router;