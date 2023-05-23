import { useState, useEffect, useContext } from "react";
import { useFetch } from "../../../../../hooks/useFetch";
import { EnumContext } from "../../../../../context/EnumContext";

import SnackbarWithMessage from "../../../../SharedElements/SnackbarWithMessage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  TextField,
  MenuItem,
  FormControl,
  FormHelperText,
  Typography,
  Select,
  Box,
  Button,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

const UpdateBasicInfo = ({ animal, onUpdate, onCancel, cardBoxStyles }) => {
  const { sendRequest, loading, error, clearError } = useFetch();
  const enums = useContext(EnumContext).enums;
  const [breeds, setBreeds] = useState([]);

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

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/animalBreed/getAll`;
    const getAllBreeds = async () => {
      try {
        const responseData = await sendRequest(true, url);
        setBreeds(responseData);
        return;
      } catch (err) {}
    };
    getAllBreeds();
  }, [sendRequest]);

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
            {loading ? (
              <CircularProgress />
            ) : breeds.length > 0 ? (
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 150,
                }}
              >
                <Select
                  name="breedId"
                  size="small"
                  value={newValues.breedId}
                  onChange={(e) =>
                    setNewValues({ ...newValues, breedId: e.target.value })
                  }
                >
                  {breeds.map((b) => (
                    <MenuItem value={b.id} key={b.id}>
                      {b.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              "No Breeds to choose from"
            )}
          </Box>

          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Gender
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : Object.entries(enums.gender).length > 0 ? (
              <FormControl
                sx={{
                  m: 0.5,
                  minWidth: 100,
                }}
              >
                <Select
                  size="small"
                  name="gender"
                  value={newValues.gender}
                  onChange={(e) =>
                    setNewValues({ ...newValues, gender: e.target.value })
                  }
                  error={newValues.gender === ""}
                >
                  {Object.entries(enums.gender).map(([name, value]) => (
                    <MenuItem value={name} key={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {newValues.gender === "" && (
                  <FormHelperText error>Please select a gender</FormHelperText>
                )}
              </FormControl>
            ) : (
              "No Gender to choose from"
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
            ) : Object.entries(enums.animalColor).length > 0 ? (
              <FormControl
                sx={{
                  m: 0.5,
                  minWidth: 100,
                }}
              >
                <Select
                  size="small"
                  name="color"
                  value={newValues.color}
                  onChange={(e) =>
                    setNewValues({ ...newValues, color: e.target.value })
                  }
                  error={newValues.color === ""}
                >
                  {Object.entries(enums.animalColor).map(([name, value]) => (
                    <MenuItem value={name} key={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {newValues.color === "" && (
                  <FormHelperText error>Please select a color</FormHelperText>
                )}
              </FormControl>
            ) : (
              "No Color to choose from"
            )}
          </Box>
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Size
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : Object.entries(enums.animalSize).length > 0 ? (
              <FormControl
                sx={{
                  m: 0.5,
                  minWidth: 100,
                }}
              >
                <Select
                  size="small"
                  name="size"
                  value={newValues.size}
                  onChange={(e) =>
                    setNewValues({ ...newValues, size: e.target.value })
                  }
                  error={newValues.size === ""}
                >
                  {Object.entries(enums.animalSize).map(([name, value]) => (
                    <MenuItem value={name} key={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {newValues.size === "" && (
                  <FormHelperText error>Please select a size</FormHelperText>
                )}
              </FormControl>
            ) : (
              "No Size to choose from"
            )}
          </Box>
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Type
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : Object.entries(enums.animalType).length > 0 ? (
              <FormControl
                sx={{
                  m: 0.5,
                  minWidth: 100,
                }}
              >
                <Select
                  size="small"
                  name="type"
                  value={newValues.type}
                  onChange={(e) =>
                    setNewValues({ ...newValues, type: e.target.value })
                  }
                  error={newValues.type === ""}
                >
                  {Object.entries(enums.animalType).map(([name, value]) => (
                    <MenuItem value={name} key={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {newValues.type === "" && (
                  <FormHelperText error>Please select a type</FormHelperText>
                )}
              </FormControl>
            ) : (
              "No Type to choose from"
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
