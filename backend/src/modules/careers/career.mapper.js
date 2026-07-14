const mapCareerCard = (job) => ({

    id: Number(job.id),

    title: job.title,

    slug: job.slug,

    summary: job.summary,

    location: job.location,

    vacancies: job.vacancies,

    publishedAt: job.published_at,

    applicationDeadline: job.application_deadline,

    employmentType: {

        id: Number(job.employment_types.id),

        name: job.employment_types.name,

        code: job.employment_types.code

    }

});

const mapCareerDetails = (job) => ({

    basic: {

        id: Number(job.id),

        title: job.title,

        slug: job.slug,

        summary: job.summary,

        location: job.location,

        vacancies: job.vacancies,

        publishedAt: job.published_at,

        applicationDeadline: job.application_deadline,

        employmentType: {

            id: Number(job.employment_types.id),

            name: job.employment_types.name,

            code: job.employment_types.code

        }

    },

    description: job.description,

    documents: job.job_documents.map(document => ({

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

    mapCareerCard,

    mapCareerDetails

};