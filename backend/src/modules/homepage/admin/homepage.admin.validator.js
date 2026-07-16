import { z } from "zod";

export const updateHeroSchema = z.object({

    body: z.object({

        title: z.string().min(1),

        subtitle: z.string().min(1),

        description: z.string().min(1),

        badge: z.string().optional(),

        heroImage: z.string().nullable(),

        heroVideo: z.string().nullable(),

        buttons: z.array(

            z.object({

                id: z.coerce.number(),

                label: z.string(),

                url: z.string(),

                buttonStyle: z.string(),

                displayOrder: z.coerce.number(),

                isActive: z.boolean()

            })

        )

    })

});