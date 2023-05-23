import { useState, useEffect } from "react";
import { useFetch } from "../../../../hooks/useFetch";

import AnimalDetailsAndUpdates from "./AnimalDetailsAndUpdates";
import SnackbarWithMessage from "../../../SharedElements/SnackbarWithMessage";
import LoadingSpinner from "../../../SharedElements/LoadingSpinner";

const AnimalDetailsWrapper = ({
  animalId,
  animalWasUpdated = false,
  adminMode,
}) => {
  const { loading, error, clearError, sendRequest } = useFetch();
  const [animalDetails, setAnimalDetails] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      const url = adminMode
        ? `${process.env.REACT_APP_BACKEND_URL}/api/animal/${animalId}/details`
        : `${process.env.REACT_APP_BACKEND_URL}/api/animal/${animalId}`;
      try {
        const responseData = await sendRequest(true, url);
        setAnimalDetails(responseData);
        return;
      } catch (err) {}
    };
    fetchAnimalDetails();
  }, [sendRequest, animalId, adminMode]);

  const handleUpdate = (property, newValue) => {
    setAnimalDetails((prevState) => ({
      ...prevState,
      [property]: newValue,
    }));
    animalWasUpdated(true);
    setUpdateSuccess("Animal was successfully updated");
  };

  const handleMultiUpdate = (propsAndNewValues) => {
    Object.entries(propsAndNewValues).forEach(([prop, newValue]) => {
      if (animalDetails[prop]) {
        setAnimalDetails((prevState) => ({
          ...prevState,
          [prop]: newValue,
        }));
      }
    });
    animalWasUpdated(true);
    setUpdateSuccess("Animal was successfully updated");
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
      {updateSuccess && (
        <SnackbarWithMessage
          message={updateSuccess}
          severity="success"
          opened={updateSuccess !== null}
          closed={() => setUpdateSuccess(null)}
        />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        animalDetails && (
          <AnimalDetailsAndUpdates
            animal={animalDetails}
            onAnimalWasUpdated={handleUpdate}
            onMultiUpdate={handleMultiUpdate}
            adminMode={adminMode}
          />
        )
      )}
    </>
  );
};

export default AnimalDetailsWrapper;
