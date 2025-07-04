import type { ROLES } from "@/enums/roles";
import type { ApiPageResponse } from "./ApiPageResponse";


export type Admin = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: ROLES;
    email: string;
    createdAt: Date
}


export type AdminPage = ApiPageResponse<Admin>;