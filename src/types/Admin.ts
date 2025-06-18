import type { ROLES } from "@/enums/roles";


export type Admin = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: ROLES;
    email: string;
    schoolName: string;
    isCompleted: boolean;
    createdAt: Date
}