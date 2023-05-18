import { useState } from "react";

import UpdateShelterContactInfoForm from "./UpdateShelterContactInfoForm";
import  ShelterDetails from "./ShelterDetails";

import { Modal, Button, Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid black",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

const ShelterDetailsModal = ({
  shelter,
  onShelterWasUpdated,
  updateContactInfoMode,
}) => {
  const [open, setOpen] = useState(false);
  const [detailsAreShown, setDetailsAreShown] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleShelterPaymentUpdate = async (paymentMethod) => {
    const response = await fetch(`/api/Shelter/status/${shelter.id}`, {
      method: "PUT",
      body: JSON.stringify({ paymentMethod: paymentMethod }),
      headers: { "Content-Type": "application/json" },
    });
    const responseData = await response.json();

    onShelterWasUpdated(responseData);
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
            <HighlightOffIcon sx={{ color: "brown", fontSize: "2rem" }} />
          </Button>

          {updateContactInfoMode && (
            <UpdateShelterContactInfoForm
              onCancel={handleClose}
              onSave={handleShelterPaymentUpdate}
            />
          )}

          {updateContactInfoMode ? (
            <>
              <Button
                variant="outlined"
                onClick={() => setDetailsAreShown(!detailsAreShown)}
              >
                {detailsAreShown ? "Hide" : "Show"} details
                {detailsAreShown ? (
                  <VisibilityOffIcon sx={{ ml: 2 }} />
                ) : (
                  <InfoIcon sx={{ ml: 2 }} />
                )}
              </Button>
              {detailsAreShown && <ShelterDetails shelterId={shelter.id} />}
            </>
          ) : (
            <ShelterDetails shelterId={shelter.id} />
          )}
        </Box>
      </Modal>

      <Button variant="text" onClick={handleOpen}>
        {updateContactInfoMode ? <EditIcon /> : <InfoIcon />}
      </Button>
    </>
  );
};

export default ShelterDetailsModal;
