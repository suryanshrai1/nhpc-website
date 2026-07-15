import { z } from "zod";

const idSchema = z.coerce
    .number()
    .int()
    .positive();

export const getAdminDocumentsSchema = z.object({

    query: z.object({

        page: z.coerce
            .number()
            .int()
            .min(1)
            .default(1),

        limit: z.coerce
            .number()
            .int()
            .min(1)
            .max(100)
            .default(10)

    })

});

export const getAdminDocumentSchema = z.object({

    params: z.object({

        id: idSchema

    })

});

export const createDocumentSchema = z.object({

    body: z.object({

        title: z.string().trim().min(3).max(255),

        investor_document_type_id: idSchema,

        financial_year_id: idSchema.optional(),

        description: z.string().optional(),

        media_file_id: idSchema,

        published_at: z.coerce.date().optional(),

        display_order: z.coerce.number().int().default(1),

        is_active: z.boolean().default(true)

    })

});

export const updateDocumentSchema = z.object({

    params: z.object({

        id: idSchema

    }),

    body: createDocumentSchema.shape.body

});

export const updateDocumentStatusSchema = z.object({

    params: z.object({

        id: idSchema

    }),

    body: z.object({

        is_active: z.boolean()

    })

});