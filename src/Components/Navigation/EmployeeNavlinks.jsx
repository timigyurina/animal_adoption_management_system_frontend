import { NavLink } from "react-router-dom";

const EmployeeNavlinks = () => {
  return (
    <ul className={"nav-mobile"}>
      <li>
        <NavLink to="/user/shelter">Managed Shelter</NavLink>
      </li>
      <li>
        <NavLink to="/user/images">Uploaded Images</NavLink>
      </li>
      <li>
        <NavLink to="/user/managedAdoptionContracts">Managed Contracts</NavLink>
      </li>
    </ul>
  );
};

export default EmployeeNavlinks;
