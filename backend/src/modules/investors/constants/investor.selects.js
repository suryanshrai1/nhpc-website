import { MEDIA_FILE_SELECT } from "../../media/constants/media.selects.js";

/* ---------------------------------------------------------- */
/* Financial Year */
/* ---------------------------------------------------------- */

export const FINANCIAL_YEAR_SELECT = {

    id: true,

    label: true,

    start_year: true,

    end_year: true

};

/* ---------------------------------------------------------- */
/* Investor Highlight */
/* ---------------------------------------------------------- */

export const INVESTOR_HIGHLIGHT_SELECT = {

    id: true,

    metric_name: true,

    metric_value: true,

    unit: true,

    display_order: true,

    financial_years: {

        select: FINANCIAL_YEAR_SELECT

    }

};

/* ---------------------------------------------------------- */
/* Investor Document */
/* ---------------------------------------------------------- */

export const INVESTOR_DOCUMENT_SELECT = {

    id: true,

    title: true,

    description: true,

    published_at: true,

    investor_document_types: {

        select: {

            id: true,

            name: true,

            code: true

        }

    },

    financial_years: {

        select: FINANCIAL_YEAR_SELECT

    },

    media_files: {

        select: MEDIA_FILE_SELECT

    }

};