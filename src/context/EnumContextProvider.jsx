import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { EnumContext } from "./EnumContext";
import Loader from "../Components/SharedElements/Loader";
import SnackbarWithMessage from "../Components/SharedElements/SnackbarWithMessage";

const EnumContextProvider = ({ children }) => {
  const { loading, sendRequest, error, clearError } = useFetch();
  const [enums, setEnums] = useState({});

  useEffect(() => {
    const fetchAllEnums = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/enum/`;
      try {
        const responseData = await sendRequest(false, url);
        setEnums(responseData);
        return;
      } catch (err) {}
    };

    fetchAllEnums();
  }, [sendRequest]);

  return loading ? (
    <Loader />
  ) : !enums.gender ? (
    <>
      <h3>Could not load application, please contact support</h3>
      <SnackbarWithMessage
        message={error}
        severity="error"
        opened={error !== null}
        closed={clearError}
      />
    </>
  ) : (
    <EnumContext.Provider value={{ enums }}>{children}</EnumContext.Provider>
  );
};

export default EnumContextProvider;
