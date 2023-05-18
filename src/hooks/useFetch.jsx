import { useState, useCallback } from "react";
import { useAuthentication } from "./useAuthentication";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { isAuthenticated } = useAuthentication();

  const sendRequest = useCallback(
    async (
      needsAuth,
      url,
      method = "GET",
      body = null,
      headers = {},
      credentials = "include"
    ) => {
      if (needsAuth) {
        await isAuthenticated();
      }

      setLoading(true);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          credentials,
        });

        const responseData = await response.json();
        if (!url.includes("/enum")) console.log(responseData);

        if (!response.ok) {
          console.log(response);
          const message = responseData.message
            ? responseData.message
            : responseData.ErrorMessage
            ? responseData.ErrorMessage
            : "Something went wrong, try again";
          throw new Error(message);
        }
        setLoading(false);
        if (responseData.message) {
          setSuccess(responseData.message);
        }

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
  const clearSuccess = () => {
    setSuccess(null);
  };

  return { loading, error, sendRequest, clearError, success, clearSuccess };
};
