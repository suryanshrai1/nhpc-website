import { z } from "zod";

export const contactSubmitSchema = z.object({
    body: z.object({
        full_name: z
            .string({ required_error: "Full name is required." })
            .trim()
            .min(1, "Full name cannot be empty.")
            .max(150, "Full name cannot exceed 150 characters."),

        email: z
            .string({ required_error: "Email address is required." })
            .trim()
            .email("Invalid email address format.")
            .max(255, "Email address cannot exceed 255 characters."),

        phone: z
            .string()
            .trim()
            .max(20, "Phone number cannot exceed 20 characters.")
            .optional()
            .nullable()
            .or(z.literal("")),

        department: z
            .string()
            .trim()
            .max(100, "Department cannot exceed 100 characters.")
            .optional()
            .nullable()
            .or(z.literal("")),

        subject: z
            .string({ required_error: "Subject is required." })
            .trim()
            .min(1, "Subject cannot be empty.")
            .max(255, "Subject cannot exceed 255 characters."),

        message: z
            .string({ required_error: "Message is required." })
            .trim()
            .min(1, "Message content cannot be empty.")
            .max(2000, "Message content cannot exceed 2000 characters.")
    })
});
