import { Outlet } from "react-router-dom";
import Navbar from "./Navigation/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
