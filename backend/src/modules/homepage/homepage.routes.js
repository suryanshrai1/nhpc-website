import { Router } from "express";

import homepageController from "./homepage.controller.js";

const router = Router();

router.get(
    "/",
    homepageController.getHomepage
);

export default router;