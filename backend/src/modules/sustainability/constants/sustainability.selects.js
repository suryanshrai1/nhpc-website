import { MEDIA_FILE_SELECT } from "../../media/constants/media.selects.js";

/* ---------------------------------------------------------- */
/* Sustainability Listing */
/* ---------------------------------------------------------- */

export const SUSTAINABILITY_CARD_SELECT = {

    id: true,

    title: true,

    slug: true,

    summary: true,

    published_at: true,

    is_featured: true,

    sustainability_types: {

        select: {

            name: true,

            code: true

        }

    }

};

/* ---------------------------------------------------------- */
/* Sustainability Details */
/* ---------------------------------------------------------- */

export const SUSTAINABILITY_DETAIL_SELECT = {

    id: true,

    title: true,

    slug: true,

    sustainability_type_id: true,

    summary: true,

    description: true,

    published_at: true,

    is_featured: true,

    sustainability_types: {

        select: {

            id: true,

            name: true,

            code: true

        }

    }

    // We'll add media/documents later when those tables exist.

};

/* ---------------------------------------------------------- */
/* Related Sustainability */
/* ---------------------------------------------------------- */

export const SUSTAINABILITY_RELATED_SELECT = {

    id: true,

    title: true,

    slug: true,

    summary: true,

    published_at: true

};