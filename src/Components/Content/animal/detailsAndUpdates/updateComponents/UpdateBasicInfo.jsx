import { useState, useContext } from "react";
import { useFetch } from "../../../../../hooks/useFetch";
import { EnumContext } from "../../../../../context/EnumContext";

import SnackbarWithMessage from "../../../../SharedElements/SnackbarWithMessage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  TextField,
  Typography,
  Box,
  Button,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import SelectValues from "../../../../SharedElements/SelectValues";
import BreedSelect from "../../../../SharedElements/BreedSelect";

const UpdateBasicInfo = ({ animal, onUpdate, onCancel, cardBoxStyles }) => {
  const { sendRequest, loading, error, clearError } = useFetch();
  const enums = useContext(EnumContext).enums;

  const [newValues, setNewValues] = useState({
    name: animal.name,
    type: animal.type,
    size: animal.size,
    color: animal.color,
    gender: animal.gender,
    birthDate: animal.birthDate,
    breedId: animal.breed.id,
    notes: animal.notes,
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setNewValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateAnimalInfo = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/animal/${animal.id}`;
    try {
      const updatedAnimal = await sendRequest(
        true,
        url,
        "PUT",
        JSON.stringify(newValues),
        {
          "Content-type": "application/json",
        }
      );
      onUpdate(updatedAnimal);
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
      <Card sx={{ minWidth: "80%" }}>
        <CardContent>
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Name
            </Typography>
            <TextField
              size="small"
              value={newValues.name}
              onChange={(e) =>
                setNewValues({ ...newValues, name: e.target.value })
              }
              sx={{ maxWidth: "200px" }}
            />
          </Box>

          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Birthday
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  inputFormat="YYYY/MM/DD"
                  value={dayjs(newValues.birthDate)}
                  onChange={(e) => setNewValues({ ...newValues, birthDate: e })}
                  slotProps={{ textField: { variant: "outlined" } }}
                  sx={{ maxWidth: "200px" }}
                />
              </LocalizationProvider>
            )}
          </Box>

          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Breed
            </Typography>
            <BreedSelect
              value={newValues.breedId}
              onChange={handleValueChange}
              small
            />
          </Box>

          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Gender
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <SelectValues
                choosableItems={enums.gender}
                value={newValues.gender}
                onChange={handleValueChange}
                label="Gender"
                selectName="gender"
                small
              />
            )}
          </Box>

          {animal.isSterilised && (
            <Box sx={cardBoxStyles}>
              <Typography sx={{ mb: 1, ml: 2 }} color="text.secondary">
                Sterilisation date
              </Typography>
              <Typography variant="body2">
                {animal.sterilisationDate.substring(0, 10)}
              </Typography>
            </Box>
          )}

          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Color
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <SelectValues
                choosableItems={enums.animalColor}
                value={newValues.color}
                onChange={handleValueChange}
                label="Color"
                selectName="color"
                small
              />
            )}
          </Box>

          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Size
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <SelectValues
                choosableItems={enums.animalSize}
                value={newValues.size}
                onChange={handleValueChange}
                label="Size"
                selectName="size"
                small
              />
            )}
          </Box>

          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Type
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <SelectValues
                choosableItems={enums.animalType}
                value={newValues.type}
                onChange={handleValueChange}
                label="Type"
                selectName="type"
                small
              />
            )}
          </Box>

          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Notes
            </Typography>
            <TextField
              size="small"
              value={newValues.notes}
              onChange={(e) =>
                setNewValues({ ...newValues, notes: e.target.value })
              }
              sx={{ maxWidth: "200px" }}
              multiline
              maxRows={3}
            />
          </Box>
        </CardContent>
      </Card>

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
            onClick={updateAnimalInfo}
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
    </>
  );
};

export default UpdateBasicInfo;
