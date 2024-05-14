import { useEffect, useState, createContext } from "react";

export const authContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch("http://localhost:8080/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.log("Somethin went wrong");
      }
      const userData = await response.json();
      setLoggedUser(userData);
    };
    if (!token) {
      return;
    }
    getUserData();
  }, [token]);

  const contextValue = {
    user: loggedUser,
  };

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};
