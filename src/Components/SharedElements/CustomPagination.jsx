import {
  Typography,
  Pagination,
  Stack,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";

const CustomPagination = ({
  currentPage,
  onPageChange,
  pageCount,
  pageSize,
  onCountChange,
}) => {
  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "fit-content",
    margin: "1.2rem auto",
  };

  const pageNumStyles = {
    fontSize: "1.1rem",
    fontWeight: "700",
  };


  return (
    <Stack spacing={2} sx={containerStyles}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Grid item xs={8}>
          <Typography sx={pageNumStyles}>
            Page {currentPage}/{pageCount}{" "}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl
            sx={{  minWidth: 80 }}
            size="small"
            color="ternary"
          >
            <InputLabel id="demo-select-small">Count</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={pageSize}
              onChange={onCountChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={onPageChange}
        siblingCount={1}
        boundaryCount={2}
        color="ternary"
      />
    </Stack>
  );
};

export default CustomPagination;
