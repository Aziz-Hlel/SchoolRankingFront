
// ! not used anywhere idk i think this is the better and more accurate type for the api response but got into some type issues with it so decided to hold off for the moment
export type ApiResponse<T> = {
    success: boolean,
    status: number,
    data: T,
    error?: string | { [key: string]: string },
    timestamp: string;
    metadata?: Record<string, unknown>;

}