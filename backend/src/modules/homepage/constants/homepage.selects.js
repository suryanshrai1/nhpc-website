export const PROJECT_CARD_SELECT = {

    id: true,

    name: true,

    slug: true,

    summary: true,

    capacity: true,

    states: {
        select: {
            name: true
        }
    },

    project_types: {
        select: {
            name: true
        }
    }

};

export const NEWS_CARD_SELECT = {

    id: true,

    title: true,

    slug: true,

    summary: true,

    published_at: true,

    news_categories: {
        select: {
            name: true
        }
    }

};

export const SUSTAINABILITY_CARD_SELECT = {

    id: true,

    title: true,

    slug: true,

    summary: true,

    published_at: true,

    sustainability_types: {
        select: {
            name: true
        }
    }

};

export const OPS_CARD_SELECT = {

    id: true,

    name: true,

    slug: true,

    installed_capacity: true,

    states: {
        select: {
            name: true
        }
    },

    project_types: {
        select: {
            name: true
        }
    }

};