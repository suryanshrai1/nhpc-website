import { z } from "zod";

export const getProjectsSchema = z.object({

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
            .default(12)

    })

});

export const getProjectBySlugSchema = z.object({

    params: z.object({

        slug: z
            .string()
            .trim()
            .regex(
                /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                "Invalid project slug."
            )

    })

});