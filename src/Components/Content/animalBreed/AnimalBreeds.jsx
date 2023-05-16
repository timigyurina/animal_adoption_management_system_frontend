import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";

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
  const { loading, sendRequest } = useFetch();
  const [choosableAnimalTypes, setChoosableAnimalTypes] = useState([]);

  const emptyFilters = {
    name: "",
    type: "",
  };
  const [filters, setFilters] = useState(emptyFilters);
  const [filtersAreOpen, setFiltersAreOpen] = useState(true);

  useEffect(() => {
    const fetchChoosableAnimalTypes = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/enum/AnimalType`;
      try {
        const responseData = await sendRequest(false, url);
        setChoosableAnimalTypes(responseData);
        return;
      } catch (err) {}
    };
    fetchChoosableAnimalTypes();
  }, [sendRequest]);

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
              {loading ? (
                <CircularProgress />
              ) : Object.entries(choosableAnimalTypes.values).length > 0 ? (
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
