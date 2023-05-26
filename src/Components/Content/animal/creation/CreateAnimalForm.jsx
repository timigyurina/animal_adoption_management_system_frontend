import { useContext, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import { EnumContext } from "../../../../context/EnumContext";
import { AuthContext } from "../../../../context/AuthContext";
import SelectValues from "../../../SharedElements/SelectValues";
import BreedSelect from "../../../SharedElements/BreedSelect";
import ShelterSelect from "../../../SharedElements/ShelterSelect";
import LoadingSpinner from "../../../SharedElements/LoadingSpinner";
import SnackbarWithMessage from "../../../SharedElements/SnackbarWithMessage";
import HelperText from "../../../SharedElements/HelperText";

import {
  Button,
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const boxStyles = {
  minWidth: "90%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  marginBottom: 1,
};

const CreateAnimalForm = ({ onAnimalWasCreated, onCancel }) => {
  const { sendRequest, loading, error, clearError } = useFetch();
  const { animalColor, animalSize, animalType, gender } =
    useContext(EnumContext).enums;
  const auth = useContext(AuthContext);
  const [createSuccess, setCreateSuccess] = useState(null);

  const [animalToCreate, setAnimalToCreate] = useState({
    name: "",
    type: "",
    size: "",
    status: "WaitingForAdoption",
    gender: "",
    color: "",
    isSterilised: false,
    sterilisationDate: null,
    birthDate: null,
    notes: "",
    breedId: "",
  });

  const [connectionToCreate, setConnectionToCreate] = useState({
    enrollmentDate: null,
    // exitDate: null,
    shelterId: "",
  });

  const createAnimal = async () => {
    let createdAnimal;
    let createdConnection;
    const adjustedAnimalToCreate = {
      ...animalToCreate,
      birthDate: addOneDay(animalToCreate.birthDate),
      sterilisationDate: addOneDay(animalToCreate.sterilisationDate),
    };
    const adjustedConnectionToCreate = {
      shelterId:
        connectionToCreate.shelterId === "" ? -1 : connectionToCreate.shelterId,
      enrollmentDate: addOneDay(connectionToCreate.enrollmentDate),
      // exitDate:
      //   connectionToCreate.exitDate !== null ?
      //   addOneDay(connectionToCreate.exitDate) : null,
    };

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/animal`;
      createdAnimal = await sendRequest(
        true,
        url,
        "POST",
        JSON.stringify(adjustedAnimalToCreate),
        {
          "Content-type": "application/json",
        }
      );
    } catch (error) {}

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/animal/${createdAnimal.id}/addShelterConnection`;
      createdConnection = await sendRequest(
        true,
        url,
        "POST",
        JSON.stringify(adjustedConnectionToCreate),
        {
          "Content-type": "application/json",
        }
      );
    } catch (error) {}

    setCreateSuccess(
      `${animalToCreate.name} has been successfully created and added to ${createdConnection.shelter.name}`
    );
    onAnimalWasCreated(createdAnimal);
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setAnimalToCreate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) =>
    setAnimalToCreate({
      ...animalToCreate,
      [e.target.name]: e.target.checked,
    });

  const addOneDay = (date) => {
    return new Date(new Date(date).setDate(new Date(date).getDate() + 1));
  };

  const checkValidity = () => {
    const requiredFieldsAreValid =
      animalToCreate.name !== "" &&
      animalToCreate.type !== "" &&
      animalToCreate.size !== "" &&
      // animalToCreate.status !== "" &&
      animalToCreate.gender !== "" &&
      animalToCreate.color !== "" &&
      animalToCreate.breedId !== "" &&
      animalToCreate.birthDate !== null &&
      connectionToCreate.enrollmentDate !== null;

    let sterilisationDateRequirementFulfilled = true;
    if (animalToCreate.isSterilised) {
      sterilisationDateRequirementFulfilled =
        animalToCreate.sterilisationDate !== null;
    }
    let shelterIdRequirementFulfilled = true;
    if (auth.userRoles.includes("Administrator")) {
      shelterIdRequirementFulfilled = connectionToCreate.shelterId !== "";
    }
    // let exitDateRequirementFulfilled = true;
    // if (animalToCreate.status !== "WaitingForAdoption") {
    //   exitDateRequirementFulfilled =
    //     connectionToCreate.exitDate !== null &&
    //     connectionToCreate.enrollmentDate <= connectionToCreate.exitDate;
    // }
    return (
      requiredFieldsAreValid &&
      sterilisationDateRequirementFulfilled &&
      shelterIdRequirementFulfilled
      // exitDateRequirementFulfilled
    );
  };

  return (
    <>
      {error && (
        <SnackbarWithMessage
          message={error}
          severity="error"
          opened={error !== null}
          closed={clearError}
        />
      )}
      {createSuccess && (
        <SnackbarWithMessage
          message={createSuccess}
          severity="success"
          opened={createSuccess !== null}
          closed={() => setCreateSuccess(null)}
        />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Box
          mt={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add a new Animal
          </Typography>

          <Card sx={{ minWidth: "90%" }}>
            <CardContent>
              <Box sx={boxStyles}>
                <Typography color="text.secondary">Name</Typography>

                <TextField
                  name="name"
                  size="small"
                  value={animalToCreate.name}
                  onChange={handleValueChange}
                  sx={{ maxWidth: "200px" }}
                />
              </Box>

              <Box sx={boxStyles}>
                <Typography color="text.secondary">Type</Typography>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <SelectValues
                    choosableItems={animalType}
                    value={animalToCreate.type}
                    onChange={handleValueChange}
                    label="Type"
                    selectName="type"
                    small
                  />
                )}
              </Box>

              <Box sx={boxStyles}>
                <Typography color="text.secondary">Size</Typography>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <SelectValues
                    choosableItems={animalSize}
                    value={animalToCreate.size}
                    onChange={handleValueChange}
                    label="Size"
                    selectName="size"
                    small
                  />
                )}
              </Box>

              {/* <Box sx={boxStyles}>
                <Typography color="text.secondary">Status</Typography>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <SelectValues
                    choosableItems={animalStatus}
                    value={animalToCreate.status}
                    onChange={handleValueChange}
                    label="Status"
                    selectName="status"
                    small
                  />
                )}
              </Box> */}

              <Box sx={boxStyles}>
                <Typography color="text.secondary">Gender</Typography>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <SelectValues
                    choosableItems={gender}
                    value={animalToCreate.gender}
                    onChange={handleValueChange}
                    label="Gender"
                    selectName="gender"
                    small
                  />
                )}
              </Box>

              <Box sx={boxStyles}>
                <Typography color="text.secondary">Color</Typography>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <SelectValues
                    choosableItems={animalColor}
                    value={animalToCreate.color}
                    onChange={handleValueChange}
                    label="Color"
                    selectName="color"
                    small
                  />
                )}
              </Box>

              <Box sx={boxStyles}>
                <Typography color="text.secondary">Breed</Typography>
                <BreedSelect
                  value={animalToCreate.breedId}
                  onChange={(e) =>
                    setAnimalToCreate({
                      ...animalToCreate,
                      breedId: e.target.value,
                    })
                  }
                  small
                />
              </Box>

              <Box sx={boxStyles}>
                <Typography color="text.secondary">Birthday</Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Birthday"
                    inputFormat="YYYY/MM/DD"
                    value={animalToCreate.birthDate}
                    onChange={(newValue) =>
                      setAnimalToCreate({
                        ...animalToCreate,
                        birthDate: newValue,
                      })
                    }
                    slotProps={{
                      textField: { variant: "outlined", size: "small" },
                    }}
                    sx={{ maxWidth: "200px" }}
                  />
                </LocalizationProvider>
              </Box>

              <HelperText
                falseValidator={
                  animalToCreate.name === "" ||
                  animalToCreate.type === "" ||
                  animalToCreate.size === "" ||
                  // animalToCreate.status === "" ||
                  animalToCreate.gender === "" ||
                  animalToCreate.color === "" ||
                  animalToCreate.breedId === "" ||
                  animalToCreate.birthDate === null
                }
                helpMessage="All fields above are required "
              />

              <Box sx={boxStyles}>
                <Typography color="text.secondary">Notes</Typography>
                <TextField
                  name="notes"
                  size="small"
                  value={animalToCreate.notes}
                  onChange={handleValueChange}
                  sx={{ maxWidth: "200px", mb: 1 }}
                  multiline
                  maxRows={3}
                />
              </Box>

              <FormGroup sx={{ my: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={animalToCreate.isSterilised}
                      onChange={handleCheckboxChange}
                      name="isSterilised"
                    />
                  }
                  label="This Animal is sterilised"
                />
              </FormGroup>
              {animalToCreate.isSterilised && (
                <Box sx={boxStyles}>
                  <Typography sx={{ ml: 2 }} color="text.secondary">
                    Sterilisation date
                  </Typography>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Sterilisation date"
                      inputFormat="YYYY/MM/DD"
                      defaultValue={dayjs("2020-01-01")}
                      value={animalToCreate.sterilisationDate}
                      onChange={(newValue) =>
                        setAnimalToCreate({
                          ...animalToCreate,
                          sterilisationDate: newValue,
                        })
                      }
                      slotProps={{
                        textField: { variant: "outlined", size: "small" },
                      }}
                      sx={{ maxWidth: "200px" }}
                    />
                  </LocalizationProvider>
                </Box>
              )}
              <HelperText
                falseValidator={
                  animalToCreate.isSterilised &&
                  animalToCreate.sterilisationDate === null
                }
                helpMessage="Sterilisation date is required for sterilised Animal"
              />

              <Box
                sx={{
                  minWidth: "90%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 1,
                  mt: 3,
                  p: 1,
                  border: "solid 2px",
                  borderColor: "ternary.main",
                  borderRadius: "16px",
                }}
              >
                <Box sx={boxStyles}>
                  <Typography sx={{ ml: 2 }} color="text.secondary">
                    Date of enrollment
                  </Typography>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Enrollment date"
                      inputFormat="YYYY/MM/DD"
                      defaultValue={dayjs("2020-01-01")}
                      value={connectionToCreate.enrollmentDate}
                      onChange={(newValue) =>
                        setConnectionToCreate({
                          ...connectionToCreate,
                          enrollmentDate: newValue,
                        })
                      }
                      slotProps={{
                        textField: { variant: "outlined", size: "small" },
                      }}
                      sx={{ maxWidth: "200px" }}
                    />
                  </LocalizationProvider>
                </Box>
                <HelperText
                  falseValidator={connectionToCreate.enrollmentDate === null}
                  helpMessage="Enrollment date is required "
                />

                {/* <Box sx={boxStyles}>
                  <Typography sx={{ ml: 2 }} color="text.secondary">
                    Date of finding home
                  </Typography>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Exit date"
                      inputFormat="YYYY/MM/DD"
                      defaultValue={dayjs("2020-01-01")}
                      value={connectionToCreate.exitDate}
                      onChange={(newValue) =>
                        setConnectionToCreate({
                          ...connectionToCreate,
                          exitDate: newValue,
                        })
                      }
                      slotProps={{
                        textField: { variant: "outlined", size: "small" },
                      }}
                      sx={{ maxWidth: "200px" }}
                    />
                  </LocalizationProvider>
                </Box>
                <HelperText
                  falseValidator={
                    connectionToCreate.enrollmentDate !== null &&
                    connectionToCreate.exitDate !== null &&
                    connectionToCreate.enrollmentDate >
                      connectionToCreate.exitDate
                  }
                  helpMessage="Enrollment date should be earlier than exit date"
                /> */}

                {auth.userRoles.includes("Administrator") && (
                  <Box sx={boxStyles}>
                    <Typography sx={{ ml: 2 }} color="text.secondary">
                      Shelter
                    </Typography>
                    <ShelterSelect
                      value={connectionToCreate.shelterId}
                      onChange={(e) =>
                        setConnectionToCreate({
                          ...connectionToCreate,
                          shelterId: e.target.value,
                        })
                      }
                      small
                    />
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      <Box
        sx={{
          minWidth: 200,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "0.5rem",
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={createAnimal}
          disabled={loading || !checkValidity()}
        >
          Create
        </Button>
        <Button
          onClick={onCancel}
          variant="contained"
          color="secondary"
          disabled={loading}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default CreateAnimalForm;
