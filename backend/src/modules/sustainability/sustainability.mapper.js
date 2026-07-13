const mapSustainabilityCard = (item) => ({

    id: Number(item.id),

    title: item.title,

    slug: item.slug,

    summary: item.summary,

    thumbnail: null,

    publishedAt: item.published_at,

    type: item.sustainability_types.name,

    typeCode: item.sustainability_types.code,

    isFeatured: item.is_featured

});

const mapRelatedSustainability = (item) => ({

    id: Number(item.id),

    title: item.title,

    slug: item.slug,

    publishedAt: item.published_at

});

const mapSustainabilityDetails = (

    item,

    relatedItems = []

) => ({

    basic: {

        id: Number(item.id),

        title: item.title,

        slug: item.slug,

        summary: item.summary,

        thumbnail: null,

        publishedAt: item.published_at,

        type: {

            id: Number(item.sustainability_types.id),

            name: item.sustainability_types.name,

            code: item.sustainability_types.code

        },

        isFeatured: item.is_featured

    },

    description: item.description,

    documents: [],

    related: relatedItems.map(

        mapRelatedSustainability

    )

});

export {

    mapSustainabilityCard,

    mapRelatedSustainability,

    mapSustainabilityDetails

};