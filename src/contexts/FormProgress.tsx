import { createContext, useContext } from "react";
import useApi from "@/hooks/useApi";
import apiGateway from "@/service/Api/apiGateway";
import type { FormProgress } from "@/types/FormProgress";




interface IFormContext {
    formProgress: FormProgress | undefined;
    fetchProgress: () => void;
}


const FormContext = createContext<IFormContext | undefined>(undefined);




export const FormProgressProvider = ({ children }: { children: React.ReactNode }) => {



    const { data, refetch } = useApi<FormProgress>({ url: apiGateway.school.getFormProgress(), queryKey: ["formProgress"], options: { fetchOnMount: false, } })

    const formProgress: FormProgress | undefined = data?.data

    const fetchProgress = () => {
        refetch();
    }

    return (
        <FormContext.Provider value={{ formProgress, fetchProgress }}>
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