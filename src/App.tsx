import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
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
import { MySchool } from "./components/MySchool/MySchool";
import ChangePassword from "./components/Profile/ChangePassword";
import ProgressFormCheckup from "./protect/ProgressFormCheckup";
import { FormProgressProvider } from "./contexts/FormProgress";
import AuthorizedRoutes from "./protect/AuthorizedRoutes";
import { ROLES } from "./enums/roles";
import DashboardRedirect from "./components/DashboardRedirect";
import { SchoolGeneralStep } from "./components/school-steps/SchoolGeneralStep";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type CompleteSchoolData, type SchoolGeneralData, schoolGeneralSchema } from "./types/school";
import { useState } from "react";
import { DetailedSchoolProvider } from "./contexts/DetailedSchoolProvider";
import { PageProvider } from "./contexts/PageContext";
import AdminSchoolView from "./components/MySchool/AdminSchoolView";


const queryClient = new QueryClient();


function App() {

  const [formData, setFormData] = useState<Partial<CompleteSchoolData>>({});

  const generalForm = useForm<SchoolGeneralData>({
    resolver: zodResolver(schoolGeneralSchema),
    defaultValues: {
      name: formData.name || '',
      country: formData.country || undefined,
      city: formData.city || '',
      address: formData.address || '',
      phoneNumber: formData.phoneNumber || '',
      email: formData.email || '',
      yearEstablished: formData.yearEstablished || undefined,
      website: formData.website || '',
      type: formData.type || undefined,
    },
  });
  // < Dashboard />

  return (
    <>
      <AuthProvider>
        <PageProvider>
          <QueryClientProvider client={queryClient}>
            <FormProgressProvider>
              <DetailedSchoolProvider>

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

                            <Route path="schools" element={<Outlet />} >
                              <Route index element={<SchoolManagement />} />
                              <Route path=":schoolId" element={<AdminSchoolView/>} />
                            </Route>

                          </Route>

                          <Route path="form/general" element={<SchoolGeneralStep form={generalForm} />} />

                          <Route element={<AuthorizedRoutes roles={[ROLES.ADMIN]} />} >
                            <Route path="my-school" element={<MySchool userRole={ROLES.ADMIN} />} />
                          </Route>


                          <Route path="profile" element={<ProfileInformation />} >
                            <Route path="change-password" element={<ChangePassword />} />
                          </Route>

                        </Route>
                      </Route>

                    </Route>


                    <Route path="*" element={<NotFound />} />


                  </Routes>
                </Router>
              </DetailedSchoolProvider>
            </FormProgressProvider>
          </QueryClientProvider >
        </PageProvider>
      </AuthProvider >
    </>
  )
}

export default App
