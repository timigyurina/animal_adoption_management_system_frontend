import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userRoles: [],
  login: () => {},
  logout: () => {},
});
