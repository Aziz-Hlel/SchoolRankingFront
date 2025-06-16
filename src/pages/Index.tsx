import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom"
import Login from "./Login";
import { ROLES } from "@/enums/roles";

const Index = () => {

    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    if (isLoading) return <>Loading...</>;

    if (!user) return <Login />;

    if (user.role === ROLES.SUPER_ADMIN){
         console.log("t5l")
        navigate("/dashboard");}

 console.log(user)

}

export default Index;