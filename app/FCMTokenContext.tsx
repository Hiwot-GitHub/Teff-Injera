'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FCMContextType {
    fcmToken: string | null;
    setFcmToken: (token: string | null) => void; // Add setter
  }

  const initialContextValue: FCMContextType = {
    fcmToken: null as string | null,
    setFcmToken: () => {},
  };
  
const FCMContext = createContext<FCMContextType>(initialContextValue);


// Create a provider component
export const FCMProvider = ({ children }: { children: React.ReactNode }) => {
  const [fcmToken, setFcmTokenState] = useState<string | null>(null);

  const setFcmToken = (token: string | null) => {
    setFcmTokenState(token);
    if (token) {
        localStorage.setItem('fcmToken', token); // Store in localStorage
      } else {
        localStorage.removeItem('fcmToken'); // Clear from localStorage if needed
      }
  };

    // On initial load, check if an FCM token exists in localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem('fcmToken');
        if (savedToken) {
          setFcmTokenState(savedToken); // Set the saved token
        }
      }, []);

  return (
    <FCMContext.Provider value={{fcmToken,  setFcmToken}}>
      {children}
    </FCMContext.Provider>
  );
};


export default FCMContext;
