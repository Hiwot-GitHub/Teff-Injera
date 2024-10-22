'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FCMContextType {
    fcmToken: string | null;
    setFcmToken: (token: string | null) => void; // Add setter
  }

  const initialContextValue: FCMContextType = {
    fcmToken: null,
    setFcmToken: () => {},
  };
  
const FCMContext = createContext<FCMContextType>(initialContextValue);


// Create a provider component
export const FCMProvider = ({ children }: { children: React.ReactNode }) => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  return (
    <FCMContext.Provider value={{fcmToken,  setFcmToken}}>
      {children}
    </FCMContext.Provider>
  );
};


export default FCMContext;
