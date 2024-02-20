import { useState, useEffect } from 'react';

export function useFetch(url, fixture = null) {
  const [data, setData] = useState(null); // Initialize data as null to indicate loading
  const fetchData = async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const dataJson = await response.json();
      setData(dataJson);
    } catch (error) {
      setData(fixture);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return data;
}

export default useFetch;
