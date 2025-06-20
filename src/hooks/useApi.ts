import { useEffect, useState } from "react";
import { HttpMethods, type HttpMethod } from "../constants/HttpMethod";
import { apiService, type ApiResponse } from "../service/Api/apiService";
import type { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Pageable } from "@/types/Apis/Pageable";



interface UseApiOptions {
    url: string;
    queryParams?: Pageable;
    onError?: (error: any) => void;
    onSuccess?: (data: any) => void;
    queryKey: string[];
    options: {
        fetchOnMount?: boolean; // Should auto-execute on mount
        config?: AxiosRequestConfig & { params?: Pageable };
    }
}


const useApi = <K>({ url, onError, onSuccess, queryKey, options }: UseApiOptions) => {


    const fetch = () => apiService.getThrowable<K>(url, options.config);


    return useQuery({
        queryKey: [...queryKey, options.config?.params],
        queryFn: fetch,
        enabled: options.fetchOnMount, // don't fetch automatically
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
        retry: 0, // retry failed requests twice
        refetchOnWindowFocus: false, // refetch when window is focused
    });



}


export default useApi;