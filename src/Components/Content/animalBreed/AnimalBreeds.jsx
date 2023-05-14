import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import Loader from "../../SharedElements/Loader";
import AnimalBreedCard from "./AnimalBreedCard";

import { Box } from "@mui/material/";
import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";
import AnimalBreedFilters from "./AnimalBreedFilters";
import CustomPagination from "../../SharedElements/CustomPagination";

const AnimalBreeds = () => {
  const { loading, error, clearError, sendRequest } = useFetch();
  const [animalBreeds, setAnimalBreeds] = useState([]);
  const [choosableAnimalTypes, setChoosableAnimalTypes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const emptyFilters = {
    name: "",
    type: "",
  };
  const [filters, setFilters] = useState(emptyFilters);

  useEffect(() => {
    const fetchChoosableAnimalTypes = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/enum/AnimalType`;
      try {
        const responseData = await sendRequest(false, url);
        setChoosableAnimalTypes(responseData);
        return;
      } catch (err) {}
    };
    fetchChoosableAnimalTypes();
  }, [sendRequest]);

  useEffect(() => {
    const getFilteredAnimalBreeds = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/animalBreed/pageAndFilter?pagesize=${pageSize}&pageNumber=${currentPage}&name=${filters.name}&type=${filters.type}`;
      try {
        const responseData = await sendRequest(true, url);
        setNumberOfPages(responseData.numberOfPages);
        setAnimalBreeds(responseData.items);
        return;
      } catch (err) {}
    };

    getFilteredAnimalBreeds();
  }, [filters, currentPage, pageSize, sendRequest]);

  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const handleChangeItemsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
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
          <AnimalBreedFilters
            filters={filters}
            handleFiltersChange={handleFiltersChange}
            onFilter={(filtered) => {
              setAnimalBreeds(filtered);
            }}
            onClearFilters={() => {
              setFilters(emptyFilters);
            }}
            choosableAnimalTypes={choosableAnimalTypes}
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
