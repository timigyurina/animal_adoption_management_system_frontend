import { useState, useEffect } from "react";
import { useFetch } from "../../../../hooks/useFetch";

import SnackbarWithMessage from "../../../SharedElements/SnackbarWithMessage";
import Loader from "../../../SharedElements/Loader";
import AdoptionApplicationCard from "../../adoptionApplication/AdoptionApplicationCard";
import { Box } from "@mui/material";

const cardBoxStyles = {
  minWidth: "250px",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1em",
};

// this component gets a User's own applications, not all of them

const MyAdoptionApplications = () => {
  const { loading, error, clearError, sendRequest } = useFetch();
  const [adoptionApplicationsOfUser, setAdoptionApplicationsOfUser] = useState(
    []
  );

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/adoptionApplication`;
    const getAdoptionApplicationsOfUser = async () => {
      try {
        const responseData = await sendRequest(true, url);
        setAdoptionApplicationsOfUser(responseData);
        return;
      } catch (err) {}
    };
    getAdoptionApplicationsOfUser();
  }, [sendRequest]);

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
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "1em",
            minWidth: 500,
            m: 1,
            p: 2,
          }}
        >
          {adoptionApplicationsOfUser.map((adoptionApplication) => (
            <AdoptionApplicationCard
              key={adoptionApplication.id}
              adoptionApplication={adoptionApplication}
              cardBoxStyles={cardBoxStyles}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default MyAdoptionApplications;
