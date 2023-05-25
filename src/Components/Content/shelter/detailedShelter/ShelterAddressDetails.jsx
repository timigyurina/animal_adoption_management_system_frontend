import { Card, CardContent, Box, Typography } from "@mui/material";

const ShelterAddressDetails = ({ shelterAddress, cardBoxStyles }) => {
  return (
    <Card sx={{ minWidth: "80%" }}>
      <CardContent>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Country
          </Typography>
          <Typography variant="body2">{shelterAddress.country}</Typography>
        </Box>
        {shelterAddress.region && (
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Region
            </Typography>
            <Typography variant="body2">{shelterAddress.region}</Typography>
          </Box>
        )}
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            City
          </Typography>
          <Typography variant="body2">{shelterAddress.city}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Location
          </Typography>
          <Typography variant="body2">
            {`${shelterAddress.addressLineOne} ${shelterAddress.addressLineTwo}`}
          </Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Postal code
          </Typography>
          <Typography variant="body2">
            {shelterAddress.postalCode}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShelterAddressDetails;
