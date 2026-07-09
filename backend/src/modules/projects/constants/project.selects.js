import { MEDIA_FILE_SELECT } from "../../media/constants/media.selects.js";

/* ---------------------------------------------------------- */
/* Homepage / Project Listing Card */
/* ---------------------------------------------------------- */

export const PROJECT_CARD_SELECT = {

    id: true,

    name: true,

    slug: true,

    summary: true,

    capacity: true,

    is_featured: true,

    states: {

        select: {

            name: true

        }

    },

    project_types: {

        select: {

            name: true

        }

    },

    project_statuses: {

        select: {

            name: true

        }

    },

    capacity_units: {

        select: {

            name: true,

            code: true

        }

    }

};

/* ---------------------------------------------------------- */
/* Project Details Page */
/* ---------------------------------------------------------- */

export const PROJECT_DETAIL_SELECT = {

    id: true,

    name: true,

    slug: true,

    summary: true,

    capacity: true,

    latitude: true,

    longitude: true,

    display_order: true,

    is_featured: true,

    created_at: true,

    updated_at: true,

    states: {

        select: {

            id: true,

            name: true,

            code: true

        }

    },

    project_types: {

        select: {

            id: true,

            name: true,

            code: true

        }

    },

    project_statuses: {

        select: {

            id: true,

            name: true,

            code: true

        }

    },

    capacity_units: {

        select: {

            id: true,

            name: true,

            code: true

        }

    },

    project_details: {

        select: {

            overview: true,

            history: true,

            highlights: true,

            current_status: true,

            future_plan: true

        }

    },

    project_technical_details: {

        select: {

            parameter: true,

            value: true,

            display_order: true

        },

        orderBy: {

            display_order: "asc"

        }

    },

    project_documents: {

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
/* Related Projects */
/* ---------------------------------------------------------- */

export const PROJECT_RELATED_SELECT = {

    id: true,

    name: true,

    slug: true,

    summary: true,

    capacity: true,

    states: {

        select: {

            name: true

        }

    }

};