import { NavLink } from "react-router-dom";

const PersonalNavlinks = () => {
  return (
    <ul className="nav-links nav-mobile">
      <li>
        <NavLink to="/user/profile">Profile</NavLink>
      </li>
      <li>
        <NavLink to="/user/donation">My Donations</NavLink>
      </li>
      <li>
        <NavLink to="/user/adoptionApplication">
          My Adoption Applications
        </NavLink>
      </li>
      <li>
        <NavLink to="/user/adoptionContract">My Adoption Contracts</NavLink>
      </li>
    </ul>
  );
};

export default PersonalNavlinks;
