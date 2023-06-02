import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";

import SnackbarWithMessage from "./SnackbarWithMessage";
import {
  Select,
  CircularProgress,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";

const BreedSelect = ({ value, onChange, small, withDefault }) => {
  const { sendRequest, loading, error, clearError } = useFetch();
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/animalBreed/getAll`;
    const getAllBreeds = async () => {
      try {
        const responseData = await sendRequest(true, url);
        setBreeds(responseData);
        return;
      } catch (err) {}
    };
    getAllBreeds();
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
      ) : breeds ? (
        <FormControl
          sx={{
            m: 1,
            minWidth: 200,
          }}
          size={small && "small"}
        >
          <InputLabel>Breed</InputLabel>
          <Select name="breedId" value={value} onChange={onChange}>
            {withDefault && <MenuItem value={""}>Select a Breed</MenuItem>}
            {breeds.map((b) => (
              <MenuItem value={b.id} key={b.id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        "No Breeds to choose from"
      )}
    </>
  );
};

export default BreedSelect;
