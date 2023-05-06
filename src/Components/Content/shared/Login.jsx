import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useFetch } from "../../../hooks/useFetch";
import Loader from "../../SharedElements/Loader";
import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";
import BasicModal from "../../SharedElements/BasicModal";
import { isMinLength, validateEmail } from "../../../utils/validators";

import {
  TextField,
  Button,
  Input,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./FormElements.css";

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const { loading, error, sendRequest, clearError, success, clearSuccess } =
    useFetch();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        false,
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        "POST",
        JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
        {
          "Content-type": "application/json",
        }
      );
      console.log(responseData);
      clearInputs();
      auth.login();
    } catch (error) {}
  };

  const clearInputs = () => {
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleErrorModalClose = () => {
    clearInputs();
    clearError();
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <BasicModal message={error} onClose={handleErrorModalClose} />
      ) : (
        <div className="form-container">
          <form className="login-form" onSubmit={login}>
            <TextField
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              label="Email"
              placeholder="Enter your email"
              error={!validateEmail(loginEmail)}
              helperText={
                !validateEmail(loginEmail) && "Please enter your email"
              }
              variant="standard"
            />

            <FormControl
              variant="standard"
              error={!isMinLength(loginPassword, 1)}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                autoComplete="password"
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {!isMinLength(loginPassword, 1) && (
                <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1lvx8b5-MuiFormHelperText-root">
                  Please enter your password
                </p>
              )}
            </FormControl>

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
        </div>
      )}
      <SnackbarWithMessage
        message={success}
        severity="success"
        opened={success !== null}
        closed={clearSuccess}
      />
    </>
  );
};

export default LoginForm;
