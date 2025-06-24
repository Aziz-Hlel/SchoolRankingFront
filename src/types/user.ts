import type { ROLES } from "@/enums/roles";


export type User = {

    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: ROLES;
    schoolId: string | null;

};