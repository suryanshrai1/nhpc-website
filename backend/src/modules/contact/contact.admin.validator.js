import { z } from "zod";

export const getAdminMessagesSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(10),
        status_id: z.coerce.number().int().optional()
    })
});

export const getAdminMessageSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive()
    })
});

export const updateMessageStatusSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive()
    }),
    body: z.object({
        message_status_id: z.coerce.number().int().positive()
    })
});
