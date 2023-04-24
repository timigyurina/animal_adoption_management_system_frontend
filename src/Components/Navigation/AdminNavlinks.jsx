import { NavLink } from "react-router-dom";

const AdminNavlinks = () => {
    return (
      <ul className={"nav-mobile"}>
        <li>
          <NavLink to="/user">Users</NavLink>
        </li>
        <li>
          <NavLink to="/donation">Donations</NavLink>
        </li>
        <li>
          <NavLink to="/image">Images</NavLink>
        </li>
        <li>
          <NavLink to="/adoptionApplication">Adoption Applications</NavLink>
        </li>
        <li>
          <NavLink to="/adoptionContract">Adoption Contarcts</NavLink>
        </li>
      </ul>
    );
  };

export default AdminNavlinks