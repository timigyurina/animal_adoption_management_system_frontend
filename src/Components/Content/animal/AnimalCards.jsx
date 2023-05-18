import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import AnimalCard from "./AnimalCard";
import Loader from "../../SharedElements/Loader";
import CustomPagination from "../../SharedElements/CustomPagination";
import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";
import { Box } from "@mui/material";

const Animals = ({ filters }) => {
  const [animals, setAnimals] = useState([]);
  const { loading, error, sendRequest, clearError } = useFetch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const url = `${
      process.env.REACT_APP_BACKEND_URL
    }/api/animal/pageAndFilter?pagesize=${pageSize}&pageNumber=${currentPage}&name=${
      filters.name
    }&type=${filters.type}&size=${filters.size}&status=${
      filters.status
    }&gender=${filters.gender}&color=${filters.color}&breedId=${
      filters.breedId
    }&isSterilised=${filters.isSterilised === true ? true : ""}&bornBefore=${
      filters.bornBefore === null ? "" : filters.bornBefore
    }&bornAfter=${filters.bornAfter === null ? "" : filters.bornAfter}`;

    const getFilteredAnimals = async () => {
      try {
        const responseData = await sendRequest(true, url);
        setAnimals(responseData.items);
        setNumberOfPages(responseData.numberOfPages);
        setTotalCount(responseData.totalCount);
        return;
      } catch (err) {}
    };
    getFilteredAnimals();
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
          {animals.map((s) => (
            <AnimalCard key={s.id} animal={s} />
          ))}
        </Box>
      )}
    </>
  );
};

export default Animals;
