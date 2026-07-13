const mapNewsCard = (news) => ({

    id: Number(news.id),

    title: news.title,

    slug: news.slug,

    summary: news.summary,

    thumbnail: null,

    publishedAt: news.published_at,

    category: news.news_categories.name,

    categoryCode: news.news_categories.code,

    isFeatured: news.is_featured

});

const mapRelatedNews = (news) => ({

    id: Number(news.id),

    title: news.title,

    slug: news.slug,

    publishedAt: news.published_at

});

const mapNewsDetails = (news, relatedNews = []) => ({

    basic: {

        id: Number(news.id),

        title: news.title,

        slug: news.slug,

        summary: news.summary,

        thumbnail: null,

        publishedAt: news.published_at,

        category: {

            id: Number(news.news_categories.id),

            name: news.news_categories.name,

            code: news.news_categories.code

        },

        isFeatured: news.is_featured

    },

    content: news.content,

    documents: news.news_documents.map(document => ({

        id: Number(document.id),

        title: document.title,

        displayOrder: document.display_order,

        file: {

            id: Number(document.media_files.id),

            originalName: document.media_files.original_name,

            storedName: document.media_files.stored_name,

            mimeType: document.media_files.mime_type,

            extension: document.media_files.extension,

            size: Number(document.media_files.size_bytes),

            width: document.media_files.width,

            height: document.media_files.height,

            duration: document.media_files.duration_seconds,

            storageProvider: document.media_files.storage_provider,

            path: document.media_files.storage_path,

            altText: document.media_files.alt_text,

            caption: document.media_files.caption

        }

    })),

    related: relatedNews.map(mapRelatedNews)

});

export {

    mapNewsCard,

    mapNewsDetails,

    mapRelatedNews

};