import { useState, useContext } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { EnumContext } from "../../../context/EnumContext";

import SelectValues from "../../SharedElements/SelectValues";
import ImageCards from "./ImageCards";
import {
  Box,
  TextField,
  FormControl,
  Typography,
  Button,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Images = () => {
  const { loading } = useFetch();
  const animalType = useContext(EnumContext).enums.animalType;

  const emptyFilters = {
    animalName: "",
    uploaderName: "",
    takenBefore: null,
    takenAfter: null,
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
            Image filters
          </Typography>

          <Box
            mt={1}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 3,
            }}
          >
            <TextField
              label="Name of Animal"
              name="animalName"
              value={filters.animalName}
              onChange={handleFiltersChange}
              variant="outlined"
              placeholder="Search..."
              size="small"
            />
            {loading ? (
              <CircularProgress />
            ) : (
              <SelectValues
                choosableItems={animalType}
                value={filters.type}
                onChange={handleFiltersChange}
                label="Type"
                selectName="type"
                small
                withDefault
              />
            )}
          </Box>

          <Box
            my={1}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 3,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Taken after"
                inputFormat="YYYY/MM/DD"
                defaultValue={dayjs("2022-04-17")}
                value={filters.takenAfter}
                onChange={(newValue) =>
                  setFilters({ ...filters, takenAfter: newValue })
                }
                slotProps={{ textField: { variant: "outlined" } }}
              />
              <DatePicker
                label="Taken before"
                inputFormat="YYYY/MM/DD"
                value={filters.takenBefore}
                onChange={(newValue) =>
                  setFilters({ ...filters, takenBefore: newValue })
                }
                slotProps={{ textField: { variant: "outlined" } }}
              />
              {filters.takenAfter !== null &&
                filters.takenBefore !== null &&
                filters.takenAfter > filters.takenBefore && (
                  <FormHelperText error>
                    Taken before date cannot be earlier than taken after
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
      <ImageCards filters={filters} />;
    </>
  );
};

export default Images;
