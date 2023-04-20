import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./Components/Layout";
import Home from "./Components/Home.";
import Login from "./Components/Login";
import Shelters from "./Components/Content/Shelters";
import AnimalBreeds from "./Components/Content/AnimalBreeds";
import Donations from "./Components/Content/Donations";
import Animals from "./Components/Content/Animals";
import Images from "./Components/Content/Images";
import AdoptionApplications from "./Components/Content/AdoptionApplications";
import Users from "./Components/Content/Users";
import AdoptionContracts from "./Components/Content/AdoptionContracts";
import MyProfile from "./Components/Content/user/MyProfile";
import "./App.css";

function App() {
  const roles = ["Administrator"];
  const isLoggedIn = true;
  let routes;
  if (roles.includes("Administrator")) {
    routes = (
      <>
        <Route path="/user" element={<Users />} />
        <Route path="/donation" element={<Donations />} />
        <Route path="/adoptionApplication" element={<AdoptionApplications />} />
        <Route path="/adoptionContract" element={<AdoptionContracts />} />
        <Route path="/shelter" element={<Shelters />} />
        <Route path="/animalBreed" element={<AnimalBreeds />} />
        <Route path="/profile" element={<MyProfile />} />
      </>
    );
  } else if (roles.includes("ShelterEmployee")) {
    routes = (
      <>
        <Route path="/donation" element={<Donations />} />
        <Route path="/adoptionApplication" element={<AdoptionApplications />} />
        <Route path="/adoptionContract" element={<AdoptionContracts />} />
        <Route path="/shelter" element={<Shelters />} />
        <Route path="/animalBreed" element={<AnimalBreeds />} />
        <Route path="/profile" element={<MyProfile />} />
      </>
    );
  } else if (roles.includes("Adopter")) {
    routes = (
      <>
        <Route path="/shelter" element={<Shelters />} />
        <Route path="/animalBreed" element={<AnimalBreeds />} />
        <Route path="/profile" element={<MyProfile />} />
      </>
    );
  } else if (!isLoggedIn) {
    routes = (
      <>
        <Route path="/login" element={<Login />} />
      </>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/image" element={<Images />} />
          <Route path="/animal" element={<Animals />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          {routes}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
