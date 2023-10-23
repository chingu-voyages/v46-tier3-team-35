import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes({ auth }) {
  const isAuthenticated = auth.isAuthenticated();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
