import { Card, CardContent, Box, Typography } from "@mui/material";

const ShelterAnimalsDetails = ({ shelterAnimals, cardBoxStyles }) => {
  return shelterAnimals.map((s) => (
    <Card key={s.id} sx={{ minWidth: "80%" }}>
      <CardContent>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Name
          </Typography>
          <Typography variant="body2">{s.animal.name}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Color
          </Typography>
          <Typography variant="body2">{s.animal.color}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Gender
          </Typography>
          <Typography variant="body2">{s.animal.gender}{s.animal.isSterilised && ", sterilised"}</Typography>
        </Box>
        {s.animal.isSterilised && (
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1, ml: 2 }} color="text.secondary">
              Sterilisation date
            </Typography>
            <Typography variant="body2">
              {s.animal.sterilisationDate.substring(0, 10)}
            </Typography>
          </Box>
        )}
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Size
          </Typography>
          <Typography variant="body2">{s.animal.size}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Birthday
          </Typography>
          <Typography variant="body2">{s.animal.birthDate.substring(0, 10)}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Type
          </Typography>
          <Typography variant="body2">{s.animal.type}</Typography>
        </Box>
        {s.animal.notes && (
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Notes
            </Typography>
            <Typography variant="body2">{s.animal.notes}</Typography>
          </Box>
        )}

        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Enrollment date
          </Typography>
          <Typography variant="body2">{s.enrollmentDate.substring(0, 10)}</Typography>
        </Box>
        {s.exitDate && (
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Exit date
            </Typography>
            <Typography variant="body2">{s.exitDate.substring(0, 10)}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  ));
};

export default ShelterAnimalsDetails;
