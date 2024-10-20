import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, Messaging } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';

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

  useEffect(() => {
    const getFCMToken = async () => {
      try {
        const token = await getToken(messaging as Messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        if (token) {
          console.log('FCM Token:', token);
          setFcmToken(token); // Set the FCM token in state
        } else {
          console.error('No FCM token received');
        }
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    };

    getFCMToken();
  }, []);

  return (
    <FCMContext.Provider value={{fcmToken,  setFcmToken}}>
      {children}
    </FCMContext.Provider>
  );
};


export default FCMContext;
