import { NavLink } from "react-router-dom";
import { useContext } from "react";
import Button from "@mui/material/Button";
import { AuthContext } from "../Authentication/AuthContext";

import "./Navigation.css";

const Navlinks = ({ isMobile }) => {
  const auth = useContext(AuthContext);
  // only show menu links that the current User is authorized to - put userRoles in non-httponly cookie - ONLY use for rendering nav links, not for auth!! 

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

      {auth.isLoggedIn && auth.userRoles.includes("Administrator") && (
        <li>
          <NavLink to="/user">Users</NavLink>
        </li>
      )}

      {/* check if userRoles contains any of the values of the array of roles that are authorized to access routes 
      Also works with:  ["Administrator", "ShelterEmployee"].includes(auth.userRoles[0])*/}
      {auth.isLoggedIn &&
        auth.userRoles.some(r=> ["Administrator", "ShelterEmployee"].indexOf(r) >= 0) && (
          <>
            <li>
              <NavLink to="/donation">Donations</NavLink>
            </li>
            <li>
              <NavLink to="/adoptionApplication">Applications</NavLink>
            </li>
            <li>
              <NavLink to="/adoptionContract">Contracts</NavLink>
            </li>
          </>
        )}

      {auth.isLoggedIn &&
        auth.userRoles.some(r=> ["Administrator", "ShelterEmployee", "Adopter"].indexOf(r) >= 0) && (
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
