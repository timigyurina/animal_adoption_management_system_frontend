import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import Loader from "../../SharedElements/Loader";
import {
  isMinLength,
  isValidPassword,
  isValidDate,
  isValidPhoneNumber,
  validateEmail,
} from "../../../utils/validators";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./FormElements.css";
import SnackbarWithMessage from "../../SharedElements/SnackbarWithMessage";
import BasicModal from "../../SharedElements/BasicModal";

const Register = () => {
  const { loading, error, sendRequest, clearError, success, clearSuccess } =
    useFetch();
  const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    password: "",
  };
  const [registrationForm, setRegistrationForm] = useState(emptyForm);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        false,
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
        "POST",
        JSON.stringify(registrationForm),
        {
          "Content-type": "application/json",
        }
      );
      console.log(responseData);
      clearInputs();
    } catch (error) {}
  };

  const emailInputHandler = (e) => {
    setRegistrationForm({ ...registrationForm, email: e.target.value });
    const isValid = validateEmail(e.target.value);
    setIsValidEmail(isValid);
  };

  const clearInputs = () => {
    setRegistrationForm(emptyForm);
    setIsValidEmail(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>
          <BasicModal message={error} onClose={() => clearError()} />
        </div>
      ) : (
        <div className="form-container">
          <form className="registration-form" onSubmit={register}>
            <TextField
              value={registrationForm.firstName}
              onChange={(e) =>
                setRegistrationForm({
                  ...registrationForm,
                  firstName: e.target.value,
                })
              }
              label="Firstname"
              placeholder="John"
              error={!isMinLength(registrationForm.firstName, 1)}
              helperText={
                !isMinLength(registrationForm.firstName, 1) &&
                "Firstname is required"
              }
              variant="standard"
            />
            <TextField
              value={registrationForm.lastName}
              onChange={(e) =>
                setRegistrationForm({
                  ...registrationForm,
                  lastName: e.target.value,
                })
              }
              label="Lastname"
              placeholder="Smith"
              error={!isMinLength(registrationForm.lastName, 1)}
              helperText={
                !isMinLength(registrationForm.lastName, 1) &&
                "Lastname is required"
              }
              variant="standard"
            />
            <TextField
              value={registrationForm.dateOfBirth}
              onChange={(e) =>
                setRegistrationForm({
                  ...registrationForm,
                  dateOfBirth: e.target.value,
                })
              }
              label="Date of birth"
              placeholder="1900-01-01"
              error={!isValidDate(registrationForm.dateOfBirth)}
              helperText={
                !isValidDate(registrationForm.dateOfBirth) &&
                "Please enter a valid date in the following format: yyyy-mm-dd"
              }
              variant="standard"
            />
            <TextField
              value={registrationForm.phoneNumber}
              onChange={(e) =>
                setRegistrationForm({
                  ...registrationForm,
                  phoneNumber: e.target.value,
                })
              }
              label="Phone number"
              placeholder="0036201112233"
              error={!isValidPhoneNumber(registrationForm.phoneNumber)}
              helperText={
                !isValidPhoneNumber(registrationForm.phoneNumber) &&
                "Phone number should contain only numbers"
              }
              variant="standard"
            />
            <TextField
              value={registrationForm.email}
              onChange={emailInputHandler}
              label="Email"
              placeholder="John"
              error={!isValidEmail}
              helperText={!isValidEmail && "Wrong email format"}
              variant="standard"
            />
            <FormControl
              variant="standard"
              error={!isValidPassword(registrationForm.password)}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                autoComplete="password"
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={registrationForm.password}
                onChange={(e) =>
                  setRegistrationForm({
                    ...registrationForm,
                    password: e.target.value,
                  })
                }
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
              {!isValidPassword(registrationForm.password) && (
                <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1lvx8b5-MuiFormHelperText-root">
                  Password should be min 6 characterslong and should contain an
                  uppercase letter, a number and a spec character
                </p>
              )}
            </FormControl>

            <Button
              type="submit"
              className="register-btn"
              disabled={
                !isMinLength(registrationForm.firstName, 1) ||
                !isMinLength(registrationForm.lastName, 1) ||
                !isValidDate(registrationForm.dateOfBirth) ||
                !isValidPhoneNumber(registrationForm.phoneNumber) ||
                !isValidPassword(registrationForm.password) ||
                !isValidEmail
              }
              variant="contained"
            >
              REGISTER
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

export default Register;
