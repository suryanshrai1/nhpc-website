import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import validate from "../middlewares/validate.middleware.js";

import {
    loginSchema,
    changePasswordSchema
} from "../validators/auth.validator.js";

const router = Router();

router.post(
    "/login",
    validate(loginSchema),
    authController.login
);

router.post(
    "/logout",
    authMiddleware,
    authController.logout
);

router.get(
    "/me",
    authMiddleware,
    authController.me
);

router.post(
    "/refresh",
    authController.refresh
);

router.put(
    "/change-password",
    authMiddleware,
    validate(changePasswordSchema),
    authController.changePassword
);

export default router;