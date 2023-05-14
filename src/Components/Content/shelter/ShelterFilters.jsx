import { useState } from "react";
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

const ShelterFilters = ({
  filters,
  handleFiltersChange,
  onCheckboxChange,
  onClearFilters,
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
            <Button variant="outlined" color="error" onClick={onClearFilters}>
              Clear all filters
            </Button>
          </Box>
        </FormControl>
      )}
    </>
  );
};

export default ShelterFilters;
