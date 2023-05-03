import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/AuthContext";
// import { useHttpClient } from "../../hoks/useHttpClient";
import Loader from "../UIElements/Loader";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const auth = useContext(AuthContext);
  // const { loading, error, sendRequest, clearError } = useHttpClient();

  const isMinLength = (value, min) => {
    let isValid = true;
    isValid = value.trim().length >= min;
    return isValid;
  };

  // const login = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const responseData = await sendRequest(
  //       false,
  //       `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
  //       "POST",
  //       JSON.stringify({
  //         email: loginEmail,
  //         password: loginPassword,
  //       }),
  //       {
  //         "Content-type": "application/json",
  //       }
  //     );
  //     console.log(responseData);
  //     auth.login();
  //   } catch (error) {}
  // };
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        setLoading(false);
        return;
      }
      clearInputs();
      setLoading(false);
      auth.login();
    } catch (err) {
      clearInputs();
      setError("Server seems to be down, contact support");
      setLoading(false);
    }
  };

  const clearInputs = () => {
    setLoginEmail("");
    setLoginPassword("");
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>
          {error} <button onClick={clearError}>OK</button>
        </div>
      ) : (
        <form className="login-form" onSubmit={login}>
          <TextField
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="username"
            label="Username"
            placeholder="Enter your username"
            error={!isMinLength(loginEmail, 3)}
            helperText={
              !isMinLength(loginEmail, 3) && "Please enter your username"
            }
            variant="standard"
          />

          <TextField
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="userpassword"
            label="Password"
            placeholder="Enter your password"
            error={!isMinLength(loginPassword, 6)}
            helperText={
              !isMinLength(loginPassword, 6) && "Please enter your password"
            }
            variant="standard"
          />
          <Button
            type="submit"
            className="login-btn"
            disabled={
              !isMinLength(loginEmail, 3) || !isMinLength(loginPassword, 6)
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
