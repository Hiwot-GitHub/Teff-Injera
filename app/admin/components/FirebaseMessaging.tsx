'use client';

import { useContext, useState } from 'react';
import { getToken, Messaging } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';
import FCMContext from '@/app/FCMTokenContext';
import { Box, Button } from '@radix-ui/themes';

const FirebaseMessaging = () => {
  const { addFcmToken } = useContext(FCMContext);
  const [isGranted, setIsGranted] = useState(Notification.permission === 'granted');
  
    const registerServiceWorker = async () => {
      try {
        if ( 'serviceWorker' in navigator){
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered:', registration);

        // Now check for notification permissions and request token
        await requestNotificationPermission(registration);
      } else {
        console.log('Service workers are not supported in this environment.');
       }
      } catch (error) { 
        console.error('Error registering Service Worker:', error);
      }
    };

    const requestNotificationPermission = async (registration: ServiceWorkerRegistration) => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setIsGranted(true);
          console.log('Notification permission granted.');

            try {
              const token = await getToken(messaging as Messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
                serviceWorkerRegistration: registration, // Make sure to pass the registration
              });

              if (token) {
                console.log('type of useContext(FCMContext):', typeof useContext(FCMContext));
                console.log('type of addFcmToken:', typeof addFcmToken);
                addFcmToken(token);
                console.log('FCM Token;', token);
              } else {
                console.error('No FCM token received');
              }
            } catch (error) {
              console.error('Error getting FCM token:', error);
            }
        } else {
          console.log('Notification permission denied.');
          setIsGranted(false);
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };
  
  return (
    <Box className='p-4'>
      {!isGranted && (<Button onClick={registerServiceWorker}>Enable Notifications</Button>) }
    </Box>
  );
};

export default FirebaseMessaging;
