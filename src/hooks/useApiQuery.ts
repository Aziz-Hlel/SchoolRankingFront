import { apiService, type ApiResponse } from "../service/Api/apiService";
import type { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Pageable } from "@/types/Apis/Pageable";



interface UseApiOptions {
    url: string;
    queryParams?: Pageable;
    onError?: (error: any, query: any) => void;
    onSuccess?: (data: any) => void;
    queryKey: string[];
    options: {
        fetchOnMount?: boolean; // Should auto-execute on mount
        staleData?: boolean;
        cacheData?: boolean;
        config?: AxiosRequestConfig & { params?: Pageable };
    }
}


const useApiQuery = <K>({ url, onSuccess, onError, queryKey, options }: UseApiOptions) => {
    const fetch = () => apiService.getThrowable<K>(url, options.config);


    return useQuery<ApiResponse<K>, Error, ApiResponse<K>, any[]>({
        queryKey: [...queryKey, options.config?.params],
        queryFn: fetch,
        enabled: options.fetchOnMount,
        staleTime: options.staleData === false ? 0 : 1000 * 60 * 5,
        retry: 0,
        refetchOnWindowFocus: false,


        throwOnError: (error, query) => { onError && onError(error, query); return false }

    });

}

export default useApiQuery;