import { useState, useCallback} from "react";
import { useAuthentication } from "../Components/Authentication/authenticationHook";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated} = useAuthentication()

  const sendRequest = useCallback(
    async (needsAuth, url, method = "GET", body = null, headers = {},  credentials = "include") => {
      
      if (needsAuth)
        await isAuthenticated()

      setLoading(true);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          credentials
        });
        
        const responseData = await response.json();
        console.log(responseData);

        if (!response.ok) {
            console.log(response);
            throw new Error(responseData.message);
        }
        setLoading(false);
        return responseData;

      } catch (err) {
        console.log(err);
        setError(err.message);
        setLoading(false);
        throw err;
      }
    },
    [isAuthenticated]
  );

  const clearError = () => {
    setError(null);
  };

  return { loading, error, sendRequest, clearError };
};
