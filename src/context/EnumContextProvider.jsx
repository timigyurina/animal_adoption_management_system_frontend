import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { EnumContext } from "./EnumContext";
import { CircularProgress } from "@mui/material";

const EnumContextProvider = ({ children }) => {
  const { loading, sendRequest } = useFetch();
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

  return loading || !enums.gender ? (
    <CircularProgress />
  ) : (
    <EnumContext.Provider value={{ enums }}>{children}</EnumContext.Provider>
  );
};

export default EnumContextProvider;
