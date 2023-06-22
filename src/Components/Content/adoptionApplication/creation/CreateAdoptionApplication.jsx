import { useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";

import { Button, Box, Typography } from "@mui/material";
import SnackbarWithMessage from "../../../SharedElements/SnackbarWithMessage";
import LoadingSpinner from "../../../SharedElements/LoadingSpinner";

const CreateAdoptionApplication = ({
  animalId,
  animalName,
  onCreate,
  onCancel,
}) => {
  const { sendRequest, loading, error, clearError } = useFetch();
  const [createSuccess, setCreateSuccess] = useState(null);

  const createAdoptionApplication = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/adoptionApplication`;
      const applicationCreated = await sendRequest(
        true,
        url,
        "POST",
        JSON.stringify({ animalId: animalId }),
        {
          "Content-type": "application/json",
        }
      );
        onCreate(applicationCreated);
        setCreateSuccess(
          `You have successfully requested the adoption of ${animalName}`
        );
    } catch (error) {}
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
      {createSuccess && (
        <SnackbarWithMessage
          message={createSuccess}
          severity="success"
          opened={createSuccess !== null}
          closed={() => setCreateSuccess(null)}
        />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Typography variant="h5" textAlign="center">
            Are you sure you want to request the adoption of {animalName}?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              onClick={createAdoptionApplication}
              color="primary"
              variant="contained"
            >
              Adopt Animal
            </Button>
            <Button onClick={onCancel} color="ternary" variant="outlined">
              Cancel
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default CreateAdoptionApplication;
