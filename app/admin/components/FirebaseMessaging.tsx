'use client';

import { useEffect } from 'react';
import { getToken, Messaging } from 'firebase/messaging';
import { messaging } from '@/lib/firebase'; // Ensure this is correctly importing the messaging instance
import axios from 'axios';

const FirebaseMessaging = () => {
  useEffect(() => {
    // Ensure the code runs only on the client-side
    if (typeof window !== "undefined" && messaging !== null) {
      // Function to register service worker and request notification permission
      const registerServiceWorkerAndRequestPermission = async () => {
        try {
          // Register service worker for Firebase Messaging
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log('Service Worker registered successfully:', registration);

          // Request notification permission
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            console.log('Notification permission granted.');

            // Get Firebase Cloud Messaging token
            const token = await getToken(messaging as Messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
              serviceWorkerRegistration: registration, // Pass service worker registration
            });

            console.log('FCM Token:', token);
            
            // Optionally, send the token to your server
            await axios.post('/api/notification', {
              token,
              title: 'New Order Received',
              body: 'A new order has just been placed.',
            });
          } else {
            console.log('Notification permission denied.');
          }
        } catch (error) {
          console.error('Error in service worker registration or FCM token retrieval:', error);
        }
      };

      // Call the function to register service worker and request permission
      registerServiceWorkerAndRequestPermission();
    } else {
      console.log('Messaging not initialized or not running on client-side.');
    }
  }, []);

  return null; // No UI is needed for this component
};

export default FirebaseMessaging;
