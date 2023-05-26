import { useState } from "react";
import CreateAnimalForm from "./CreateAnimalForm";

import { Modal, Button, Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

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

const CreateAnimalModal = ({ onAnimalWasCreated }) => {
  const [open, setOpen] = useState(false);
  const [createdAnimal, setCreatedAnimal] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    createdAnimal && onAnimalWasCreated(createdAnimal);
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
          <CreateAnimalForm
            onAnimalWasCreated={(createdAnimal) =>
              setCreatedAnimal(createdAnimal)
            }
            onCancel={() => setOpen(false)}
          />
        </Box>
      </Modal>

      <Button
        onClick={handleOpen}
        color="ternary"
        variant="contained"
        sx={{ m: 2 }}
      >
        Add new ANimal
      </Button>
    </>
  );
};

export default CreateAnimalModal;
