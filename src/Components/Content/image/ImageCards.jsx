import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";

import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";
import CustomPagination from "../../SharedElements/CustomPagination";
import Loader from "../../SharedElements/Loader";

import { ImageListItem, ImageListItemBar, Box } from "@mui/material";

const ImageCards = ({ filters }) => {
  const [images, setImages] = useState([]);
  const { loading, error, sendRequest, clearError } = useFetch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const getFilteredImages = async () => {
      const url = `${
        process.env.REACT_APP_BACKEND_URL
      }/api/image/pageAndFilter?pagesize=${pageSize}&pageNumber=${currentPage}&uploaderName=${
        filters.uploaderName
      }&animalName=${filters.animalName}&takenBefore=${
        filters.takenBefore === null ? "" : filters.takenBefore
      }&takenAfter=${
        filters.takenAfter === null ? "" : filters.takenAfter
      }&animalType=${filters.type}`;

      try {
        const responseData = await sendRequest(false, url);
        setImages(responseData.items);
        setNumberOfPages(responseData.numberOfPages);
        setTotalCount(responseData.totalCount);
        return;
      } catch (err) {}
    };

    getFilteredImages();
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
          {images.map((item) => (
            <ImageListItem key={item.id} sx={{ maxWidth: "300px" }}>
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${item.imagePath}`}
                alt={item.description}
                loading="lazy"
              />
              <ImageListItemBar
                title={`${item.animal.name} - ${item.dateTaken.substring(
                  0,
                  10
                )}`}
                position="below"
              />
            </ImageListItem>
          ))}
        </Box>
      )}
    </>
  );
};

export default ImageCards;
