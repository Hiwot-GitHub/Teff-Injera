'use client';

import { useEffect } from 'react';
import { getToken, Messaging } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';
import axios from 'axios';

const FirebaseMessaging = () => {
  useEffect(() => {
    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered:', registration);

        // Now check for notification permissions and request token
        await requestNotificationPermission(registration);
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
                console.log('FCM Token:', token);
                // Optionally, send the token to your server
                await axios.post('/api/notification', {
                  token,
                  title: 'New Order Received',
                  body: 'A new order has just been placed.',
                });
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
