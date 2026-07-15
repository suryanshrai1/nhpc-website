import { z } from "zod";

const idSchema = z.coerce
    .number()
    .int()
    .positive();

export const getAdminLeadersSchema = z.object({

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

export const getAdminLeaderSchema = z.object({

    params: z.object({

        id: idSchema

    })

});

export const createLeaderSchema = z.object({

    body: z.object({

        full_name: z.string().trim().min(3).max(255),

        slug: z.string().trim().regex(

            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

            "Invalid slug."

        ),

        designation: z.string().trim().min(2).max(255),

        qualification: z.string().trim().optional(),

        experience_summary: z.string().optional(),

        description: z.string().optional(),

        email: z.string().email().optional(),

        phone: z.string().optional(),

        leadership_level_id: idSchema,

        display_order: z.coerce.number().int().default(1),

        is_active: z.boolean().default(true)

    })

});

export const updateLeaderSchema = z.object({

    params: z.object({

        id: idSchema

    }),

    body: createLeaderSchema.shape.body

});

export const updateLeaderStatusSchema = z.object({

    params: z.object({

        id: idSchema

    }),

    body: z.object({

        is_active: z.boolean()

    })

});