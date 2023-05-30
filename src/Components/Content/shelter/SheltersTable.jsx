import { useState, useEffect, useContext } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthContext";

import ShelterDetailsModal from "./ShelterDetailsModal";
import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";
import CustomPagination from "../../SharedElements/CustomPagination";
import Loader from "../../SharedElements/Loader";

import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

import { Box } from "@mui/material/";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.green,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SheltersTable = ({ filters }) => {
  const auth = useContext(AuthContext);
  const { loading, error, clearError, sendRequest } = useFetch();
  const [shelters, setShelters] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const url = `${
      process.env.REACT_APP_BACKEND_URL
    }/api/shelter/pageAndFilter?pagesize=${pageSize}&pageNumber=${currentPage}&name=${
      filters.name
    }&contactPersonName=${filters.contactPersonName}&isActive=${
      filters.isActive === true ? true : ""
    }`;
    const getFilteredShelters = async () => {
      try {
        const responseData = await sendRequest(true, url);
        setShelters(responseData.items);
        setNumberOfPages(responseData.numberOfPages);
        setTotalCount(responseData.totalCount);
        return;
      } catch (err) {}
    };
    getFilteredShelters();
  }, [filters, currentPage, pageSize, sendRequest]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleChangeItemsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleShelterUpdate = (shelter) => {
    const newShelters = [...shelters];
    const indexOfShelter = newShelters.findIndex((s) => s.id === shelter.id);
    newShelters[indexOfShelter] = shelter;
    setShelters(newShelters);
  };

  const updateShelterStatus = async (shelter) => {
    const newStatus = !shelter.isActive;
    try {
      await sendRequest(
        true,
        `${process.env.REACT_APP_BACKEND_URL}/api/shelter/${shelter.id}/updateShelterIsActive`,
        "PUT",
        newStatus,
        {
          "Content-type": "application/json",
        }
      );
      handleShelterUpdate({ ...shelter, isActive: newStatus });
    } catch (error) {}
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

      <CustomPagination
        pageSize={pageSize}
        currentPage={currentPage}
        pageCount={numberOfPages}
        onPageChange={(event, value) => {
          setCurrentPage(value);
        }}
        onCountChange={handleChangeItemsPerPage}
        totalCount={totalCount}
      />

      {loading ? (
        <Loader />
      ) : (
        <Box
          mt={2}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center">Phone</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  {auth.userRoles.some(
                    (r) => ["Administrator", "ShelterEmployee"].indexOf(r) >= 0
                  ) && <StyledTableCell align="center">Status</StyledTableCell>}
                  {auth.userRoles.includes("Administrator") && (
                    <StyledTableCell align="center">
                      Update contact
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="center">Details</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shelters.map((shelter) => (
                  <StyledTableRow key={shelter.name}>
                    <StyledTableCell component="th" scope="row">
                      {shelter.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {shelter.phone}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {shelter.email}
                    </StyledTableCell>
                    {/* Update isActive prop of Shelter */}
                    {auth.userRoles.includes("Administrator") ? (
                      <StyledTableCell align="center">
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                onClick={() => updateShelterStatus(shelter)}
                                checked={shelter.isActive}
                              />
                            }
                            label={shelter.isActive ? "Active" : "Inactive"}
                          />
                        </FormGroup>
                      </StyledTableCell>
                    ) : (
                      auth.userRoles.includes("ShelterEmployee") && (
                        <StyledTableCell align="center">
                          {shelter.isActive ? "Active" : "Inactive"}
                        </StyledTableCell>
                      )
                    )}
                    {/* Update contactInfo of Shelter */}
                    {auth.userRoles.includes("Administrator") && (
                      <StyledTableCell align="center">
                        <ShelterDetailsModal
                          shelter={shelter}
                          updateContactInfoMode
                          onShelterWasUpdated={handleShelterUpdate} 
                        />
                      </StyledTableCell>
                    )}
                    {/* Open Shelter details */}
                    <StyledTableCell align="center">
                      <ShelterDetailsModal shelter={shelter} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default SheltersTable;
