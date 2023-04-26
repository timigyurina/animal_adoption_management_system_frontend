import { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import contactBackground from "../Images/bg-2.jpg";

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
        <div>Loading....</div>
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
                <Typography variant="h3" fontWeight={700} className="title">
                  About and Contact
                </Typography>
                <Typography variant="h6" className="subtitle">Contact support...
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} className="grid-item"></Grid>
            </Grid>
          </Box>
        </div>
      )}
    </>
  )
}

export default ContactInfo