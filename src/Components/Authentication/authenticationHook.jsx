import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRoles, setuserRoles] = useState([]);
  let navigate = useNavigate();
  let location = useLocation();

  const getUserRolesCookie = () => {
    const cookiesArray = document.cookie.split(";").map((c) => c.split("="));
    const cookiesObject = {};
    cookiesArray.map((c) => (cookiesObject[c[0]] = [c[1]]));
    return cookiesObject;
  };

  const login = useCallback((isLoggedIn, userRoles) => {
    setIsLoggedIn(isLoggedIn);
    setuserRoles(userRoles);
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
    setuserRoles([]);
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
      const cookies = getUserRolesCookie();
      login(true, cookies["X-UserRoles"]);
    }
    isAuthenticated();
  }, [login, logout]);

  return { login, logout, isLoggedIn, userRoles };
};
