import { z } from "zod";

const idSchema = z.coerce.number().int().positive();

export const getAdminStationsSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(10)
    })
});

export const getAdminStationSchema = z.object({
    params: z.object({
        id: idSchema
    })
});

export const createStationSchema = z.object({
    body: z.object({
        name: z.string().trim().min(3).max(200),
        slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug."),
        state_id: idSchema,
        project_type_id: idSchema,
        installed_capacity: z.coerce.number().positive(),
        capacity_unit_id: idSchema,
        commissioned_on: z
            .string()
            .optional()
            .nullable()
            .transform((val) => (val === "" ? null : val)),
        latitude: z.coerce.number().optional().nullable(),
        longitude: z.coerce.number().optional().nullable(),
        description: z.string().optional().nullable(),
        is_featured: z.boolean().default(false),
        display_order: z.coerce.number().int().default(1),
        is_active: z.boolean().default(true)
    })
});

export const updateStationSchema = z.object({
    params: z.object({
        id: idSchema
    }),
    body: createStationSchema.shape.body
});

export const updateStationStatusSchema = z.object({
    params: z.object({
        id: idSchema
    }),
    body: z.object({
        is_active: z.boolean()
    })
});
