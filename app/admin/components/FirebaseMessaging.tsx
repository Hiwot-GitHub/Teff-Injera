'use client';

import { useContext, useEffect } from 'react';
import { getToken, Messaging } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';
import axios from 'axios';
import FCMContext from '@/app/FCMTokenContext';

const FirebaseMessaging = () => {
  const { setFcmToken } = useContext(FCMContext);
  useEffect(() => {
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
          console.log('Notification permission granted.');

          // Ensure messaging is initialized
          if (messaging) {
            try {
              const token = await getToken(messaging as Messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
                serviceWorkerRegistration: registration, // Make sure to pass the registration
              });

              if (token) {
                setFcmToken(token);
              } else {
                console.error('No FCM token received');
              }
            } catch (error) {
              console.error('Error getting FCM token:', error);
            }
          } else {
            console.error('Messaging not initialized.');
          }
        } else {
          console.log('Notification permission denied.');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    // Only execute the logic in a browser environment (client-side)
    if (typeof window !== 'undefined') {
      registerServiceWorker();
    } else {
      console.log('Window is undefined, skipping service worker registration.');
    }
  }, []);

  return null; // No UI is needed for this component
};

export default FirebaseMessaging;
