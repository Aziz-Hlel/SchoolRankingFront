import type { ApiPageResponse } from "./ApiPageResponse";

export type SchoolPage = {
    id: string;
    name: string;
    country: string;
    city: string;
    address: string;
    phoneNumber: string;
    email: string;
    website: string;

    isComplete: boolean;

    adminUsername: string;
}


export type PageSchool = ApiPageResponse<SchoolPage>;