import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Home from "./Components/Content/shared/Home";
import Layout from "./Components/SharedElements/Layout";
import ContactInfo from "./Components/Content/shared/ContactInfo";
import Register from "./Components/Content/shared/Register";
import Login from "./Components/Content/shared/Login";
import Shelters from "./Components/Content/shelter/Shelters";
import AnimalBreeds from "./Components/Content/animalBreed/AnimalBreeds";
import Donations from "./Components/Content/donation/Donations";
import Animals from "./Components/Content/animal/Animals";
import Images from "./Components/Content/image/Images";
import AdoptionApplications from "./Components/Content/adoptionApplication/AdoptionApplications";
import Users from "./Components/Content/user/Users";
import AdoptionContracts from "./Components/Content/adoptionContract/AdoptionContracts";
import MyProfile from "./Components/Content/user/personalData/MyProfile";
import MyDonations from "./Components/Content/user/personalData/MyDonations";
import MyAdoptionApplications from "./Components/Content/user/personalData/MyAdoptionApplications";
import MyAdoptionContracts from "./Components/Content/user/personalData/MyAdoptionContracts";
import ManagedAdoptionContracts from "./Components/Content/user/employeeData/ManagedAdoptionContracts";
import UploadedImages from "./Components/Content/user/employeeData/UploadedImages";
import ManagedShelter from "./Components/Content/user/employeeData/ManagedShelter";
import ShelterAnimals from "./Components/Content/shelter/shelterRelatedEntities/ShelterAnimals";
import ShelterDonations from "./Components/Content/shelter/shelterRelatedEntities/ShelterDonations";
import "./App.css";

function App() {
  const auth = useContext(AuthContext);

  let routes;
  if (auth.userRoles.includes("Administrator")) {
    routes = (
      <>
        <Route path="/user" element={<Users />} />
        <Route path="/donation" element={<Donations />} />
        <Route path="/adoptionApplication" element={<AdoptionApplications />} />
        <Route path="/adoptionContract" element={<AdoptionContracts />} />

        <Route path="/user/profile" element={<MyProfile />} />
        <Route path="/user/donation" element={<MyDonations />} />
        <Route
          path="/user/adoptionApplication"
          element={<MyAdoptionApplications />}
        />
        <Route
          path="/user/adoptionContract"
          element={<MyAdoptionContracts />}
        />

        <Route path="/animal" element={<Animals />} />
        <Route path="/shelter" element={<Shelters />} />
        <Route path="/animalBreed" element={<AnimalBreeds />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </>
    );
  } else if (auth.userRoles.includes("ShelterEmployee")) {
    routes = (
      <>
        <Route path="/userShelter" element={<ManagedShelter />} />
        <Route path="/userShelter/animal" element={<ShelterAnimals />} />
        <Route path="/userShelter/donation" element={<ShelterDonations />} />
        <Route
          path="/userShelter/user/managedAdoptionContract"
          element={<ManagedAdoptionContracts />}
        />
        <Route path="/userShelter/user/image" element={<UploadedImages />} />

        <Route path="/user/profile" element={<MyProfile />} />
        <Route path="/user/donation" element={<MyDonations />} />
        <Route
          path="/user/adoptionApplication"
          element={<MyAdoptionApplications />}
        />
        <Route
          path="/user/adoptionContract"
          element={<MyAdoptionContracts />}
        />

        <Route path="/animal" element={<Animals />} />
        <Route path="/shelter" element={<Shelters />} />
        <Route path="/animalBreed" element={<AnimalBreeds />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </>
    );
  } else if (auth.userRoles.includes("Adopter")) {
    routes = (
      <>
        <Route path="/user/profile" element={<MyProfile />} />
        <Route path="/user/donation" element={<MyDonations />} />
        <Route
          path="/user/adoptionApplication"
          element={<MyAdoptionApplications />}
        />
        <Route
          path="/user/adoptionContract"
          element={<MyAdoptionContracts />}
        />

        <Route path="/animal" element={<Animals />} />
        <Route path="/shelter" element={<Shelters />} />
        <Route path="/animalBreed" element={<AnimalBreeds />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </>
    );
  } else if (!auth.isLoggedIn) {
    routes = (
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="/image" element={<Images />} />
          {routes}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
