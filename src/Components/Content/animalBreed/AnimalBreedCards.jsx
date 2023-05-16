import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";

import AnimalBreedCard from "./AnimalBreedCard";
import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";
import CustomPagination from "../../SharedElements/CustomPagination";
import Loader from "../../SharedElements/Loader";
import { Box } from "@mui/material/";

const AnimalBreedCards = ({ filters }) => {
  const { loading, error, clearError, sendRequest } = useFetch();
  const [animalBreeds, setAnimalBreeds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/animal/pageAndFilter?pagesize=${pageSize}&pageNumber=${currentPage}&name=${filters.name}&type=${filters.type}`;
    const getFilteredAnimals = async () => {
      try {
        const responseData = await sendRequest(true, url);
        setAnimalBreeds(responseData.items);
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
          {animalBreeds.map((a) => (
            <AnimalBreedCard key={a.id} breed={a} />
          ))}
        </Box>
      )}
    </>
  );
};

export default AnimalBreedCards;
