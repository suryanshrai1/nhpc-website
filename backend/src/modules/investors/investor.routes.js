import { Router } from "express";

import investorController from "./investor.controller.js";

import validate from "../../middlewares/validate.middleware.js";

import {

    getInvestorDocumentsSchema

} from "./investor.validator.js";

const router = Router();

// =====================================================
// Financial Years
// =====================================================

router.get(

    "/financial-years",

    investorController.getFinancialYears

);

// =====================================================
// Investor Highlights
// =====================================================

router.get(

    "/highlights",

    investorController.getInvestorHighlights

);

// =====================================================
// Investor Documents
// =====================================================

router.get(

    "/documents",

    validate(getInvestorDocumentsSchema),

    investorController.getInvestorDocuments

);

export default router;