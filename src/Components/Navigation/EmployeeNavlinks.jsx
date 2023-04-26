import { NavLink } from "react-router-dom";

const EmployeeNavlinks = () => {
  return (
    <ul className="nav-links nav-mobile">
      <li>
        <NavLink to="/userShelter">Shelter Info</NavLink>
      </li>
      <li>
        <NavLink to="/userShelter/image">Images of Shelter</NavLink>
      </li>
      <li>
        <NavLink to="/userShelter/adoptionApplication">Adoption Applications of Shelter</NavLink>
      </li>
      <li>
        <NavLink to="/userShelter/adoptionContract">Adoption Contracts of Shelter</NavLink>
      </li>
      <li>
        <NavLink to="/userShelter/donation">Donations of Shelter</NavLink>
      </li>
      <li>
        <NavLink to="/userShelter/user/managedAdoptionContract">Managed Contracts</NavLink>
      </li>
      <li>
        <NavLink to="/userShelter/user/image">Uploaded Images</NavLink>
      </li>
    </ul>
  );
};

export default EmployeeNavlinks;
