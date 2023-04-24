import { NavLink } from "react-router-dom";
import { useContext } from "react";
import Button from "@mui/material/Button";
import { AuthContext } from "../Authentication/AuthContext";

import "./Navigation.css";

const Navlinks = ({ isMobile }) => {
  const auth = useContext(AuthContext);

  return (
    <ul className={`nav-links ${isMobile && "nav-mobile"} `}>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/animal">Animals</NavLink>
      </li>
      <li>
        <NavLink to="/image">Images</NavLink>
      </li>

      {auth.isLoggedIn &&(
        // auth.userRoles.some(r=> ["Administrator", "ShelterEmployee", "Adopter"].indexOf(r) >= 0) && 
          <>
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
          <Button variant="contained" onClick={auth.logout}>Log out</Button> 
        </li>
      ) : (
        <li>
          <NavLink  to="/login">LOG IN</NavLink>
        </li>
      )}
    </ul>
  );
};

export default Navlinks;
