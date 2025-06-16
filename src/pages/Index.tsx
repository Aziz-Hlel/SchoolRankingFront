import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom"
import Login from "./Login";
import { ROLES } from "@/enums/roles";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {

    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    if (isLoading) return <>Loading...</>;

    if (!user) return <Login />;

    if (user.role === ROLES.SUPER_ADMIN) {
        console.log("t5l")
        navigate("/dashboard");
    }


    return <Dashboard />

}

export default Index;