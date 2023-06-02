import { useState } from "react";
import ImageUpload from "./ImageUpload";

import { Modal, Button, Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ImageIcon from "@mui/icons-material/Image";

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent:"center",
  alignItems: "center",
  gap: "15px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid black",
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
};

const ImageUploadModal = ({ animalId, onImageWasUploaded }) => {
  const [open, setOpen] = useState(false);
  const [createdImage, setCreatedImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    createdImage && onImageWasUploaded(createdImage);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Button
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: (style.p * 8) / 2,
              right: (style.p * 8) / 2,
            }}
          >
            <HighlightOffIcon
              sx={{ color: "ternary.dark", fontSize: "2rem" }}
            />
          </Button>
          <ImageUpload
            animalId={animalId}
            onImageWasUploaded={(createdImage) => setCreatedImage(createdImage)}
            onCancel={handleClose}
          />
        </Box>
      </Modal>

      <Button
        onClick={handleOpen}
        color="secondary"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Upload <ImageIcon />
      </Button>
    </>
  );
};
export default ImageUploadModal;
