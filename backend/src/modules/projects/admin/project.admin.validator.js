import { z } from "zod";

export const getAdminProjectsSchema = z.object({

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

export const getAdminProjectSchema = z.object({

    params: z.object({

        id: z.coerce
            .number()
            .int()
            .positive()

    })

});

export const createProjectSchema = z.object({

    body: z.object({

        name: z
            .string()
            .trim()
            .min(3)
            .max(255),

        slug: z
            .string()
            .trim()
            .regex(
                /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                "Invalid slug."
            ),

        project_type_id: z.coerce
            .number()
            .int()
            .positive(),

        project_status_id: z.coerce
            .number()
            .int()
            .positive(),

        state_id: z.coerce
            .number()
            .int()
            .positive(),

        capacity: z.coerce
            .number()
            .positive(),

        capacity_unit_id: z.coerce
            .number()
            .int()
            .positive(),

        summary: z
            .string()
            .trim()
            .optional(),

        latitude: z
            .string()
            .optional(),

        longitude: z
            .string()
            .optional(),

        is_featured: z
            .boolean()
            .default(false),

        display_order: z.coerce
            .number()
            .int()
            .positive()
            .default(1),

        is_active: z
            .boolean()
            .default(true),

        thumbnail_media_id: z.coerce
            .number()
            .int()
            .positive()
            .optional()
            .nullable(),

        hero_media_id: z.coerce
            .number()
            .int()
            .positive()
            .optional()
            .nullable()

    })

});

export const updateProjectSchema = z.object({

    params: z.object({

        id: z.coerce
            .number()
            .int()
            .positive()

    }),

    body: z.object({

        name: z
            .string()
            .trim()
            .min(3)
            .max(255),

        slug: z
            .string()
            .trim()
            .regex(
                /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                "Invalid slug."
            ),

        project_type_id: z.coerce
            .number()
            .int()
            .positive(),

        project_status_id: z.coerce
            .number()
            .int()
            .positive(),

        state_id: z.coerce
            .number()
            .int()
            .positive(),

        capacity: z.coerce
            .number()
            .positive(),

        capacity_unit_id: z.coerce
            .number()
            .int()
            .positive(),

        summary: z
            .string()
            .trim()
            .optional(),

        latitude: z
            .string()
            .optional(),

        longitude: z
            .string()
            .optional(),

        is_featured: z.boolean(),

        display_order: z.coerce
            .number()
            .int(),

        is_active: z.boolean(),

        thumbnail_media_id: z.coerce
            .number()
            .int()
            .positive()
            .optional()
            .nullable(),

        hero_media_id: z.coerce
            .number()
            .int()
            .positive()
            .optional()
            .nullable()

    })

});

export const updateProjectStatusSchema = z.object({

    params: z.object({

        id: z.coerce
            .number()
            .int()
            .positive()

    }),

    body: z.object({

        is_active: z.boolean()

    })

});