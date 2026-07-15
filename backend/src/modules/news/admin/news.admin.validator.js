import { z } from "zod";

const idSchema = z.coerce.number().int().positive();

export const getAdminNewsSchema = z.object({

    query: z.object({

        page: z.coerce.number().int().min(1).default(1),

        limit: z.coerce.number().int().min(1).max(100).default(10)

    })

});

export const getAdminNewsByIdSchema = z.object({

    params: z.object({

        id: idSchema

    })

});

export const createNewsSchema = z.object({

    body: z.object({

        title: z.string().trim().min(3).max(255),

        slug: z.string().trim().regex(

            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

            "Invalid slug."

        ),

        news_category_id: idSchema,

        summary: z.string().trim().optional(),

        content: z.string().optional(),

        published_at: z.coerce.date().optional(),

        is_featured: z.boolean().default(false),

        display_order: z.coerce.number().int().default(1),

        is_active: z.boolean().default(true)

    })

});

export const updateNewsSchema = z.object({

    params: z.object({

        id: idSchema

    }),

    body: createNewsSchema.shape.body

});

export const updateNewsStatusSchema = z.object({

    params: z.object({

        id: idSchema

    }),

    body: z.object({

        is_active: z.boolean()

    })

});