import type { ApiResponse } from "@/service/Api/ApiResponse";



export interface DetachedFormProps<K> {
    NavigationButtons: React.ReactNode;
    mutationFn: (data: K) => Promise<ApiResponse<unknown>>;
    pathPostSuccess: string;


}