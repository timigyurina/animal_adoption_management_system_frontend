import { Typography, Box, Card, CardContent } from "@mui/material";

const AnimalBasicInfo = ({ animal, cardBoxStyles }) => {
  return (
    <Card sx={{ minWidth: "80%" }}>
      <CardContent>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Name
          </Typography>
          <Typography variant="body2">{animal.name}</Typography>
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
            Breed
          </Typography>
          <Typography variant="body2">{animal.breed.name}</Typography>
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
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Color
          </Typography>
          <Typography variant="body2">{animal.color}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Size
          </Typography>
          <Typography variant="body2">{animal.size}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Type
          </Typography>
          <Typography variant="body2">{animal.type}</Typography>
        </Box>
        {animal.notes && (
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Notes
            </Typography>
            <Typography variant="body2">{animal.notes}</Typography>
          </Box>
        )}
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Status
          </Typography>
          <Typography variant="body2">{animal.status}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnimalBasicInfo;
