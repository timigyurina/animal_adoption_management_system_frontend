import { Card, CardContent, Typography, Box } from "@mui/material";

const AdoptionContractCard = ({ adoptionContract, cardBoxStyles }) => {
  return (
    <Card sx={{ minWidth: "80%" }}>
      <CardContent>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Id
          </Typography>
          <Typography variant="body2">{adoptionContract.id}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Date
          </Typography>
          <Typography variant="body2">
            {adoptionContract.contractDate.substring(0, 10)}
          </Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Active ?
          </Typography>
          <Typography variant="body2">
            {adoptionContract.isActive ? "Active" : "Cancelled"}
          </Typography>
        </Box>
        {adoptionContract.notes && (
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Notes
            </Typography>
            <Typography
              variant="body2"
              sx={{ maxWidth: 300, textAlign: "end" }}
            >
              {adoptionContract.notes}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AdoptionContractCard;
