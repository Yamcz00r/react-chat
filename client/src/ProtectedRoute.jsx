import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
export function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    console.log("HERE");
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};
