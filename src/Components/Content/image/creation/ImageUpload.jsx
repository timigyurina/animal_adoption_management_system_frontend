import { useState, useEffect } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import SnackbarWithMessage from "../../../SharedElements/SnackbarWithMessage";
import LoadingSpinner from "../../../SharedElements/LoadingSpinner";

import {
  Button,
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import HelperText from "../../../SharedElements/HelperText";

const boxStyles = {
  minWidth: "90%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "2rem",
  marginBottom: 3,
};

const ImageUpload = ({ animalId, onImageWasUploaded, onCancel }) => {
  const { sendRequest, loading, error, clearError } = useFetch();
  const [imageToCreate, setImageToCreate] = useState({
    description: "",
    animalId: animalId,
    dateTaken: null,
    image: null,
  });
  const [createSuccess, setCreateSuccess] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();

  const handleImageChange = (e) => {
    setImageToCreate({ ...imageToCreate, image: e.target.files[0] });
  };

  const checkValidity = () => {
    return imageToCreate.description === "" ||
      imageToCreate.image === null ||
      imageToCreate.dateTaken === null
      ? false
      : true;
  };

  useEffect(() => {
    if (!imageToCreate.image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(imageToCreate.image);
  }, [imageToCreate.image]);

  const uploadImage = async (e) => {
    e.preventDefault();
    const adjustedImageToCreate = {
      ...imageToCreate,
      dateTaken: new Date(imageToCreate.dateTaken).toDateString(),
    };

    const formData = new FormData();
    Object.entries(adjustedImageToCreate).map(([key, value]) =>
      formData.append(key.toString(), value)
    );

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/image`;
      const createdImage = await sendRequest(true, url, "POST", formData, {
        Accept: "application/json",
      });
      setCreateSuccess(`Image has been successfully uploaded`);
      onImageWasUploaded(createdImage);
    } catch (error) {}
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
      {createSuccess && (
        <SnackbarWithMessage
          message={createSuccess}
          severity="success"
          opened={createSuccess !== null}
          closed={() => setCreateSuccess(null)}
        />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Box
          mt={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Upload new Image
          </Typography>

          <Card sx={{ minWidth: "90%" }}>
            <CardContent>
              <Box sx={boxStyles}>
                <Typography color="text.secondary">Description</Typography>

                <TextField
                  name="description"
                  size="small"
                  value={imageToCreate.description}
                  onChange={(e) =>
                    setImageToCreate({
                      ...imageToCreate,
                      description: e.target.value,
                    })
                  }
                  sx={{ maxWidth: "200px" }}
                />
              </Box>

              <Box sx={boxStyles}>
                <Typography color="text.secondary">Date taken</Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    inputFormat="YYYY/MM/DD"
                    value={imageToCreate.dateTaken}
                    onChange={(newValue) =>
                      setImageToCreate({
                        ...imageToCreate,
                        dateTaken: newValue,
                      })
                    }
                    slotProps={{
                      textField: { variant: "outlined", size: "small" },
                    }}
                    sx={{ maxWidth: "200px" }}
                  />
                </LocalizationProvider>
              </Box>

              {/* <input type="file" onChange={handleImageChange} /> */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  size="small"
                  variant="contained"
                  color="ternary"
                  component="label"
                >
                  Select Image
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                  />
                </Button>
                <div className="image-upload-preview">
                  {previewUrl && <img src={previewUrl} alt="Preview" />}
                  {!previewUrl && (
                    <Typography variant="caption">
                      Pick an image for preview
                    </Typography>
                  )}
                </div>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
      <HelperText
        falseValidator={
          imageToCreate.description === "" ||
          imageToCreate.image === null ||
          imageToCreate.dateTaken === null
        }
        helpMessage="All fields above are required "
      />
      <Box
        sx={{
          minWidth: 200,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={uploadImage}
          disabled={loading || !checkValidity()}
        >
          Create
        </Button>
        <Button
          onClick={onCancel}
          variant="contained"
          color="secondary"
          disabled={loading}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default ImageUpload;
