import React, { useState, useEffect } from 'react';

const useFetchApiData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.log(`Http status error ${response.status}`);
        }
        const jsonRes = await response.json();
        setData(jsonRes);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};
export default useFetchApiData;
