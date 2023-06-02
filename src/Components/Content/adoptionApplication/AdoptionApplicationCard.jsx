import { Card, CardContent, Typography, Box } from "@mui/material";

const AdoptionApplicationCard = ({ adoptionApplication, cardBoxStyles }) => {
  return (
    <Card sx={{ minWidth: "80%" }}>
      <CardContent>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Id
          </Typography>
          <Typography variant="body2">{adoptionApplication.id}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Date
          </Typography>
          <Typography variant="body2">
            {adoptionApplication.applicationDate.substring(0, 10)}
          </Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Status
          </Typography>
          <Typography variant="body2">{adoptionApplication.status}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdoptionApplicationCard;
