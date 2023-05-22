import { useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const { login, logout, isLoggedIn, userEmail, userRoles, isAuthenticated } =
    useAuthentication();

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userEmail: userEmail,
        userRoles: userRoles,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
