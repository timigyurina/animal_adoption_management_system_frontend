import { Card, CardContent, Typography, Box } from "@mui/material";

// adminMode means that the component is used in AdoptionApplicationCards, where all applications are shown. Otherwise, it is used in MaAdoptionApps, where user can only see apps belonging to him/her

const AdoptionApplicationCard = ({
  adoptionApplication,
  cardBoxStyles,
  adminMode,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" textAlign="center" m={1}>
          Application Details
        </Typography>
        {adminMode && (
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Id
            </Typography>
            <Typography variant="body2">{adoptionApplication.id}</Typography>
          </Box>
        )}
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

        {adoptionApplication.animal && (
          <>
            <Typography variant="h6" textAlign="center" m={1}>
              Animal Details
            </Typography>
            <Box sx={cardBoxStyles}>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Name
              </Typography>
              <Typography variant="body2">
                {adoptionApplication.animal.name}
              </Typography>
            </Box>
            <Box sx={cardBoxStyles}>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Status
              </Typography>
              <Typography variant="body2">
                {adoptionApplication.animal.status}
              </Typography>
            </Box>
            <Box sx={cardBoxStyles}>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Breed
              </Typography>
              <Typography variant="body2">
                {adoptionApplication.animal.breed.name}
              </Typography>
            </Box>
            <Box sx={cardBoxStyles}>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Birthday
              </Typography>
              <Typography variant="body2">
                {adoptionApplication.animal.birthDate.substring(0, 10)}
              </Typography>
            </Box>
            <Box sx={cardBoxStyles}>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Gender
              </Typography>
              <Typography variant="body2">
                {adoptionApplication.animal.gender}
                {adoptionApplication.animal.isSterilised && ", sterilised"}
              </Typography>
            </Box>
            {adoptionApplication.animal.isSterilised && (
              <Box sx={cardBoxStyles}>
                <Typography sx={{ mb: 1, ml: 2 }} color="text.secondary">
                  Sterilisation date
                </Typography>
                <Typography variant="body2">
                  {adoptionApplication.animal.sterilisationDate.substring(
                    0,
                    10
                  )}
                </Typography>
              </Box>
            )}
          </>
        )}
        {adminMode && (
          <>
            <Typography variant="h6" textAlign="center" m={1}>
              Applier Details
            </Typography>
            <Box sx={cardBoxStyles}>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Name
              </Typography>
              <Typography variant="body2">
                {adoptionApplication.applier.firstName}{" "}
                {adoptionApplication.applier.lastName}
              </Typography>
            </Box>
            <Box sx={cardBoxStyles}>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Email
              </Typography>
              <Typography variant="body2">
                {adoptionApplication.applier.email}
              </Typography>
            </Box>
            {adoptionApplication.applier.phoneNumber && (
              <Box sx={cardBoxStyles}>
                <Typography sx={{ mb: 1 }} color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body2">
                  {adoptionApplication.applier.phoneNumber}
                </Typography>
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AdoptionApplicationCard;
