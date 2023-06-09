import { useState, useContext } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { EnumContext } from "../../../context/EnumContext";
import { AuthContext } from "../../../context/AuthContext";
import CreateAnimalModal from "./creation/CreateAnimalModal";
import AnimalCards from "./AnimalCards";
import SelectValues from "../../SharedElements/SelectValues";
import BreedSelect from "../../SharedElements/BreedSelect";

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Animals = () => {
  const { loading } = useFetch();
  const { animalColor, animalSize, animalStatus, animalType, gender } =
    useContext(EnumContext).enums;
  const auth = useContext(AuthContext);
  const [newAnimal, setNewAnimal] = useState(null);

  const emptyFilters = {
    name: "",
    type: "",
    size: "",
    status: "",
    gender: "",
    color: "",
    breedId: "",
    isSterilised: false,
    bornAfter: null,
    bornBefore: null,
  };
  const [filters, setFilters] = useState(emptyFilters);
  const [filtersAreOpen, setFiltersAreOpen] = useState(true);

  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) =>
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked,
    });

  return (
    <>
      {(auth.userRoles.includes("Administrator") ||
        auth.userRoles.includes("ShelterEmployee")) && (
        <CreateAnimalModal
          onAnimalWasCreated={(createdAnimal) => setNewAnimal(createdAnimal)}
        />
      )}

      <Box sx={{ textAlign: "center", m: 2 }}>
        <Button
          variant="contained"
          onClick={() => setFiltersAreOpen(!filtersAreOpen)}
        >
          {filtersAreOpen ? "Close filters" : "Open filters"}
        </Button>
      </Box>

      {filtersAreOpen && (
        <FormControl
          sx={{ m: 1, display: "flex", alignItems: "center" }}
          component="fieldset"
          variant="standard"
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Animal filters
          </Typography>

          <Box
            mt={1}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              gap: 1,
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : Object.entries(animalType).length > 0 ? (
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 200,
                }}
                size="small"
              >
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={filters.type}
                  onChange={handleFiltersChange}
                >
                  <MenuItem value={""}>Select a Type</MenuItem>
                  {Object.entries(animalType).map(([name, value]) => (
                    <MenuItem value={name} key={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              "No AnimalTypes to choose from"
            )}

            {loading ? (
              <CircularProgress />
            ) : (
              <SelectValues
                choosableItems={animalSize}
                value={filters.size}
                onChange={handleFiltersChange}
                label="Size"
                selectName="size"
                small
                withDefault
              />
            )}

            {loading ? (
              <CircularProgress />
            ) : (
              <SelectValues
                choosableItems={animalColor}
                value={filters.color}
                onChange={handleFiltersChange}
                label="Color"
                selectName="color"
                small
                withDefault
              />
            )}

            {loading ? (
              <CircularProgress />
            ) : (
              <SelectValues
                choosableItems={gender}
                value={filters.gender}
                onChange={handleFiltersChange}
                label="Gender"
                selectName="gender"
                small
                withDefault
              />
            )}

            {loading ? (
              <CircularProgress />
            ) : (
              <SelectValues
                choosableItems={animalStatus}
                value={filters.status}
                onChange={handleFiltersChange}
                label="Status"
                selectName="status"
                small
                withDefault
              />
            )}

            <BreedSelect
              value={filters.breedId}
              onChange={handleFiltersChange}
              small
              withDefault
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.isSterilised}
                    onChange={handleCheckboxChange}
                    name="isSterilised"
                  />
                }
                label="Only show sterilised"
              />
            </FormGroup>
          </Box>

          <Box
            my={1}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              gap: 1,
            }}
          >
            <TextField
              label="Name"
              name="name"
              value={filters.name}
              onChange={handleFiltersChange}
              variant="outlined"
              placeholder="Search..."
              size="small"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Born after"
                inputFormat="YYYY/MM/DD"
                defaultValue={dayjs("2022-04-17")}
                value={filters.bornAfter}
                onChange={(newValue) =>
                  setFilters({ ...filters, bornAfter: newValue })
                }
                slotProps={{ textField: { variant: "outlined" } }}
              />
              <DatePicker
                label="Born before"
                inputFormat="YYYY/MM/DD"
                value={filters.bornBefore}
                onChange={(newValue) =>
                  setFilters({ ...filters, bornBefore: newValue })
                }
                slotProps={{ textField: { variant: "outlined" } }}
              />
              {filters.bornAfter !== null &&
                filters.bornBefore !== null &&
                filters.bornAfter > filters.bornBefore && (
                  <FormHelperText error>
                    Born before date cannot be earlier than born after
                  </FormHelperText>
                )}
            </LocalizationProvider>
          </Box>
          <Box
            my={1}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              width: "70%",
            }}
          >
            <Button
              variant="outlined"
              color="ternary"
              onClick={() => setFilters(emptyFilters)}
            >
              Clear all filters
            </Button>
          </Box>
        </FormControl>
      )}

      <AnimalCards filters={filters} newAnimal={newAnimal} />
    </>
  );
};

export default Animals;
