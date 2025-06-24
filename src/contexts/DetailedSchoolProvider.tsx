import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import apiGateway from "@/service/Api/apiGateway";
import useApi from "@/hooks/useApi";
import type { SchoolDetailed } from "@/types/School2.type";
import { ROLES } from "@/enums/roles";

interface DetailedSchoolContextProps {
    detailedSchool: SchoolDetailed | undefined;
    fetchDetailedSchool: (schoolId: string) => void;
}



const DetailedSchoolContext = createContext<DetailedSchoolContextProps | undefined>(undefined);


export const DetailedSchoolProvider: FC<{ children: ReactNode }> = ({ children }) => {


    const [schoolId, setSchoolId] = useState<string>('');


    const { user } = useAuth();

    const { data } = useApi<SchoolDetailed>({ url: apiGateway.school.getDetailedSchool(schoolId), queryKey: ["school", "detailed", schoolId], options: { fetchOnMount: schoolId !== '' } })

    const detailedSchool = data?.data;




    const fetchDetailedSchool = (schoolId: string) => {
        setSchoolId(schoolId);
    }


    useEffect(() => {

        if (user && user.role === ROLES.ADMIN && user.schoolId) {
            console.log("Fetching detailed school for admin", user.schoolId);
            setSchoolId(user.schoolId);
        }


    }, [user?.schoolId])




    return (
        <DetailedSchoolContext.Provider value={{ detailedSchool, fetchDetailedSchool }}>
            {children}
        </DetailedSchoolContext.Provider>
    )
}


export const useDetailedSchool = () => {

    const context = useContext(DetailedSchoolContext);
    if (context === undefined)
        throw new Error("useDetailedSchool must be used within a DetailedSchoolProvider");

    return context;
};