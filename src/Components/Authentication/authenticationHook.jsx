import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  let navigate = useNavigate();
  let location = useLocation();

  const createCookiesObject = () => {
    const cookiesArray = document.cookie.split(";").map((c) => c.split("="));
    const cookiesObject = {};
    cookiesArray.map((c) =>
      c[0] === "X-UserRoles"
        ? (cookiesObject[c[0]] = [c[1]])
        : (cookiesObject[c[0]] = c[1])
    );
    return cookiesObject;
  };

  const login = useCallback(() => {
    const cookiesObject = createCookiesObject();
    const email = cookiesObject[" X-UserEmail"].split("%40").join("@");

    setIsLoggedIn(true);
    setUserEmail(email);
    setUserRoles(cookiesObject["X-UserRoles"]);
    const from = location.pathname || "/";
    navigate(from, { replace: true });
  }, []);

  const logout = useCallback(async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        return;
      }
    } catch (err) {}

    setIsLoggedIn(false);
    setUserEmail(null);
    setUserRoles([]);
  }, []);

  const getAuthStatus = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/validateUser`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  };
  const getRefreshToken = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/refreshToken`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    async function isAuthenticated() {
      const authStatus = await getAuthStatus();
      if (!authStatus) {
        const gotRefreshToken = await getRefreshToken();
        if (!gotRefreshToken) {
          logout();
          return;
        }
      }
      login();
    }
    isAuthenticated();
    
  }, [login, logout]);

  return { login, logout, isLoggedIn, userEmail, userRoles };
};
