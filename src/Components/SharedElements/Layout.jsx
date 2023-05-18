import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import EnumContextProvider from "../../context/EnumContextProvider";

const Layout = () => {
  return (
    <>
      <EnumContextProvider>
        <Navbar />
        <Outlet />
      </EnumContextProvider>
    </>
  );
};

export default Layout;
