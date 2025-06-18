import type { ROLES } from "@/enums/roles";


export type User = {

    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: ROLES;

};