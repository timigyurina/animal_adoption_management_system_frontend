import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";

import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";
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
import Loader from "../../SharedElements/Loader";

const AnimalBreedFilters = ({
  onFilter,
  pageSize,
  pageNumber,
  setNumberOfPages,
  onLoadingChange,
}) => {
  const { loading, error, sendRequest, clearError, } = useFetch();

  const emptyFilters = {
    name: "",
    type: "",
  };
  const [filtersAreOpen, setFiltersAreOpen] = useState(true);
  const [filters, setFilters] = useState(emptyFilters);
  const [choosableAnimalTypes, setChoosableAnimalTypes] = useState([]);

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
  }, []);

  useEffect(() => {
    const getFilteredAnimalBreeds = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/animalBreed/pageAndFilter?pagesize=${pageSize}&pageNumber=${pageNumber}&name=${filters.name}&type=${filters.type}`;
      try {
        const responseData = await sendRequest(true, url);
        setNumberOfPages(responseData.numberOfPages);
        // console.log(loading);
        onFilter(responseData.items);
        return;
      } catch (err) {}
    };

    getFilteredAnimalBreeds();
  }, [filters, pageNumber, pageSize]);

  // useEffect(() => {
  //   console.log("child: " + loading);
  //   onLoadingChange(loading);
  // },[loading]);

  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters(emptyFilters);
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
      {/* {loading ? (
        <Loader />
      ) : ( */}
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
              <Button
                variant="outlined"
                color="error"
                onClick={clearAllFilters}
              >
                Clear all filters
              </Button>
            </Box>
          </FormControl>
        )}
      </>
      {/* )} */}
    </>
  );
};

export default AnimalBreedFilters;
