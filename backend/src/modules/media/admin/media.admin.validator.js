import { z } from "zod";

const idSchema = z.coerce
    .number()
    .int()
    .positive();

export const getMediaListSchema = z.object({

    query: z.object({

        page: z.coerce.number().int().min(1).default(1),

        limit: z.coerce.number().int().min(1).max(100).default(20)

    })

});

export const getMediaSchema = z.object({

    params: z.object({

        id: idSchema

    })

});

export const uploadMediaSchema = z.object({

    body: z.object({

        folder_id: idSchema.optional(),

        alt_text: z.string().max(255).optional(),

        caption: z.string().optional()

    })

});