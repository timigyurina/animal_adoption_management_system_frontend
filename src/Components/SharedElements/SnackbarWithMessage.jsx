import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarWithMessage = ({ opened, message, closed, severity }) => {
  const [, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closed();
    setOpen(false);
  };

  return (
    <Snackbar open={opened} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarWithMessage;
