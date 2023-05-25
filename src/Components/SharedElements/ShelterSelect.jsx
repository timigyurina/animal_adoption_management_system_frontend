import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import SnackbarWithMessage from "./SnackbarWithMessage";
import {
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const ShelterSelect = ({ value, onChange, small, withDefault }) => {
  const { sendRequest, loading, error, clearError } = useFetch();
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/shelter/getAll`;
    const getAllShelters = async () => {
      try {
        const responseData = await sendRequest(true, url);
        setShelters(responseData);
        return;
      } catch (err) {}
    };
    getAllShelters();
  }, [sendRequest]);

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
      {loading ? (
        <CircularProgress />
      ) : shelters ? (
        <FormControl
          sx={{
            m: 1,
            minWidth: 200,
          }}
          size={small && "small"}
        >
          <InputLabel>Shelter</InputLabel>
          <Select name="shelterId" value={value} onChange={onChange}>
            {withDefault && <MenuItem value={""}>Select a Shelter</MenuItem>}
            {shelters.map((s) => (
              <MenuItem value={s.id} key={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        "No Shelters to choose from"
      )}
    </>
  );
};

export default ShelterSelect;
