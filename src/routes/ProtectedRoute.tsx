import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ReactNode } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import BreadCrumb from "../ui/BreadCrumb";
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // 👈 Don't redirect until done loading
  return user ? (
    <>
      <Header />
      <div className="container-fluid d-flex ps-0" style={{ backgroundColor: "#fff" }}>
        <Sidebar />
        <div className="d-flex w-100 flex-column pt-3">
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Dashboard", href: "/dashboard" }
            ]}
          />
          {children}
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
