import type { ROLES } from "@/enums/roles";


export type User = {

    name: string;
    email: string;
    role: ROLES;

};