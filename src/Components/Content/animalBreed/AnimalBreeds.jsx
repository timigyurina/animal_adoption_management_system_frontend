import { useState, useContext } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { EnumContext } from "../../../context/EnumContext";

import AnimalBreedCards from "./AnimalBreedCards";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

const AnimalBreeds = () => {
  const { loading } = useFetch();
  const { animalType } = useContext(EnumContext).enums;

  const emptyFilters = {
    name: "",
    type: "",
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

  return (
    <>
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
            Breed filters
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
            <TextField
              label="Name"
              name="name"
              value={filters.name}
              onChange={handleFiltersChange}
              variant="outlined"
              placeholder="Search..."
              size="small"
            />

            <FormControl
              sx={{
                m: 1,
                minWidth: 200,
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
            </FormControl>
          </Box>

          <Box
            mb={1}
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
      <AnimalBreedCards filters={filters} />
    </>
  );
};

export default AnimalBreeds;
