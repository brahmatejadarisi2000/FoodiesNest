import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState({ latitude: 16.304761, longitude: 80.430855 });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if geolocation is available in the browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        function (error) {
          setError(error);
        }
      );
    } else {
      setError(new Error('Geolocation is not available in this browser.'));
    }
  }, []);

  return { location, error };
}

export default useGeolocation;
