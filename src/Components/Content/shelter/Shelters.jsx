import { useState, useEffect, useContext } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthContext";
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
import ShelterDetailsModal from "./ShelterDetailsModal";
import ShelterFilters from "./ShelterFilters";
import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";
import CustomPagination from "../../SharedElements/CustomPagination";

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

const Shelters = () => {
  const auth = useContext(AuthContext);
  const { loading, error, sendRequest, clearError } = useFetch();
  const [shelters, setShelters] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const emptyFilters = {
    name: "",
    contactPersonName: "",
    isActive: false,
  };
  const [filters, setFilters] = useState(emptyFilters);

  const getFilteredShelters = async () => {
    const url = `${
      process.env.REACT_APP_BACKEND_URL
    }/api/shelter/pageAndFilter?pagesize=${pageSize}&pageNumber=${currentPage}&name=${
      filters.name
    }&contactPersonName=${filters.contactPersonName}&isActive=${
      filters.isActive === true ? true : ""
    }`;
    try {
      const responseData = await sendRequest(true, url);
      setNumberOfPages(responseData.numberOfPages);
      setShelters(responseData.items);
      return;
    } catch (err) {}
  };
  
  const getDefaultShelters = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/shelter/pageAndFilter`;
    try {
      const responseData = await sendRequest(true, url);
      setNumberOfPages(responseData.numberOfPages);
      setShelters(responseData.items);
      return;
    } catch (err) {}
  };

  useEffect(() => {
    getDefaultShelters();
  }, []);

  const handleChangeItemsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const onCheckboxChange = (e) =>
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked,
    });

  const onClearFilters = () => {
    setFilters(emptyFilters);
    setCurrentPage(1);
    getDefaultShelters();
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
    <div>
      {error && (
        <SnackbarWithMessage
          message={error}
          severity="error"
          opened={error !== null}
          closed={clearError}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <>
          <ShelterFilters
            onFilter={getFilteredShelters}
            filters={filters}
            handleFiltersChange={handleFiltersChange}
            onCheckboxChange={onCheckboxChange}
            onClearFilters={onClearFilters}
          />

          <CustomPagination
            pageSize={pageSize}
            currentPage={currentPage}
            pageCount={numberOfPages}
            onPageChange={(event, value) => {
              setCurrentPage(value);
            }}
            onCountChange={handleChangeItemsPerPage}
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center">Phone</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  {auth.userRoles.includes("Administrator") && (
                    <StyledTableCell align="center">Set status</StyledTableCell>
                  )}
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
                    {auth.userRoles.includes("Administrator") && (
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
                    )}
                    {/* Update contactInfo of Shelter */}
                    {auth.userRoles.includes("Administrator") && (
                      <StyledTableCell align="center">
                        <ShelterDetailsModal
                          shelter={shelter}
                          updateContactInfoMode
                          // onShelterWasUpdated={handleShelterUpdate} //   KEZDENI VAALMIET
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
        </>
      )}
    </div>
  );
};

export default Shelters;
