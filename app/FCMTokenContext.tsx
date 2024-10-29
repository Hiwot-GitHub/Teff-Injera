'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FCMContextType {
    fcmTokens: string[],
    addFcmToken: (token: string ) => void; // Add setter
  }

  const initialContextValue: FCMContextType = {
    fcmTokens: [],
    addFcmToken: () => {},
  };
  
const FCMContext = createContext<FCMContextType>(initialContextValue);


// Create a provider component
export const FCMProvider = ({ children }: { children: React.ReactNode }) => {
  const [fcmTokens, setFcmTokens] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined'){
        const storedTokens = localStorage.getItem('adminTokens');
        if (storedTokens){
            setFcmTokens(JSON.parse(storedTokens));
        }  
    }
   
  },[]);

  const addFcmToken = (token: string) => {
    setFcmTokens((prevTokens) => {
        if (!prevTokens.includes(token)){
            const updatedTokens = [...prevTokens, token];
            localStorage.setItem('adminTokens', JSON.stringify(updatedTokens)); 
            return updatedTokens;
        };
        return prevTokens;
    });
};

  return (
    <FCMContext.Provider value={{fcmTokens,  addFcmToken}}>
      {children}
    </FCMContext.Provider>
  );
};


export default FCMContext;
