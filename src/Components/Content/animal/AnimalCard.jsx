import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import AnimalDetailsModal from "./detailsAndUpdates/AnimalDetailsModal";

const cardBoxStyles = {
  minWidth: "250px",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1em",
};

const AnimalCard = ({ animal, onAnimalWasUpdated }) => {
  const auth = useContext(AuthContext);
  return (
    <Card key={animal.id}>
      <CardContent>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Name
          </Typography>
          <Typography variant="body2">{animal.name}</Typography>
        </Box>
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

        {auth.userRoles.includes("Administrator") && (
          <Box
            mt={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnimalDetailsModal animalId={animal.id} onAnimalWasUpdated={onAnimalWasUpdated} adminMode/>
          </Box>
        )}
        {(auth.userRoles.includes("ShelterEmployee") || auth.userRoles.includes("Adopter")) && (
          <Box
            mt={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnimalDetailsModal animalId={animal.id} onAnimalWasUpdated={onAnimalWasUpdated}/>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AnimalCard;
