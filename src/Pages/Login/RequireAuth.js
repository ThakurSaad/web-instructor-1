import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";
import Loading from "../Shared/Loading";

function RequireAuth({ children }) {
  const [user, loading] = useAuthState(auth);
  let location = useLocation();
  const [token] = useToken(auth);

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
