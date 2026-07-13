import { Router } from "express";

import testRoutes from "../modules/test/test.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import mediaRoutes from "../modules/media/media.routes.js";
import homepageRoutes from "../modules/homepage/homepage.routes.js";
import projectRoutes from "../modules/projects/index.js";
import newsRoutes from "../modules/news/index.js";
import sustainabilityRoutes from "../modules/sustainability/index.js";
import leadershipRoutes from "../modules/leadership/index.js";
import tenderRoutes from "../modules/tenders/index.js";

const router = Router();

router.use("/test", testRoutes);

router.use("/auth", authRoutes);

router.use("/media", mediaRoutes);

router.use("/homepage", homepageRoutes);

router.use("/projects", projectRoutes);

router.use(

    "/news",

    newsRoutes

);

router.use(

    "/sustainability",

    sustainabilityRoutes

);

router.use(

    "/leadership",

    leadershipRoutes
);

router.use(

    "/tenders",

    tenderRoutes

);

export default router;