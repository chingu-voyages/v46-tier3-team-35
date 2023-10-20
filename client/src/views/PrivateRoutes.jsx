import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../features/auth/authSlice";
import { restoreSession } from "../service/user";

function PrivateRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const userInfo = await restoreSession();
        dispatch(setUser(userInfo));
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
