import { MEDIA_FILE_SELECT } from "../../media/constants/media.selects.js";

/* ---------------------------------------------------------- */
/* Tender Listing */
/* ---------------------------------------------------------- */

export const TENDER_CARD_SELECT = {

    id: true,

    title: true,

    tender_number: true,

    slug: true,

    summary: true,

    published_at: true,

    opening_date: true,

    closing_date: true,

    tender_categories: {

        select: {

            id: true,

            name: true,

            code: true

        }

    },

    tender_statuses: {

        select: {

            id: true,

            name: true,

            code: true

        }

    }

};

/* ---------------------------------------------------------- */
/* Tender Details */
/* ---------------------------------------------------------- */

export const TENDER_DETAIL_SELECT = {

    id: true,

    title: true,

    tender_number: true,

    slug: true,

    summary: true,

    description: true,

    published_at: true,

    opening_date: true,

    closing_date: true,

    tender_categories: {

        select: {

            id: true,

            name: true,

            code: true

        }

    },

    tender_statuses: {

        select: {

            id: true,

            name: true,

            code: true

        }

    },

    tender_documents: {

        select: {

            id: true,

            title: true,

            display_order: true,

            media_files: {

                select: MEDIA_FILE_SELECT

            }

        },

        orderBy: {

            display_order: "asc"

        }

    }

};