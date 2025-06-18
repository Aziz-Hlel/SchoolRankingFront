import type { User } from "../user";


export type SignUpApiResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export type SigInApiResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
}