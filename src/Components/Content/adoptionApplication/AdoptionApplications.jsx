import { useState, useContext } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { EnumContext } from "../../../context/EnumContext";

import AdoptionApplicationCards from "./AdoptionApplicationCards";
import SelectValues from "../../SharedElements/SelectValues";
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

// component for setting filters for AdoptionApplications and then passing those down to AdoptionApplicationCards
// only admins can access the route of this component

const AdoptionApplications = () => {
  const { loading } = useFetch();
  const { applicationStatus } = useContext(EnumContext).enums;

  const emptyFilters = {
    animalName: "",
    applierName: "",
    applicationStatus: "",
    dateAfter: null,
    dateBefore: null,
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
            AdoptionApplication filters
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
            ) : (
              <SelectValues
                choosableItems={applicationStatus}
                value={filters.applicationStatus}
                onChange={handleFiltersChange}
                label="Application status"
                selectName="applicationStatus"
                small
                withDefault
              />
            )}

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
                label="Name of Animal"
                name="animalName"
                value={filters.animalName}
                onChange={handleFiltersChange}
                variant="outlined"
                placeholder="Search for Animal..."
                size="small"
              />
              <TextField
                label="Name of Applier"
                name="applierName"
                value={filters.applierName}
                onChange={handleFiltersChange}
                variant="outlined"
                placeholder="Search for Applier..."
                size="small"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date after"
                  inputFormat="YYYY/MM/DD"
                  defaultValue={dayjs("2022-04-17")}
                  value={filters.dateAfter}
                  onChange={(newValue) =>
                    setFilters({ ...filters, dateAfter: newValue })
                  }
                  slotProps={{ textField: { variant: "outlined" } }}
                />
                <DatePicker
                  label="Date before"
                  inputFormat="YYYY/MM/DD"
                  value={filters.dateBefore}
                  onChange={(newValue) =>
                    setFilters({ ...filters, dateBefore: newValue })
                  }
                  slotProps={{ textField: { variant: "outlined" } }}
                />
                {filters.dateAfter !== null &&
                  filters.dateBefore !== null &&
                  filters.dateAfter > filters.dateBefore && (
                    <FormHelperText error>
                      Date before cannot be earlier than date after
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
          </Box>
        </FormControl>
      )}

      <AdoptionApplicationCards filters={filters} />
    </>
  );
};

export default AdoptionApplications;
