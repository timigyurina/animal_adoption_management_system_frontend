import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  px: 5,
  py: 2,
  b: 2,
  borderRadius: "10px",
  width: "fit-content",
  maxWidth: 500,
  height: "fit-content",
  maxHeight: "50vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflowY: "auto",
};

const BasicModal = ({ message, onClose }) => {
  const [open, ] = useState(true);

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>
          <Button onClick={onClose} variant="contained" color="secondary">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
