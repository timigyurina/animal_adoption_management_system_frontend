import { useState, useEffect } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import ShelterDetails from "../../shelter/ShelterDetails";
import UpdateShelterContactInfoForm from "../../shelter/UpdateShelterContactInfoForm";

import { Button, Box, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Loader from "../../../SharedElements/Loader";
import SnackbarWithMessage from "../../../SharedElements/SnackbarWithMessage";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
  p: 2,
};

const ManagedShelter = () => {
  const { loading, error, clearError, sendRequest } = useFetch();
  const [shelterDetails, setShelterDetails] = useState(null);
  const [contactInfoUpdateIsShown, setContactInfoUpdateIsShown] =
    useState(false);

  useEffect(() => {
    const fetchShelterDetails = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/shelter`;
      try {
        const responseData = await sendRequest(true, url);
        setShelterDetails(responseData);
        return;
      } catch (err) {}
    };
    fetchShelterDetails();
  }, [sendRequest]);

  return (
    <>
      <Box sx={style}>
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
          shelterDetails && (
            <>
              <ShelterDetails shelter={shelterDetails} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1em",
                }}
              >
                <Typography variant="h6" component="h6">
                  Update info
                </Typography>
                <Button
                  onClick={() =>
                    setContactInfoUpdateIsShown(!contactInfoUpdateIsShown)
                  }
                >
                  {contactInfoUpdateIsShown ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </Button>
              </Box>

              {contactInfoUpdateIsShown && (
                <UpdateShelterContactInfoForm
                  shelter={shelterDetails}
                  onCancel={() => setContactInfoUpdateIsShown(false)}
                  onUpdate={(s) => setShelterDetails(s)}
                />
              )}
            </>
          )
        )}
      </Box>
    </>
  );
};

export default ManagedShelter;
