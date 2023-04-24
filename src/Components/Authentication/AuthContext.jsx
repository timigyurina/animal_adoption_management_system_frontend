import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userEmail: null,
  userRoles: [],
  login: () => {},
  logout: () => {},
});
