import { useState } from "react";
import { useFetch } from "../../../../../hooks/useFetch";

import SnackbarWithMessage from "../../../../SharedElements/SnackbarWithMessage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography, Box, Button, CircularProgress } from "@mui/material";

const UpdateSterilisation = ({ animalId, onUpdate, onCancel }) => {
  const { sendRequest, loading, error, clearError } = useFetch();
  const [sterilisationDate, setSterilisationDate] = useState("");

  const updateSterilisation = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/animal/${animalId}/updateSterilisation`;

    try {
      const updatedAnimal = await sendRequest(
        true,
        url,
        "PUT",
        JSON.stringify({
          sterilisationDate: addOneDay(sterilisationDate),
        }),
        {
          "Content-type": "application/json",
        }
      );
      onUpdate("sterilisationDate", updatedAnimal.sterilisationDate);
    } catch (error) {}
  };

  const addOneDay = (date) => {
    return new Date(new Date(date).setDate(new Date(date).getDate() + 1));
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
      <Box
        sx={{
          mb: 2,
          minWidth: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography id="transition-modal-title" variant="h5" component="h2">
          Update sterilisation
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Sterilisation date"
              inputFormat="YYYY/MM/DD"
              value={sterilisationDate}
              onChange={(e) => setSterilisationDate(e)}
              slotProps={{ textField: { variant: "outlined" } }}
            />
          </LocalizationProvider>
        )}
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
            onClick={updateSterilisation}
            disabled={loading || sterilisationDate === ""}
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
    </>
  );
};

export default UpdateSterilisation;
