import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navlinks = ({ isMobile }) => {
  const isLoggedIn = true;
  // only show menu links that the current User is authorized to - add queryparams: ..../validateUser?role=roleOfUserThatShouldSeeLink
  // OR put userRoles in non-httponly cookie - ONLY use for rendering nav links, not for auth!! -
  const roles = ["Administrator"];

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

      {isLoggedIn && roles.includes("Administrator") && (
        <li>
          <NavLink to="/user">Users</NavLink>
        </li>
      )}

      {isLoggedIn &&
        ["Administrator", "ShelterEmployee"].includes(roles[0]) && (
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

      {isLoggedIn &&
        ["Administrator", "ShelterEmployee", "Adopter"].includes(roles[0]) && (
          <>
            <li>
              <NavLink to="/shelter">Shelters</NavLink>
            </li>
            <li>
              <NavLink to="/animalBreed">Breeds</NavLink>
            </li>

            <li>
              <NavLink to="/profile">My profile</NavLink>
            </li>
          </>
        )}
      {isLoggedIn ? (
        <li>
          <button>Log out</button> {/*onClick={auth.logout} */}
        </li>
      ) : (
        <li>
          <NavLink to="/login">Log in</NavLink>
        </li>
      )}
    </ul>
  );
};

export default Navlinks;
