import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SignUp from "./pages/SignUp";
import { Dashboard } from "./components/Dashboard";
import { Toaster as Sonner } from "@/components/ui/sonner";


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

                <Route path="/protected" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />

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
