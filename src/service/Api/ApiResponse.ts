
export type ApiResponse<T> = {
    success: boolean,
    status: number,
    data: T,
    error?: string | { [key: string]: string },
    timestamp: string;
    metadata?: Record<string, unknown>;

}