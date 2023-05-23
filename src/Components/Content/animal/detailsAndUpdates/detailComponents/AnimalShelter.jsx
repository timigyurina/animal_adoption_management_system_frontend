import { Typography, Box, Card, CardContent } from "@mui/material";

const cardBoxStyles = {
  minWidth: "90%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1em",
};

const AnimalShelter = ({ shelter, enrollmentDate, exitDate }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1em",
        width: "100%",
      }}
    >
      <Card sx={{ minWidth: "80%" }}>
        <CardContent>
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Date of enrollment
            </Typography>
            <Typography variant="body2">{enrollmentDate.substring(0,10)}</Typography>
          </Box>
          {exitDate && (
            <Box sx={cardBoxStyles}>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Date of exit
              </Typography>
              <Typography variant="body2">{exitDate.substring(0,10)}</Typography>
            </Box>
          )}
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Name
            </Typography>
            <Typography variant="body2">{shelter.name}</Typography>
          </Box>
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Email
            </Typography>
            <Typography variant="body2">
              {shelter.email}
            </Typography>
          </Box>
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Phone
            </Typography>
            <Typography variant="body2">
              {shelter.phone}
            </Typography>
          </Box>
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} variant="caption" color="text.secondary">
              Country
            </Typography>
            <Typography variant="caption">
              {shelter.address.country}
            </Typography>
          </Box>
          {shelter.address.region && (
            <Box sx={cardBoxStyles}>
              <Typography
                sx={{ mb: 1 }}
                variant="caption"
                color="text.secondary"
              >
                Region
              </Typography>
              <Typography variant="caption">
                {shelter.address.region}
              </Typography>
            </Box>
          )}
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} variant="caption" color="text.secondary">
              City
            </Typography>
            <Typography variant="caption">
              {shelter.address.city}
            </Typography>
          </Box>
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} variant="caption" color="text.secondary">
              Location
            </Typography>
            <Typography variant="caption">
              {`${shelter.address.addressLineOne} ${shelter.address.addressLineTwo}`}
            </Typography>
          </Box>
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} variant="caption" color="text.secondary">
              Postal code
            </Typography>
            <Typography variant="caption">
              {shelter.address.postalCode}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnimalShelter;
