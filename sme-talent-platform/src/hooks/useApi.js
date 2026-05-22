import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stringify options to stabilise the dependency
  const optionsKey = JSON.stringify(options);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.get(url, JSON.parse(optionsKey));
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, optionsKey]);

  useEffect(() => {
    if (url) fetchData();
  }, [fetchData, url]);

  return { data, loading, error, refetch: fetchData };
};

export const usePostApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (url, data, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      return await api.post(url, data, options);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error };
};
