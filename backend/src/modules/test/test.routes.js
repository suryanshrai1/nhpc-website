import { Router } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

router.get(
    "/",
    asyncHandler(async (req, res) => {
        return res.json(
            new ApiResponse(
                200,
                "Backend architecture is working.",
                {
                    timestamp: new Date()
                }
            )
        );
    })
);

export default router;