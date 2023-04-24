import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "./Authentication/AuthContext";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const auth = useContext(AuthContext);

  const isMinLength = (value, min) => {
    let isValid = true;
    isValid = value.trim().length >= min;
    return isValid;
  };

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        clearInputs();
        setError("Unauthenticated");
        setIsLoading(false);
        return error;
      }
      clearInputs();
      setIsLoading(false);
      auth.login();
      
    } catch (err) {
      clearInputs();
      setIsLoading(false);
      console.log(err);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const clearInputs = () => {
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <>
      {isLoading ? (
        <div className="center">
          Loading...{/* <LoadingSpinner asOverlay /> */}
        </div>
      ) : error ? (
        <div>
          {error} <button onClick={clearError}>Try again</button>
        </div>
      ) : (
        <form className="login-form" onSubmit={login}>
          <TextField
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="username"
            label="Username"
            placeholder="Enter your username"
            error={!isMinLength(loginEmail, 1)}
            helperText={
              !isMinLength(loginEmail, 1) && "Please enter your username"
            }
            variant="standard"
          />

          <TextField
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="userpassword"
            label="Password"
            placeholder="Enter your password"
            error={!isMinLength(loginPassword, 1)}
            helperText={
              !isMinLength(loginPassword, 1) && "Please enter your password"
            }
            variant="standard"
          />
          <Button
            type="submit"
            className="login-btn"
            disabled={
              !isMinLength(loginEmail, 1) || !isMinLength(loginPassword, 1)
            }
            variant="contained"
          >
            LOGIN
          </Button>
        </form>
      )}
    </>
  );
};

export default LoginForm;
