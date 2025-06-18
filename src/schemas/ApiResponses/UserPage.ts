import { ROLES } from "@/enums/roles";
import z from "zod";



export const userPageSchema = z.object({

    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    schoolName: z.string().optional(),
    role: z.enum([...Object.values(ROLES)] as [ROLES, ...ROLES[]]),
    createdAt: z.string(),
    updatedAt: z.string(),
}).array()

export type UserPage = z.infer<typeof userPageSchema>



