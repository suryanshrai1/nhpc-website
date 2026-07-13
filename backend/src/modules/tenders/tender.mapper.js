const mapTenderCard = (tender) => ({

    id: Number(tender.id),

    title: tender.title,

    tenderNumber: tender.tender_number,

    slug: tender.slug,

    summary: tender.summary,

    publishedAt: tender.published_at,

    openingDate: tender.opening_date,

    closingDate: tender.closing_date,

    category: {

        id: Number(tender.tender_categories.id),

        name: tender.tender_categories.name,

        code: tender.tender_categories.code

    },

    status: {

        id: Number(tender.tender_statuses.id),

        name: tender.tender_statuses.name,

        code: tender.tender_statuses.code

    }

});

const mapTenderDetails = (tender) => ({

    basic: {

        id: Number(tender.id),

        title: tender.title,

        tenderNumber: tender.tender_number,

        slug: tender.slug,

        summary: tender.summary,

        publishedAt: tender.published_at,

        openingDate: tender.opening_date,

        closingDate: tender.closing_date,

        category: {

            id: Number(tender.tender_categories.id),

            name: tender.tender_categories.name,

            code: tender.tender_categories.code

        },

        status: {

            id: Number(tender.tender_statuses.id),

            name: tender.tender_statuses.name,

            code: tender.tender_statuses.code

        }

    },

    description: tender.description,

    documents: tender.tender_documents.map(document => ({

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

    }))

});

export {

    mapTenderCard,

    mapTenderDetails

};