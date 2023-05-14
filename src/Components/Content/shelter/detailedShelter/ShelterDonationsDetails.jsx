import { Card, CardContent, Box, Typography } from "@mui/material";

const ShelterDonationsDetails = ({ shelterDonations, cardBoxStyles }) => {
  return shelterDonations.map((s) => (
    <Card key={s.id} sx={{ minWidth: "80%" }}>
      <CardContent>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Date
          </Typography>
          <Typography variant="body2">{s.date.substring(0, 10)}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Amount
          </Typography>
          <Typography variant="body2">{s.amount}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Status
          </Typography>
          <Typography variant="body2">{s.status}</Typography>
        </Box>
      </CardContent>
    </Card>
  ));
};

export default ShelterDonationsDetails