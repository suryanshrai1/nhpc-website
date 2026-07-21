const mapProjectCard = (project) => ({

    id: Number(project.id),

    name: project.name,

    slug: project.slug,

    summary: project.summary,

    thumbnail: project.thumbnail_media
        ? {
            id: Number(project.thumbnail_media.id),
            url: project.thumbnail_media.storage_path,
            alt: project.thumbnail_media.alt_text
        }
        : null,

    capacity: Number(project.capacity),

    capacityUnit: project.capacity_units.code,

    isFeatured: project.is_featured,

    state: project.states.name,

    type: project.project_types.name,

    status: project.project_statuses.name

});

const mapProjectDetails = (project) => ({

    basic: {

        id: Number(project.id),

        name: project.name,

        slug: project.slug,

        summary: project.summary,

        capacity: Number(project.capacity),

        capacityUnit: project.capacity_units.code,

        isFeatured: project.is_featured,

        thumbnail: project.thumbnail_media
            ? {
                id: Number(project.thumbnail_media.id),
                url: project.thumbnail_media.storage_path,
                alt: project.thumbnail_media.alt_text
            }
            : null,

        heroImage: project.hero_media
            ? {
                id: Number(project.hero_media.id),
                url: project.hero_media.storage_path,
                alt: project.hero_media.alt_text
            }
            : null,

        state: {

            id: Number(project.states.id),

            name: project.states.name,

            code: project.states.code

        },

        type: {

            id: Number(project.project_types.id),

            name: project.project_types.name,

            code: project.project_types.code

        },

        status: {

            id: Number(project.project_statuses.id),

            name: project.project_statuses.name,

            code: project.project_statuses.code

        },

        location: {

            latitude: project.latitude
                ? Number(project.latitude)
                : null,

            longitude: project.longitude
                ? Number(project.longitude)
                : null

        }

    },

    details: project.project_details
        ? {

            overview: project.project_details.overview,

            history: project.project_details.history,

            highlights: project.project_details.highlights,

            currentStatus: project.project_details.current_status,

            futurePlan: project.project_details.future_plan

        }
        : null,

    technical: project.project_technical_details.map(item => ({

        parameter: item.parameter,

        value: item.value,

        displayOrder: item.display_order

    })),

    documents: project.project_documents.map(document => ({

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

            duration: document.media_files.duration_seconds
                ? Number(document.media_files.duration_seconds)
                : null,

            storageProvider: document.media_files.storage_provider,

            path: document.media_files.storage_path,

            altText: document.media_files.alt_text,

            caption: document.media_files.caption

        }

    }))

});

export {

    mapProjectCard,

    mapProjectDetails

};