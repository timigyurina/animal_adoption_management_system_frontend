import { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";

const AnimalBreedFilters = ({
  filters,
  onClearFilters,
  handleFiltersChange,
  choosableAnimalTypes,
}) => {
  const [filtersAreOpen, setFiltersAreOpen] = useState(true);

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
          sx={{ m: 2, display: "flex", alignItems: "center" }}
          component="fieldset"
          variant="standard"
        >
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
            AnimalBreed filters
          </Typography>

          <Box
            mt={2}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
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
              {Object.entries(choosableAnimalTypes.values).length > 0 ? (
                <>
                  <InputLabel>AnimalType</InputLabel>
                  <Select
                    name="type"
                    value={filters.type}
                    onChange={handleFiltersChange}
                  >
                    <MenuItem value={""}>Select an AnimalType</MenuItem>
                    {Object.entries(choosableAnimalTypes.values).map(
                      ([name, value]) => (
                        <MenuItem value={name} key={value}>
                          {name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </>
              ) : (
                "No AnimalTypes to chose from"
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
            <Button variant="outlined" color="error" onClick={onClearFilters}>
              Clear all filters
            </Button>
          </Box>
        </FormControl>
      )}
    </>
  );
};

export default AnimalBreedFilters;
