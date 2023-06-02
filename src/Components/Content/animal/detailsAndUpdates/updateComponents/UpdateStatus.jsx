import { useState, useContext } from "react";
import { useFetch } from "../../../../../hooks/useFetch";
import { EnumContext } from "../../../../../context/EnumContext";
import SnackbarWithMessage from "../../../../SharedElements/SnackbarWithMessage";
import {
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Typography,
  Select,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";

const UpdateStatus = ({ animalId, onUpdate, onCancel }) => {
  const { sendRequest, loading, error, clearError } = useFetch();
  const choosableStatuses = useContext(EnumContext).enums.animalStatus;
  const [newStatus, setNewStatus] = useState("");

  const updateAnimalStatus = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/animal/${animalId}/updateStatus`;
    try {
      const updatedAnimal = await sendRequest(true, url, "PUT", newStatus, {
        "Content-type": "application/json",
      });
      onUpdate("status", updatedAnimal.status);
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
      <Box
        sx={{
          mb: 2,
          minWidth: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.2rem",
        }}
      >
        <Typography id="transition-modal-title" variant="h5" component="h2">
          Set New status
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : Object.entries(choosableStatuses).length > 0 ? (
          <FormControl
            sx={{
              m: 1,
              minWidth: 200,
            }}
          >
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              error={newStatus === ""}
            >
              <MenuItem value={""}>Select a new status</MenuItem>
              {Object.entries(choosableStatuses).map(([name, value]) => (
                <MenuItem value={value} key={value}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {newStatus === "" && (
              <FormHelperText error>Please select a status</FormHelperText>
            )}
          </FormControl>
        ) : (
          "No Status to choose from"
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
            onClick={updateAnimalStatus}
            disabled={loading || newStatus === ""}
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

export default UpdateStatus;
