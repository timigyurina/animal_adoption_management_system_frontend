import { useState } from "react";
import SheltersTable from "./SheltersTable";

import {
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  FormGroup,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";

const Shelters = () => {
  const emptyFilters = {
    name: "",
    contactPersonName: "",
    isActive: false,
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

  const onCheckboxChange = (e) =>
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked,
    });

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
            Shelter filters
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
              id="shelterName"
              label="Name"
              name="name"
              value={filters.name}
              onChange={handleFiltersChange}
              variant="outlined"
              placeholder="Search..."
              size="small"
            />
            <TextField
              label="Contact person"
              name="contactPersonName"
              value={filters.contactPersonName}
              onChange={handleFiltersChange}
              variant="outlined"
              placeholder="Search..."
              size="small"
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.isActive}
                    onChange={onCheckboxChange}
                    name="isActive"
                  />
                }
                label="Only show active"
              />
            </FormGroup>
          </Box>

          <Box
            mt={3}
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

      <SheltersTable filters={filters} />
    </>
  );
};

export default Shelters;
