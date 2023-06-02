import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";
import LoadingSpinner from "../../SharedElements/LoadingSpinner";

import {
  TextField,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
} from "@mui/material";

const cardBoxStyles = {
  minWidth: "90%",
  height: "fit-content",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.5rem",
  p: 0.5,
};

const UpdateShelterContactInfoForm = ({ shelter, onUpdate, onCancel }) => {
  const { sendRequest, loading, error, clearError } = useFetch();
  const [updateSuccess, setUpdateSuccess] = useState(null);

  const [newValues, setNewValues] = useState({
    name: shelter.name,
    phone: shelter.phone,
    email: shelter.email,
    address: {
      country: shelter.address.country,
      postalCode: shelter.address.postalCode,
      region: shelter.address.region,
      city: shelter.address.city,
      addressLineOne: shelter.address.addressLineOne,
      addressLineTwo: shelter.address.addressLineTwo,
    },
  });

  const updateShelter = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/shelter/${shelter.id}/updateShelterContactInfo`;
    try {
      const updatedShelter = await sendRequest(
        true,
        url,
        "PUT",
        JSON.stringify(newValues),
        {
          "Content-type": "application/json",
        }
      );
      setUpdateSuccess("Shelter info has been sccessfully updated");
      onUpdate(updatedShelter);
    } catch (error) {}
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setNewValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddressValueChange = (e) => {
    const { name, value } = e.target;
    setNewValues((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  return (
    <>
      {error && (
        <SnackbarWithMessage
          message={error}
          severity="error"
          opened={error !== null}
          closed={clearError}
        />
      )}
      {updateSuccess && (
        <SnackbarWithMessage
          message={updateSuccess}
          severity="success"
          opened={updateSuccess !== null}
          closed={() => setUpdateSuccess(null)}
        />
      )}
      <Box
        sx={{
          minWidth: 500,
          m: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h6" component="h6">
          Update contact info
        </Typography>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Card sx={{ minWidth: "80%" }}>
            <CardContent>
              <Box sx={cardBoxStyles}>
                <Typography color="text.secondary">Name</Typography>
                <TextField
                  name="name"
                  size="small"
                  value={newValues.name}
                  onChange={handleValueChange}
                  sx={{ maxWidth: "200px" }}
                />
              </Box>

              <Box sx={cardBoxStyles}>
                <Typography color="text.secondary">Email</Typography>
                <TextField
                  name="email"
                  size="small"
                  value={newValues.email}
                  onChange={handleValueChange}
                  sx={{ maxWidth: "200px" }}
                />
              </Box>

              <Box sx={cardBoxStyles}>
                <Typography color="text.secondary">Phone</Typography>
                <TextField
                  name="phone"
                  size="small"
                  value={newValues.phone}
                  onChange={handleValueChange}
                  sx={{ maxWidth: "200px" }}
                />
              </Box>

              <Box sx={cardBoxStyles}>
                <Typography color="text.secondary">Country</Typography>
                <TextField
                  name="country"
                  size="small"
                  value={newValues.address.country}
                  onChange={handleAddressValueChange}
                  sx={{ maxWidth: "200px" }}
                />
              </Box>

              <Box sx={cardBoxStyles}>
                <Typography color="text.secondary">Postal Code</Typography>
                <TextField
                  name="postalCode"
                  size="small"
                  value={newValues.address.postalCode}
                  onChange={handleAddressValueChange}
                  sx={{ maxWidth: "200px" }}
                />
              </Box>

              <Box sx={cardBoxStyles}>
                <Typography color="text.secondary">Region</Typography>
                <TextField
                  name="region"
                  size="small"
                  value={newValues.address.region}
                  onChange={handleAddressValueChange}
                  sx={{ maxWidth: "200px" }}
                />
              </Box>

              <Box sx={cardBoxStyles}>
                <Typography color="text.secondary">City</Typography>
                <TextField
                  name="city"
                  size="small"
                  value={newValues.address.city}
                  onChange={handleAddressValueChange}
                  sx={{ maxWidth: "200px" }}
                />
              </Box>

              <Box sx={cardBoxStyles}>
                <Typography color="text.secondary">Address Line 1</Typography>
                <TextField
                  name="addressLineOne"
                  size="small"
                  value={newValues.address.addressLineOne}
                  onChange={handleAddressValueChange}
                  sx={{ maxWidth: "200px" }}
                />
              </Box>

              <Box sx={cardBoxStyles}>
                <Typography color="text.secondary">Address Line 2</Typography>
                <TextField
                  name="addressLineTwo"
                  size="small"
                  value={newValues.address.addressLineTwo}
                  onChange={handleAddressValueChange}
                  sx={{ maxWidth: "200px" }}
                />
              </Box>
            </CardContent>
          </Card>
        )}

        <Box
          sx={{
            mt: 2,
            minWidth: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.2rem",
          }}
        >
          <Box
            sx={{
              minWidth: 200,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={updateShelter}
              disabled={loading}
            >
              Update
            </Button>
            <Button
              onClick={onCancel}
              variant="contained"
              color="secondary"
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdateShelterContactInfoForm;
