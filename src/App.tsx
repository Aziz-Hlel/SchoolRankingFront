import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AuthenticatedRoutes from "./protect/AuthenticatedRoutes";
import SignUp from "./pages/SignUp";
import { Dashboard } from "./components/Dashboard";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AdminManagement } from "./components/AdminManagement";
import { SchoolManagement } from "./components/SchoolManagement";
import { ProfileInformation } from "./components/Profile/ProfileInformation";
import { MySchool } from "./components/MySchool";
import ChangePassword from "./components/Profile/ChangePassword";
import ProgressFormCheckup from "./protect/ProgressFormCheckup";
import { FormProgressProvider } from "./contexts/FormProgress";
import AuthorizedRoutes from "./protect/AuthorizedRoutes";
import { ROLES } from "./enums/roles";
import DashboardRedirect from "./components/DashboardRedirect";
import { SchoolGeneralStep } from "./components/school-steps/SchoolGeneralStep";


const queryClient = new QueryClient();


function App() {


  // < Dashboard />

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <FormProgressProvider>

            <Sonner />

            <Router>
              <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route element={<AuthenticatedRoutes />}>

                  <Route element={<ProgressFormCheckup />} >

                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} >

                      {/* Redirect when path is exactly /dashboard */}
                      <Route index element={<DashboardRedirect />} />

                      <Route element={<AuthorizedRoutes roles={[ROLES.SUPER_ADMIN]} />} >
                        <Route path="admins" element={<AdminManagement />} />
                        <Route path="schools" element={<SchoolManagement />} />
                      </Route>


                      <Route element={<AuthorizedRoutes roles={[ROLES.ADMIN]} />} >
                        <Route path="my-school" element={<MySchool />} />
                      </Route>


                      <Route path="profile" element={<ProfileInformation />} >
                        <Route path="change-password" element={<ChangePassword />} />
                      </Route>

                    </Route>

                    <Route element={<SchoolGeneralStep />} />

                  </Route>
                </Route>


                <Route path="*" element={<NotFound />} />


              </Routes>
            </Router>
          </FormProgressProvider>
        </QueryClientProvider >
      </AuthProvider >
    </>
  )
}

export default App
