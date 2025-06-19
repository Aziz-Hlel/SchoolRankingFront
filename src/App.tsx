import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SignUp from "./pages/SignUp";
import { Dashboard } from "./components/Dashboard";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AdminManagement } from "./components/AdminManagement";
import { SchoolManagement } from "./components/SchoolManagement";
import { ProfileInformation } from "./components/Profile/ProfileInformation";
import { SchoolProfile } from "./components/SchoolProfile";
import { MySchool } from "./components/MySchool";
import ChangePassword from "./components/Profile/ChangePassword";


const queryClient = new QueryClient();


function App() {


  // < Dashboard />

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Sonner />

          <Router>
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route element={<ProtectedRoutes />}>


                <Route path="/dashboard" element={<Dashboard />} >
                  <Route path="admins" element={<AdminManagement />} />
                  <Route path="schools" element={<SchoolManagement />} />

                  <Route path="my-school" element={<MySchool />} />

                  <Route path="profile" element={<ProfileInformation />} >
                    <Route path="change-password" element={<ChangePassword />} />
                  </Route>

                </Route>

              </Route>


              <Route path="*" element={<NotFound />} />


            </Routes>
          </Router>
        </QueryClientProvider >
      </AuthProvider >
    </>
  )
}

export default App
