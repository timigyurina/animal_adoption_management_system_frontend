import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../UIElements/Loader";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Shelters = () => {
  const [shelters, setShelters] = useState([]);
  const { loading, error, sendRequest, clearError } = useFetch();

  // useEffect(() => {
  //   const fetchShelters = async () => {
  //     const url = `${process.env.REACT_APP_BACKEND_URL}/api/shelter`;

  //     try {
  //       setLoading(true);
  //       const response = await fetch(url, {
  //         credentials: "include",
  //       });
  //       const responseData = await response.json();
  //       setLoading(false);

  //       if (!response.ok) {
  //         const error = response.message;
  //         setError(error);
  //         return;
  //       }
  //       console.log(responseData.items);
  //       setShelters(responseData.items);
  //     } catch (err) {
  //       setLoading(false);
  //       setError(err.message);
  //     }
  //   };

  //   fetchShelters();
  // }, []);
  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/shelter`;
    const fetchShelters = async () => {
      try {
        const responseData = await sendRequest(true, url);
        setShelters(responseData.items);
        return;
      } catch (err) {}
    };
    fetchShelters();
  }, [sendRequest]);

  return (
    <div>
      {error && (
        <div>
          {error} <button onClick={clearError}>OK</button>
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Phone</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
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
                  <StyledTableCell align="center">button</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Shelters;
