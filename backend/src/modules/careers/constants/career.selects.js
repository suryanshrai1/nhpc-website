import { MEDIA_FILE_SELECT } from "../../media/constants/media.selects.js";

/* ---------------------------------------------------------- */
/* Career Listing */
/* ---------------------------------------------------------- */

export const CAREER_CARD_SELECT = {

    id: true,

    title: true,

    slug: true,

    location: true,

    vacancies: true,

    summary: true,

    published_at: true,

    application_deadline: true,

    employment_types: {

        select: {

            id: true,

            name: true,

            code: true

        }

    }

};

/* ---------------------------------------------------------- */
/* Career Details */
/* ---------------------------------------------------------- */

export const CAREER_DETAIL_SELECT = {

    id: true,

    title: true,

    slug: true,

    location: true,

    vacancies: true,

    summary: true,

    description: true,

    published_at: true,

    application_deadline: true,

    employment_types: {

        select: {

            id: true,

            name: true,

            code: true

        }

    },

    job_documents: {

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