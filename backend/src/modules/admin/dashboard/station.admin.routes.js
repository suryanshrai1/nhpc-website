import { Router } from "express";
import validate from "../../../middlewares/validate.middleware.js";
import authMiddleware from "../../../middlewares/auth.middleware.js";
import stationAdminController from "./station.admin.controller.js";
import {
    getAdminStationsSchema,
    getAdminStationSchema,
    createStationSchema,
    updateStationSchema,
    updateStationStatusSchema
} from "./station.admin.validator.js";

const router = Router();

router.use(authMiddleware);

router.get("/", validate(getAdminStationsSchema), stationAdminController.getStations);
router.get("/:id", validate(getAdminStationSchema), stationAdminController.getStationById);
router.post("/", validate(createStationSchema), stationAdminController.createStation);
router.put("/:id", validate(updateStationSchema), stationAdminController.updateStation);
router.patch("/:id/status", validate(updateStationStatusSchema), stationAdminController.updateStationStatus);
router.delete("/:id", validate(getAdminStationSchema), stationAdminController.deleteStation);

export default router;
