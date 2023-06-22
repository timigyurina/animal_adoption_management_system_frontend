import { useState } from "react";

import { Modal, Button, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreateAdoptionApplication from "./CreateAdoptionApplication";

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
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

const CreateAdoptionApplicationModal = ({
  animalId,
  animalName,
  onAdoptionApplicationWasCreated,
}) => {
  const [createdApplication, setCreatedApplication] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    createdApplication && onAdoptionApplicationWasCreated(createdApplication);
    setCreatedApplication(null)
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateAdoptionApplication
            animalId={animalId}
            animalName={animalName}
            onCreate={(application) => setCreatedApplication(application)}
            onCancel={handleClose}
          />
        </Box>
      </Modal>

      <Button
        onClick={handleOpen}
        color="primary"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Adopt me <FavoriteIcon />
      </Button>
    </>
  );
};

export default CreateAdoptionApplicationModal;
