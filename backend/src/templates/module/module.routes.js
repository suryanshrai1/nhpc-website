import { Router } from "express";

import moduleController from "./module.controller.js";

import validate from "../../middlewares/validate.middleware.js";

import {

    getItemsSchema,

    getItemBySlugSchema

} from "./module.validator.js";

const router = Router();

router.get(

    "/",

    validate(getItemsSchema),

    moduleController.getItems

);

router.get(

    "/:slug",

    validate(getItemBySlugSchema),

    moduleController.getItemBySlug

);

export default router;