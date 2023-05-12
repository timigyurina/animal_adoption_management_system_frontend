import { useState, useEffect, useCallback } from "react";
import { useFetch } from "../../../hooks/useFetch";
import Loader from "../../SharedElements/Loader";
import AnimalBreedCard from "./AnimalBreedCard";

import { Box } from "@mui/material/";
import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";
import AnimalBreedFilters from "./AnimalBreedFilters";
import CustomPagination from "../../SharedElements/CustomPagination";

const AnimalBreeds = () => {
  const { error, clearError } = useFetch();
  const [animalBreeds, setAnimalBreeds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [loadingFiltered, setLoadingFiltered] = useState(false);

  const handleChangeItemsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const onFilterHandler = (filtered) => {
    setAnimalBreeds(filtered);
  };

  // const onLoadingChangeHandler = useCallback((isLoading) => {
  //   setLoadingFiltered(isLoading);
  // }, []);

  useEffect(() => {
    console.log("parent: " + loadingFiltered);
  }, [loadingFiltered]);

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
      {loadingFiltered ? (
        <Loader />
      ) : (
        <>
          <AnimalBreedFilters
            onFilter={onFilterHandler}
            pageNumber={currentPage}
            pageSize={pageSize}
            setNumberOfPages={(num) => setNumberOfPages(num)}
            onLoadingChange={(isLoading) => {
              setLoadingFiltered(isLoading);
            }}
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
            {animalBreeds.map((b) => (
              <AnimalBreedCard key={b.id} breed={b} />
            ))}
          </Box>
        </>
      )}
    </div>
  );
};

export default AnimalBreeds;
