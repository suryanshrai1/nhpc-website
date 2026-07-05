import { z } from "zod";

export const uploadMediaSchema = z.object({

    folder_id: z
        .union([
            z.coerce.number().int().positive(),
            z.literal("")
        ])
        .optional()
        .transform(value => value === "" ? undefined : value),

    alt_text: z
        .string()
        .trim()
        .max(255)
        .optional(),

    caption: z
        .string()
        .trim()
        .max(255)
        .optional(),

    description: z
        .string()
        .trim()
        .max(2000)
        .optional()

});