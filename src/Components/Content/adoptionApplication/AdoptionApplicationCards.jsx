import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";

import AdoptionApplicationCard from "./AdoptionApplicationCard";
import Loader from "../../SharedElements/Loader";
import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";
import CustomPagination from "../../SharedElements/CustomPagination";
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

const AdoptionApplicationCards = ({ filters }) => {
  const { loading, error, clearError, sendRequest } = useFetch();
  const [adoptionApplications, setAdoptionApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const url = `${
      process.env.REACT_APP_BACKEND_URL
    }/api/adoptionApplication/pageAndFilter?pagesize=${pageSize}&pageNumber=${currentPage}&animalName=${
      filters.animalName
    }&applierName=${filters.applierName}&status=${
      filters.applicationStatus
    }&dateBefore=${
      filters.dateBefore === null ? "" : filters.dateBefore
    }&dateAfter=${filters.dateAfter === null ? "" : filters.dateAfter}`;
    const getAdoptionApplications = async () => {
      try {
        const responseData = await sendRequest(true, url);
        setAdoptionApplications(responseData.items);
        setNumberOfPages(responseData.numberOfPages);
        setTotalCount(responseData.totalCount);
        return;
      } catch (err) {}
    };
    getAdoptionApplications();
  }, [filters, currentPage, pageSize, sendRequest]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleChangeItemsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
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
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "1em",
            minWidth: 500,
            m: 2,
            p: 1,
          }}
        >
          {adoptionApplications.map((adoptionApplication) => (
            <AdoptionApplicationCard
              key={adoptionApplication.id}
              adoptionApplication={adoptionApplication}
              cardBoxStyles={cardBoxStyles}
              adminMode
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default AdoptionApplicationCards;
