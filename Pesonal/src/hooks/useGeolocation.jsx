import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
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
