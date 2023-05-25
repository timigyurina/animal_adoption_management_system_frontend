import { useState } from "react";
import AnimalBreedCard from "../../animalBreed/AnimalBreedCard";
import ImageCards from "../../image/ImageCards";
import UpdateBasicInfo from "./updateComponents/UpdateBasicInfo.jsx";
import UpdateStatus from "./updateComponents/UpdateStatus.jsx";
import UpdateSterilisation from "./updateComponents/UpdateSterilisation.jsx";
import UpdateShelterConnection from "./updateComponents/UpdateShelterConnection.jsx";
import AnimalShelter from "./detailComponents/AnimalShelter";
import AnimalBasicInfo from"./detailComponents/AnimalBasicInfo"
import AdoptionApplicationCard from "../../adoptionApplication/AdoptionApplicationCard";
import AdoptionContractCard from "../../adoptionContract/AdoptionContractCard";

import { Typography, Box, Button } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const cardBoxStyles = {
  minWidth: "90%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
};

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  mt: 1,
};

const AnimalDetailsAndUpdates = ({
  animal,
  onAnimalWasUpdated,
  onMultiUpdate,
  adminMode,
}) => {
  const [breedDetailsAreOpen, setBreedDetailsAreOpen] = useState(false);
  const [animalShelterDetailsAreOpen, setAnimalShelterDetailsAreOpen] =
    useState(false);
  const [
    adoptionApplicationDetailsAreOpen,
    setAdoptionApplicationDetailsAreOpen,
  ] = useState(false);
  const [adoptionContractDetailsAreOpen, setAdoptionContractDetailsAreOpen] =
    useState(false);
  const [imageDetailsAreOpen, setImageDetailsAreOpen] = useState(false);

  const [updateBasicInfoIsOpen, setUpdateBasicInfoIsOpen] = useState(false);
  const [updateStatusIsOpen, setUpdateStatusIsOpen] = useState(false);
  const [updateSterilisationIsOpen, setUpdateSterilisationIsOpen] =
    useState(false);
  const [updateShelterConnectionIsOpen, setUpdateShelterConnectionIsOpen] =
    useState(false);

  return (
    <Box
      sx={{
        minWidth: 500,
        m: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h4" component="h4">
        {animal.name}
      </Typography>

      {/* Basic info and updating */}
      <Typography variant="h5" component="h5">
        Basic info
        {adminMode && (
          <Button
            sx={{ marginLeft: 2 }}
            variant="outlined"
            color="ternary"
            onClick={() => setUpdateBasicInfoIsOpen(!updateBasicInfoIsOpen)}
          >
            {updateBasicInfoIsOpen ? "Close editing" : "Edit"}
          </Button>
        )}
      </Typography>
      {adminMode && updateBasicInfoIsOpen ? (
        <UpdateBasicInfo
          animal={animal}
          onUpdate={onMultiUpdate}
          onCancel={() => setUpdateBasicInfoIsOpen(false)}
          cardBoxStyles={cardBoxStyles}
        />
      ) : (
        <AnimalBasicInfo animal={animal} cardBoxStyles={cardBoxStyles}/>
      )}
      {/* Updating status */}
      {adminMode && (
        <Button
          sx={{ marginLeft: 2 }}
          variant="outlined"
          color="ternary"
          onClick={() => setUpdateStatusIsOpen(!updateStatusIsOpen)}
        >
          {updateStatusIsOpen ? "Close" : "Update status"}
        </Button>
      )}
      {adminMode && updateStatusIsOpen && (
        <UpdateStatus
          animalId={animal.id}
          onUpdate={onAnimalWasUpdated}
          onCancel={() => setUpdateStatusIsOpen(false)}
        />
      )}
      {/* Updating sterilisation */}
      {adminMode && (
        <Button
          sx={{ marginLeft: 2 }}
          variant="outlined"
          color="ternary"
          onClick={() =>
            setUpdateSterilisationIsOpen(!updateSterilisationIsOpen)
          }
        >
          {updateSterilisationIsOpen ? "Close" : "Update sterilisation"}
        </Button>
      )}
      {adminMode && updateSterilisationIsOpen && (
        <UpdateSterilisation
          animalId={animal.id}
          onUpdate={onAnimalWasUpdated}
          onCancel={() => setUpdateSterilisationIsOpen(false)}
        />
      )}

      {/* Breed info */}
      <Box
        sx={
          (centerStyle,
          {
            width: "80%",
          })
        }
      >
        <Box sx={centerStyle}>
          <Typography variant="h5" component="h5">
            Breed details
          </Typography>
          <Button onClick={() => setBreedDetailsAreOpen(!breedDetailsAreOpen)}>
            {breedDetailsAreOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
        </Box>
        {breedDetailsAreOpen && <AnimalBreedCard breed={animal.breed} />}
      </Box>

      {/* Shelter info and updating */}
      <Box sx={centerStyle}>
        <Typography variant="h5" component="h5">
          Shelter details
        </Typography>
        <Button
          onClick={() =>
            setAnimalShelterDetailsAreOpen(!animalShelterDetailsAreOpen)
          }
        >
          {animalShelterDetailsAreOpen ? (
            <ArrowDropUpIcon />
          ) : (
            <ArrowDropDownIcon />
          )}
        </Button>
      </Box>
      {animalShelterDetailsAreOpen && (
        <>
          {adminMode ? (
            <>
              <Button
                sx={{ marginLeft: 2 }}
                variant="outlined"
                color="ternary"
                onClick={() =>
                  setUpdateShelterConnectionIsOpen(
                    !updateShelterConnectionIsOpen
                  )
                }
              >
                {updateShelterConnectionIsOpen ? "Close editing" : "Edit"}
              </Button>
              {updateShelterConnectionIsOpen ? (
                <UpdateShelterConnection />
              ) : (
                animal.animalShelters.map((as) => (
                  <AnimalShelter
                    key={as.id}
                    shelter={as.shelter}
                    enrollmentDate={as.enrollmentDate}
                    exitDate={as.exitDate}
                  />
                ))
              )}
            </>
          ) : (
            <AnimalShelter
              shelter={animal.latestShelter}
              enrollmentDate={animal.enrollmentDate}
              exitDate={animal.exitDate}
            />
          )}
        </>
      )}

      {adminMode && animal.adoptionApplications.length > 0 && (
        <>
          <Box sx={centerStyle}>
            <Typography variant="h5" component="h5">
              Applications' details
            </Typography>
            <Button
              onClick={() =>
                setAdoptionApplicationDetailsAreOpen(
                  !adoptionApplicationDetailsAreOpen
                )
              }
            >
              {adoptionApplicationDetailsAreOpen ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}
            </Button>
          </Box>
          {adoptionApplicationDetailsAreOpen &&
            animal.adoptionApplications.map((aa) => (
              <AdoptionApplicationCard
                key={aa.id}
                adoptionApplication={aa}
                cardBoxStyles={cardBoxStyles}
              />
            ))}
        </>
      )}

      {adminMode && animal.adoptionContracts.length > 0 && (
        <>
          <Box sx={centerStyle}>
            <Typography variant="h5" component="h5">
              Contracts' details
            </Typography>
            <Button
              onClick={() =>
                setAdoptionContractDetailsAreOpen(
                  !adoptionContractDetailsAreOpen
                )
              }
            >
              {adoptionContractDetailsAreOpen ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}
            </Button>
          </Box>
          {adoptionContractDetailsAreOpen &&
            animal.adoptionContracts.map((ac) => (
              <AdoptionContractCard
              key={ac.id}
                adoptionContract={ac}
                cardBoxStyles={cardBoxStyles}
              />
            ))}
        </>
      )}

      {animal.images.length > 0 && (
        <>
          <Box sx={centerStyle}>
            <Typography variant="h5" component="h5">
              Images
            </Typography>
            <Button
              onClick={() => setImageDetailsAreOpen(!imageDetailsAreOpen)}
            >
              {imageDetailsAreOpen ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}
            </Button>
          </Box>
          {imageDetailsAreOpen && (
            <ImageCards
              images={animal.images}
              // cardBoxStyles={cardBoxStyles}
            />
          )}
        </>
      )}
    </Box>
  );
};


export default AnimalDetailsAndUpdates;
