import { useState, useEffect } from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";
import contactBackground from "../../Images/bg-2.jpg";
import Loader from "../UIElements/Loader";

const ContactInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const img = document.createElement("img");

    const onLoad = () => {
      setIsLoading(false);
    };
    img.src = contactBackground;
    img.addEventListener("load", onLoad);

    return () => {
      img.removeEventListener("load", onLoad);
    };
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="hero-box"
          style={{
            backgroundImage: `url(${contactBackground})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box>
            <Grid container spacing={6} className="grid-container">
              <Grid item xs={12} md={12} className="grid-item">
                <Paper
                  elevation={3}
                  sx={{
                    backgroundColor: "background.transparent",
                    padding: 2,
                    borderRadius: 5,
                  }}
                >
                  <Typography variant="h3" fontWeight={700} className="title">
                    About and Contact
                  </Typography>
                  <Typography variant="h6" className="subtitle">
                    Contact support...
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} className="grid-item"></Grid>
            </Grid>
          </Box>
        </div>
      )}
    </>
  );
};

export default ContactInfo;
