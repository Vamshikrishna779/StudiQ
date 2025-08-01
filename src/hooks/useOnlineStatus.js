import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineWarning, setShowOfflineWarning] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineWarning(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineWarning(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check periodically for Supabase connection
    const interval = setInterval(() => {
      if (!navigator.onLine) {
        handleOffline();
      } else {
        fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' })
          .then(() => handleOnline())
          .catch(() => handleOffline());
      }
    }, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return { 
    isOnline, 
    showOfflineWarning,
    dismissWarning: () => setShowOfflineWarning(false) 
  };
}