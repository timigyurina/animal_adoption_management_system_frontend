import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Shared/Layout";
import Home from "./Components/Shared/Home.";
import ContactInfo from "./Components/Shared/ContactInfo";
import Login from "./Components/Shared/Login";
import Shelters from "./Components/Content/Shelters";
import AnimalBreeds from "./Components/Content/AnimalBreeds";
import Donations from "./Components/Content/Donations";
import Animals from "./Components/Content/Animals";
import Images from "./Components/Content/Images";
import AdoptionApplications from "./Components/Content/AdoptionApplications";
import Users from "./Components/Content/Users";
import AdoptionContracts from "./Components/Content/AdoptionContracts";
import MyProfile from "./Components/Content/user/MyProfile";
import ManagedAdoptionContracts from "./Components/Content/user/ManagedAdoptionContracts";
import ManagedShelter from "./Components/Content/user/ManagedShelter";
import { AuthContext } from "./Components/Authentication/AuthContext";
import {useAuthentication} from "./Components/Authentication/authenticationHook";
import "./App.css";

function App() {
  const { login, logout, isLoggedIn, userEmail, userRoles } = useAuthentication();

  let routes;
  if (userRoles.includes("Administrator")) {
    routes = (
      <>
        <Route path="/user" element={<Users />} />
        <Route path="/donation" element={<Donations />} />
        <Route path="/adoptionApplication" element={<AdoptionApplications />} />
        <Route path="/adoptionContract" element={<AdoptionContracts />} />

        <Route path="/user/profile" element={<MyProfile />} />
        <Route path="/user/donation" element={<Donations />} />
        <Route path="/user/adoptionApplication" element={<AdoptionApplications />} />
        <Route path="/user/adoptionContract" element={<AdoptionContracts />} />

        <Route path="/shelter" element={<Shelters />} />
        <Route path="/animalBreed" element={<AnimalBreeds />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </>
    );
  } else if (userRoles.includes("ShelterEmployee")) {
    routes = (
      <>
        <Route path="/userShelter" element={<ManagedShelter />} />
        <Route path="/userShelter/image" element={<Images />} />
        <Route path="/userShelter/donation" element={<Donations />} />
        <Route path="/userShelter/adoptionApplication" element={<AdoptionApplications />} />
        <Route path="/userShelter/adoptionContract" element={<AdoptionContracts />} />
        <Route path="/userShelter/user/managedAdoptionContract" element={<ManagedAdoptionContracts />} />
        <Route path="/userShelter/user/image" element={<Images />} />
        
        <Route path="/user/profile" element={<MyProfile />} />
        <Route path="/user/donation" element={<Donations />} />
        <Route path="/user/adoptionApplication" element={<AdoptionApplications />} />
        <Route path="/user/adoptionContract" element={<AdoptionContracts />} />

        <Route path="/shelter" element={<Shelters />} />
        <Route path="/animalBreed" element={<AnimalBreeds />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </>
    );
  } else if (userRoles.includes("Adopter")) {
    routes = (
      <>
        <Route path="/user/profile" element={<MyProfile />} />
        <Route path="/user/donation" element={<Donations />} />
        <Route path="/user/adoptionApplication" element={<AdoptionApplications />} />
        <Route path="/user/adoptionContract" element={<AdoptionContracts />} />
        
        <Route path="/shelter" element={<Shelters />} />
        <Route path="/animalBreed" element={<AnimalBreeds />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </>
    );
  } else if (!isLoggedIn) {
    routes = (
      <>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
    value={{
      isLoggedIn: isLoggedIn,
      userEmail: userEmail,
      userRoles: userRoles,
      login: login,
      logout: logout,
    }}
  >
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactInfo />} />
            <Route path="/image" element={<Images />} />
            <Route path="/animal" element={<Animals />} />
            {routes}

          </Route>
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
