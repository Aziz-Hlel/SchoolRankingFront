import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import NotFound from "./pages/Notfounds/NotFound";
import AuthenticatedRoutes from "./Guard/AuthenticatedRoutes";
import { Dashboard } from "./components/Dashboard";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AdminManagement } from "./components/AdminManagement";
import { SchoolsManagement } from "./components/SchoolsManagement";
import { ProfileInformation } from "./components/Profile/ProfileInformation";
import { SchoolView } from "./components/MySchool/SchoolView";
import ChangePassword from "./components/Profile/ChangePassword";
import AuthorizedRoutes from "./Guard/AuthorizedRoutes";
import { ROLES } from "./enums/roles";
import DashboardRedirect from "./components/DashboardRedirect";
import { DetailedSchoolProvider } from "./contexts/DetailedSchoolProvider";
import { PageProvider } from "./contexts/PageContext";
import GeneralForm from "./components/Forms/InitialForms/Wrapper/GeneralForm";
import AcademicsForm from "./components/Forms/InitialForms/Wrapper/AcademicsForm";
import FacilitiesForm from "./components/Forms/InitialForms/Wrapper/FacilitiesForm";
import StaffForm from "./components/Forms/InitialForms/Wrapper/StaffForm";
import MediaForm from "./components/Forms/InitialForms/Wrapper/MediaForm";
import GeneralUpdateForm from "./components/Forms/UpdateForm/Wrapper/GeneralUpdateForm";
import DetailedSchoolExists from "./Guard/DetailedSchoolExists";
import AcademicsUpdateForm from "./components/Forms/UpdateForm/Wrapper/AcademicsUpdateForm";
import FacilitiesUpdatedForm from "./components/Forms/UpdateForm/Wrapper/FacilitiesUpdatedForm";
import StaffUpdatedForm from "./components/Forms/UpdateForm/Wrapper/StaffUpdatedForm";
import MediaUpdatedForm from "./components/Forms/UpdateForm/Wrapper/MediaUpdatedForm";
import SchoolViewManagemet from "./components/MySchool/SchoolViewManagemet";
import Login2 from "./pages/Login2";
import SchoolFormsCompleted from "./Guard/SchoolFormsCompleted";
import SchoolNotFound from "./pages/Notfounds/SchoolNotFound";


const queryClient = new QueryClient();


function App() {


  return (
    <>
      <Router>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <PageProvider>
              <DetailedSchoolProvider>

                <Sonner />

                <Routes>

                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/login" element={<Login2 />} />
                  {/* <Route path="/signup" element={<SignUp />} /> */}

                  <Route element={<AuthenticatedRoutes />}>

                    <Route path="forms" element={<Outlet />}>
                      <Route path="general" element={<GeneralForm />} />
                      <Route path="academics" element={<AcademicsForm />} />
                      <Route path="facilities" element={<FacilitiesForm />} />
                      <Route path="staff" element={<StaffForm />} />
                      <Route path="media" element={<MediaForm />} />
                    </Route>

                    {/* <Route path="/" element={<Dashboard />} /> */}
                    <Route path="dashboard" element={<Dashboard />} >

                      {/* Redirect when path is exactly /dashboard */}
                      <Route index element={<DashboardRedirect />} />

                      <Route element={<AuthorizedRoutes roles={[ROLES.SUPER_ADMIN]} />} >

                        <Route path="admins" element={<AdminManagement />} />

                        <Route path="schools" element={<Outlet />} >
                          <Route index element={<SchoolsManagement />} />
                          <Route path=":schoolId" element={<SchoolViewManagemet />} >
                            <Route index element={<SchoolView />} />

                            <Route element={<DetailedSchoolExists />}>
                              <Route path="edit" element={<Outlet />} >
                                <Route path="general" element={<GeneralUpdateForm />} />
                                <Route path="academics" element={<AcademicsUpdateForm />} />
                                <Route path="facilities" element={<FacilitiesUpdatedForm />} />
                                <Route path="staff" element={<StaffUpdatedForm />} />
                                <Route path="media" element={<MediaUpdatedForm />} />
                              </Route>

                            </Route>
                          </Route>
                        </Route>

                      </Route>


                      <Route element={<AuthorizedRoutes roles={[ROLES.ADMIN]} />} >
                        <Route path="my-school/:schoolId" element={<SchoolViewManagemet />} >

                          <Route element={<SchoolFormsCompleted />} >
                            <Route index element={<SchoolView />} />

                            <Route path="edit" element={<Outlet />} >
                              <Route path="general" element={<GeneralUpdateForm />} />
                              <Route path="academics" element={<AcademicsUpdateForm />} />
                              <Route path="facilities" element={<FacilitiesUpdatedForm />} />
                              <Route path="staff" element={<StaffUpdatedForm />} />
                              <Route path="media" element={<MediaUpdatedForm />} />
                            </Route>

                          </Route>


                        </Route>

                        <Route path="add-school" element={<Outlet />}>
                          <Route index path="form/general" element={<GeneralForm />} />
                          <Route element={<DetailedSchoolExists />}>
                            <Route path=":schoolId/form/academics" element={<AcademicsForm />} />
                            <Route path=":schoolId/form/facilities" element={<FacilitiesForm />} />
                            <Route path=":schoolId/form/staff" element={<StaffForm />} />
                            <Route path=":schoolId/form/media" element={<MediaForm />} />
                          </Route>
                        </Route>

                      </Route>


                      <Route path="profile" element={<ProfileInformation />} >
                        <Route path="change-password" element={<ChangePassword />} />
                      </Route>

                      <Route path="school/404" element={<SchoolNotFound />} />
                    </Route>
                  </Route>



                  <Route path="*" element={<NotFound />} />


                </Routes>

              </DetailedSchoolProvider>
            </PageProvider >
          </QueryClientProvider >
        </AuthProvider >
      </Router >
    </>
  )
}

export default App
