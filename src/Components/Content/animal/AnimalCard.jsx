import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Card, CardContent, Box, Typography } from "@mui/material";
import AnimalDetailsModal from "./detailsAndUpdates/AnimalDetailsModal";
import ImageUploadModal from "../image/creation/ImageUploadModal";
import CreateAdoptionApplicationModal from "../adoptionApplication/creation/CreateAdoptionApplicationModal";
import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";

const cardBoxStyles = {
  minWidth: "250px",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1em",
};

// This component is used in both AnimalCards and ShelterAnimals

const AnimalCard = ({
  animal,
  onAnimalWasUpdated,
  imageUploadMode,
  updateMode,
}) => {
  const auth = useContext(AuthContext);
  const [imageHasBeenAdded, setImageHasBeenAdded] = useState(null);
  const [
    adoptionApplicationHasBeenCreated,
    setAdoptionApplicationHasBeenCreated,
  ] = useState(null);

  return (
    <Card key={animal.id}>
      <CardContent>
        <Typography variant="h5" textAlign="center" mb={1}>
          {animal.name}
        </Typography>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Status
          </Typography>
          <Typography variant="body2">{animal.status}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Breed
          </Typography>
          <Typography variant="body2">{animal.breed.name}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Birthday
          </Typography>
          <Typography variant="body2">
            {animal.birthDate.substring(0, 10)}
          </Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Gender
          </Typography>
          <Typography variant="body2">
            {animal.gender}
            {animal.isSterilised && ", sterilised"}
          </Typography>
        </Box>
        {animal.isSterilised && (
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1, ml: 2 }} color="text.secondary">
              Sterilisation date
            </Typography>
            <Typography variant="body2">
              {animal.sterilisationDate.substring(0, 10)}
            </Typography>
          </Box>
        )}

        {auth.isLoggedIn && (
          <Box
            mt={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnimalDetailsModal
              animalId={animal.id}
              onAnimalWasUpdated={onAnimalWasUpdated}
              adminMode={auth.userRoles.includes("Administrator") || updateMode}
            />
          </Box>
        )}

        {/* Admins can always access image uploading, employees can only do this if imageUploadMode is enabled */}
        {((imageUploadMode && auth.userRoles.includes("ShelterEmployee")) ||
          auth.userRoles.includes("Administrator")) && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageUploadModal
              animalId={animal.id}
              onImageWasUploaded={(image) =>
                setImageHasBeenAdded(
                  `New Image for ${image.animal.name} has been added`
                )
              }
            />
          </Box>
        )}

        {animal.status === "WaitingForAdoption" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CreateAdoptionApplicationModal
              animalId={animal.id}
              animalName={animal.name}
              onAdoptionApplicationWasCreated={(application) =>
                setAdoptionApplicationHasBeenCreated(
                  `Application for ${application.animal.name} has been created`
                )
              }
            />
          </Box>
        )}

        {adoptionApplicationHasBeenCreated && (
          <SnackbarWithMessage
            message={adoptionApplicationHasBeenCreated}
            severity="success"
            opened={adoptionApplicationHasBeenCreated !== null}
            closed={() => setAdoptionApplicationHasBeenCreated(false)}
          />
        )}

        {imageHasBeenAdded && (
          <SnackbarWithMessage
            message={imageHasBeenAdded}
            severity="success"
            opened={imageHasBeenAdded !== null}
            closed={() => setImageHasBeenAdded(false)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AnimalCard;
