import { z } from "zod";


const UserResponseSchema = z.object({

    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    schoolId: z.string().optional(),
    role: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type UserResponse = z.infer<typeof UserResponseSchema>