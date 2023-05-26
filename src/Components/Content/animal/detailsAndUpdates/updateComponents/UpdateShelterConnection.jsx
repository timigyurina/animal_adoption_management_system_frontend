import { useState } from "react";
import { useFetch } from "../../../../../hooks/useFetch";
import SnackbarWithMessage from "../../../../SharedElements/SnackbarWithMessage";
import ShelterSelect from "../../../../SharedElements/ShelterSelect";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography, Box, Button, CircularProgress } from "@mui/material";

const UpdateShelterConnection = ({ animalId, onUpdate, onCancel, boxStyles }) => {
  const { sendRequest, loading, error, clearError } = useFetch();
  const [connectionToCreate, setConnectionToCreate] = useState({
    enrollmentDate: null,
    shelterId: "",
  });

  const createAnimalShelterConnection = async () => {
    let createdConnection;
    const adjustedConnectionToCreate = {
      shelterId:
        connectionToCreate.shelterId === "" ? -1 : connectionToCreate.shelterId,
      enrollmentDate: addOneDay(connectionToCreate.enrollmentDate),
    };
    console.log(connectionToCreate);
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/animal/${animalId}/addShelterConnection`;
      createdConnection = await sendRequest(
        true,
        url,
        "POST",
        JSON.stringify(adjustedConnectionToCreate),
        {
          "Content-type": "application/json",
        }
      );
    } catch (error) {}

    onUpdate(createdConnection)
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
          Update Shelter connection
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              minWidth: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 1,
              mt: 3,
              p: 1,
              border: "solid 2px",
              borderColor: "ternary.main",
              borderRadius: "16px",
            }}
          >
            <Box sx={boxStyles}>
              <Typography sx={{ ml: 2 }} color="text.secondary">
                Date of enrollment
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Enrollment date"
                  inputFormat="YYYY/MM/DD"
                  defaultValue={dayjs("2020-01-01")}
                  value={connectionToCreate.enrollmentDate}
                  onChange={(newValue) =>
                    setConnectionToCreate({
                      ...connectionToCreate,
                      enrollmentDate: newValue,
                    })
                  }
                  slotProps={{
                    textField: { variant: "outlined", size: "small" },
                  }}
                  sx={{ maxWidth: "200px" }}
                />
              </LocalizationProvider>
            </Box>


    
              <Box sx={boxStyles}>
                <Typography sx={{ ml: 2 }} color="text.secondary">
                  Shelter
                </Typography>
                <ShelterSelect
                  value={connectionToCreate.shelterId}
                  onChange={(e) =>
                    setConnectionToCreate({
                      ...connectionToCreate,
                      shelterId: e.target.value,
                    })
                  }
                  small
                />
              </Box>
    
          </Box>
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
            onClick={createAnimalShelterConnection}
            disabled={
              loading ||
              connectionToCreate.enrollmentDate === null ||
              connectionToCreate.shelterId === ""
            }
          >
            CReate
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

export default UpdateShelterConnection;
