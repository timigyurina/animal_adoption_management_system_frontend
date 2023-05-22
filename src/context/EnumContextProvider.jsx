import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { EnumContext } from "./EnumContext";
import Loader from "../Components/SharedElements/Loader";

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
    <Loader />
  ) : (
    <EnumContext.Provider value={{ enums }}>{children}</EnumContext.Provider>
  );
};

export default EnumContextProvider;
