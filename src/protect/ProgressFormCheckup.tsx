import { useAuth } from "@/contexts/AuthContext";
import { useFormProgress } from "@/contexts/FormProgress"
import { ROLES } from "@/enums/roles";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";


const ProgressFormCheckup = () => {


    // console.log("ousll");




    // if (!formProgress) return <div className="text-center">Loading...</div>;

    // if (formProgress.formsCompleted) return <Outlet />


    console.log("ouselll progress form checkup");

    const { user } = useAuth();
    
    const { formProgress, fetchProgress } = useFormProgress();
    
    const navigate = useNavigate();



    useEffect(() => {
        if (user && user?.role === ROLES.ADMIN)
            fetchProgress();
    }, [user])



    if (!user) navigate("/login")

    if (user?.role === "SUPER_ADMIN") return <Outlet />

    return <Outlet />


}

export default ProgressFormCheckup;