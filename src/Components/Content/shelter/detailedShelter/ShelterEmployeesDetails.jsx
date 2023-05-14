import { Card, CardContent, Box, Typography } from "@mui/material";

const ShelterEmployeesDetails = ({ shelterEmployees, cardBoxStyles }) => {
  return shelterEmployees.map((s) => (
    <Card key={s.id} sx={{ minWidth: "80%" }}>
      <CardContent>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Name
          </Typography>
          <Typography variant="body2">
            {s.firstName} {s.lastName}
          </Typography>
        </Box>
        {s.isContactOfShelter && (
          <Typography
            sx={{
              mb: 1,
              textAlign: "center",
              fontSize: "0.8rem",
              fontWeight: "700",
              fontStyle: "italic",
            }}
            color="text.secondary"
          >
            Contact person of this Shelter
          </Typography>
        )}

        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Email
          </Typography>
          <Typography variant="body2">{s.userName}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Date of BIrth
          </Typography>
          <Typography variant="body2">
            {s.dateOfBirth.substring(0, 10)}
          </Typography>
        </Box>
        {s.phoneNumber && (
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Phone
            </Typography>
            <Typography variant="body2">{s.phoneNumber}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  ));
};

export default ShelterEmployeesDetails;
