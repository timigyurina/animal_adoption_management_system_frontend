import { useState, useEffect } from "react";
import ShelterAnimalsDetails from "./detailedShelter/ShelterAnimalsDetails";
import ShelterAddressDetails from "./detailedShelter/ShelterAddressDetails";
import ShelterDonationsDetails from "./detailedShelter/ShelterDonationsDetails";
import ShelterEmployeesDetails from "./detailedShelter/ShelterEmployeesDetails";

import {  Typography, Box, Button } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useFetch } from "../../../hooks/useFetch";
import LoadingSpinner from "../../SharedElements/LoadingSpinner";
import "../../SharedElements/LoadingSpinner.css";

const cardBoxStyles = {
  minWidth: "90%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1em",
};

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1em",
};

const ShelterDetails = ({ shelterId }) => {
  const { loading, error, sendRequest, } =
    useFetch();
  const [shelterDetails, setShelterDetails] = useState(null);
  const [addressDetailsAreOpen, setAddressDetailsAreOpen] = useState(false);
  const [animalsDetailsAreOpen, setAnimalsDetailsAreOpen] = useState(false);
  const [donationsDetailsAreOpen, setDonationsDetailsAreOpen] = useState(false);
  const [employeesDetailsAreOpen, setEmployeesDetailsAreOpen] = useState(false);

  useEffect(() => {
    const fetchShelterDetails = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/shelter/${shelterId}/details`;
      try {
        const responseData = await sendRequest(true, url);
        setShelterDetails(responseData);
        return;
      } catch (err) {}
    };
    fetchShelterDetails();
  }, [sendRequest, shelterId]);

  return (
    <>
      {error && (
        error
      )}
      {loading ? (
        <LoadingSpinner asoverLay />
      ) : (
        shelterDetails && (
          <Box
            sx={{
              minWidth: 500,
              m: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1em",
            }}
          >
            <Typography variant="h5" component="div">
              Details of {shelterDetails.name}
            </Typography>

            <Box
              sx={
                (centerStyle,
                {
                  width: "80%",
                })
              }
            >
              <Box sx={centerStyle}>
                <Typography variant="h6" component="h6">
                  Address details
                </Typography>
                <Button
                  onClick={() =>
                    setAddressDetailsAreOpen(!addressDetailsAreOpen)
                  }
                >
                  {addressDetailsAreOpen ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </Button>
              </Box>
              {addressDetailsAreOpen && (
                <ShelterAddressDetails
                  shelterAddress={shelterDetails.address}
                  cardBoxStyles={cardBoxStyles}
                />
              )}
            </Box>

            <Box sx={centerStyle}>
              <Typography variant="h6" component="div">
                Animals' details
              </Typography>
              <Button
                onClick={() => setAnimalsDetailsAreOpen(!animalsDetailsAreOpen)}
              >
                {animalsDetailsAreOpen ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </Button>
            </Box>
            {animalsDetailsAreOpen && (
              <ShelterAnimalsDetails
                shelterAnimals={shelterDetails.animals}
                cardBoxStyles={cardBoxStyles}
              />
            )}

            {shelterDetails.donations.length > 0 && (
              <>
                <Box sx={centerStyle}>
                  <Typography variant="h6" component="div">
                    Donations' details
                  </Typography>
                  <Button
                    onClick={() =>
                      setDonationsDetailsAreOpen(!donationsDetailsAreOpen)
                    }
                  >
                    {donationsDetailsAreOpen ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </Button>
                </Box>
                {donationsDetailsAreOpen && (
                  <ShelterDonationsDetails
                    shelterDonations={shelterDetails.donations}
                    cardBoxStyles={cardBoxStyles}
                  />
                )}
              </>
            )}

            {shelterDetails.employees.length > 0 && (
              <>
                <Box sx={centerStyle}>
                  <Typography variant="h6" component="div">
                    Employees' details
                  </Typography>
                  <Button
                    onClick={() =>
                      setEmployeesDetailsAreOpen(!employeesDetailsAreOpen)
                    }
                  >
                    {employeesDetailsAreOpen ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </Button>
                </Box>
                {employeesDetailsAreOpen && (
                  <ShelterEmployeesDetails
                    shelterEmployees={shelterDetails.employees}
                    cardBoxStyles={cardBoxStyles}
                  />
                )}
              </>
            )}
          </Box>
        )
      )}
    </>
  );
};

export default ShelterDetails;
