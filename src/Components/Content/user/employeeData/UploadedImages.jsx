import { useState, useEffect } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import Loader from "../../../SharedElements/Loader";
import SnackbarWithMessage from "../../../SharedElements/SnackbarWithMessage";

import { ImageListItem, ImageListItemBar, Box } from "@mui/material";

const UploadedImages = () => {
  const { loading, error, clearError, sendRequest } = useFetch();
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/image`;
      try {
        const responseData = await sendRequest(true, url);
        setUploadedImages(responseData);
        return;
      } catch (err) {}
    };
    fetchImages();
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
            m: 2,
            p: 1,
          }}
        >
          {uploadedImages.length > 0
            ? uploadedImages.map((item) => (
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
              ))
            : "No images have been uploaded"}
        </Box>
      )}
    </>
  );
};

export default UploadedImages;
