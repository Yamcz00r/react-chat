import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
export function ProtectedRoute({ children, path }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={path} replace={true} />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element,
  path: PropTypes.string,
};
