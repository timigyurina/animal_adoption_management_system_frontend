import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Button, Box, Paper } from "@mui/material";
import homeBackground from "../../Images/bg-1.jpg";
import Loader from "../UIElements/Loader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const img = document.createElement("img");

    const onLoad = () => {
      setIsLoading(false);
    };
    img.src = homeBackground;
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
            backgroundImage: `url(${homeBackground})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box>
            <Grid container spacing={6} className="grid-container">
              <Grid item xs={12} md={9} className="grid-item">
                <Paper
                  elevation={3}
                  sx={{
                    backgroundColor: "background.transparent",
                    padding: 2,
                    borderRadius: 5,
                  }}
                >
                  <Typography variant="h3" fontWeight={700} className="title">
                    Welcome!
                  </Typography>
                  <Typography variant="h6" className="subtitle">
                    We're here to help pets find their forever homes. Adopting
                    an animal is a rewarding experience that not only brings a
                    new furry friend into your life but also makes a difference
                    in the life of an animal in need. We have a variety of
                    animals available for adoption, and you can search based on
                    breed, age, size, and shelter. Let's make a difference in
                    the lives of animals in need.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} className="grid-item">
                <Button
                component={Link}
                  to="/contact"
                  variant="contained"
                  color="ternary"
                  sx={{ width: "200px", fontSize: "16px" }}
                >
                  More info
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
    </>
  );
};

export default Home;
