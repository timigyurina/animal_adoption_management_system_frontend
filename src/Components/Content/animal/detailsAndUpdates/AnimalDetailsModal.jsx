import { useState } from "react";

import { Modal, Button, Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AnimalDetailsWrapper from "./AnimalDetailsWrapper";

const style = {
  display: "flex",
  flexDirection: "column",
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
  height: "90vh",
  overflowY: "auto",
};

const AnimalDetailsModal = ({ animalId, onAnimalWasUpdated, adminMode }) => {
  const [open, setOpen] = useState(false);
  const [animalWasUpdated, setAnimalWasUpdated] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    //only close modal if update actually happened - the AnimalDetailsWrapperchild component informs this (AnimalDetailsModal) component about this
    animalWasUpdated && onAnimalWasUpdated(animalId);
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
            <HighlightOffIcon sx={{ color: "ternary.dark", fontSize: "2rem" }} />
          </Button>
          <AnimalDetailsWrapper
            animalId={animalId}
            animalWasUpdated={setAnimalWasUpdated}
            adminMode={adminMode}
          />
        </Box>
      </Modal>

      <Button onClick={handleOpen} color="ternary" variant="contained">
        Details {adminMode && "and update"}
      </Button>
    </>
  );
};

export default AnimalDetailsModal;
