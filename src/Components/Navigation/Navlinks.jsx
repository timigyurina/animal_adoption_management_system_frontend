import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";

import "./Navigation.css";

const Navlinks = ({ isMobile }) => {
  const auth = useContext(AuthContext);

  return (
    <ul className={`nav-links ${isMobile && "nav-mobile"} `}>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/image">Images</NavLink>
      </li>

      {auth.isLoggedIn && (
        // auth.userRoles.some(r=> ["Administrator", "ShelterEmployee", "Adopter"].indexOf(r) >= 0) &&
        <>
          <li>
            <NavLink to="/animal">Animals</NavLink>
          </li>
          <li>
            <NavLink to="/shelter">Shelters</NavLink>
          </li>
          <li>
            <NavLink to="/animalBreed">Breeds</NavLink>
          </li>
        </>
      )}

      {auth.isLoggedIn ? (
        <li>
          <Button variant="contained" color="secondary" onClick={auth.logout}>
            Logout
          </Button>
        </li>
      ) : (
        <>
          <li>
            <NavLink to="/login"> LOGIN</NavLink>
          </li>
          <li>
            <NavLink to="/register"> Register</NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default Navlinks;
