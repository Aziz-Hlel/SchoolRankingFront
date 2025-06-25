import { createContext, useContext } from "react";
import useApi from "@/hooks/useApi";
import apiGateway from "@/service/Api/apiGateway";
import type { FormProgress } from "@/types/FormProgress";
import type { QueryObserverResult } from "@tanstack/react-query";
import type { ApiResponse } from "@/service/Api/apiService";




interface IFormContext {
    formProgress: FormProgress | null;
    isLoading: boolean;
    fetchProgress: () => Promise<QueryObserverResult<ApiResponse<FormProgress>, Error>>;
}


const FormContext = createContext<IFormContext | undefined>(undefined);




export const FormProgressProvider = ({ children }: { children: React.ReactNode }) => {



    const { data, refetch, isLoading } = useApi<FormProgress>({ url: apiGateway.school.getFormProgress(), queryKey: ["formProgress"], options: { fetchOnMount: false, } })

    const formProgress: FormProgress | null = data?.data ?? null

    const fetchProgress = async () => await refetch();


    return (
        <FormContext.Provider value={{ formProgress, fetchProgress, isLoading }}>
            {children}
        </FormContext.Provider>
    );
}


export const useFormProgress = () => {

    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error("useFormProgress must be used within a FormProgressProvider");
    }
    return context;
}