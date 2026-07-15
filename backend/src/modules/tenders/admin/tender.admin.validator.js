import { z } from "zod";

const idSchema = z.coerce
    .number()
    .int()
    .positive();

export const getAdminTendersSchema = z.object({

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

export const getAdminTenderSchema = z.object({

    params: z.object({

        id: idSchema

    })

});

export const createTenderSchema = z.object({

    body: z.object({

        title: z.string().trim().min(3).max(255),

        tender_number: z.string().trim().min(3).max(100),

        slug: z.string().trim().regex(

            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

            "Invalid slug."

        ),

        tender_category_id: idSchema,

        tender_status_id: idSchema,

        summary: z.string().optional(),

        description: z.string().optional(),

        published_at: z.coerce.date().optional(),

        opening_date: z.coerce.date().optional(),

        closing_date: z.coerce.date().optional(),

        display_order: z.coerce.number().int().default(1),

        is_active: z.boolean().default(true)

    })

});

export const updateTenderSchema = z.object({

    params: z.object({

        id: idSchema

    }),

    body: createTenderSchema.shape.body

});

export const updateTenderStatusSchema = z.object({

    params: z.object({

        id: idSchema

    }),

    body: z.object({

        is_active: z.boolean()

    })

});