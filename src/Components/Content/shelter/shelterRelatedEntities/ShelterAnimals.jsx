import { useState, useEffect } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import AnimalCard from "../../animal/AnimalCard";
import Loader from "../../../SharedElements/Loader";
import { Box } from "@mui/material";
import SnackbarWithMessage from "../../../SharedElements/SnackbarWithMessage";

const ShelterAnimals = () => {
  const { loading, error, clearError, sendRequest } = useFetch();
  const [animalShelterConnections, setAnimalShelterConnections] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/shelter/animal`;
    const getAnimalsOfShelter = async () => {
      try {
        const responseData = await sendRequest(true, url);
        setAnimalShelterConnections(responseData);
        return;
      } catch (err) {}
    };
    getAnimalsOfShelter();
  }, [sendRequest]);

  const refreshAnimal = async (animalId) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/animal/${animalId}`;
      const refreshedAnimal = await sendRequest(true, url);
      const newAnimals = animalShelterConnections.map((animalShelter) => {
        if (animalShelter.animal.id === animalId) {
          return { ...animalShelter, animal: refreshedAnimal };
        } else {
          return animalShelter;
        }
      });
      setAnimalShelterConnections(newAnimals);
      return;
    } catch (err) {}
  };

  return (
    <>
      {error && (
        <SnackbarWithMessage
          message={error}
          severity="error"
          opened={error !== null}
          closed={clearError}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "1em",
            minWidth: 500,
            m: 2,
            p: 1,
          }}
        >
          {animalShelterConnections.map((animalShelter) => (
            <AnimalCard
              key={animalShelter.id}
              animal={animalShelter.animal}
              onAnimalWasUpdated={refreshAnimal}
              imageUploadMode
              updateMode
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default ShelterAnimals;
