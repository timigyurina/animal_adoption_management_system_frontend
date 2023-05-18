import PetsIcon from "@mui/icons-material/Pets";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <PetsIcon className="fas fa-paw paw-1" />
      <PetsIcon className="fas fa-paw paw-2" />
      <PetsIcon className="fas fa-paw paw-3" />
    </div>
  );
};

export default Loader;
