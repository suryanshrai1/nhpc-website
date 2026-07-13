import { MEDIA_FILE_SELECT } from "../../media/constants/media.selects.js";

/* ---------------------------------------------------------- */
/* News Listing Card */
/* ---------------------------------------------------------- */

export const NEWS_CARD_SELECT = {

    id: true,

    title: true,

    slug: true,

    summary: true,

    published_at: true,

    is_featured: true,

    news_categories: {

        select: {

            name: true,

            code: true

        }

    }

};

/* ---------------------------------------------------------- */
/* News Details */
/* ---------------------------------------------------------- */

export const NEWS_DETAIL_SELECT = {

    id: true,

    title: true,

    slug: true,

    news_category_id: true,

    summary: true,

    content: true,

    published_at: true,

    is_featured: true,

    created_at: true,

    updated_at: true,

    news_categories: {

        select: {

            id: true,

            name: true,

            code: true

        }

    },

    news_documents: {

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

/* ---------------------------------------------------------- */
/* Related News */
/* ---------------------------------------------------------- */

export const NEWS_RELATED_SELECT = {

    id: true,

    title: true,

    slug: true,

    summary: true,

    published_at: true

};