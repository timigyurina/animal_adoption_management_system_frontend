import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

const AnimalBreedCard = ({ breed }) => {
  const auth = useContext(AuthContext);

  return (
    <Card sx={{padding:1, maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {breed.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {breed.description}
        </Typography>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          {breed.type}
        </Typography>
      </CardContent>
      {(auth.userRoles.includes("Administrator") ||
        auth.userRoles.includes("ShelterEmployee")) && (
        <CardActions>
          <Button size="small">Edit</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default AnimalBreedCard;
