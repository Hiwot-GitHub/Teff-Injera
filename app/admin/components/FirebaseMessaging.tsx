'use client';

import { useEffect } from 'react';
import { getToken, Messaging } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';
import axios from 'axios';

const FirebaseMessaging = () => {
  useEffect(() => {
    if (messaging !== null) {
    const requestPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        try {
          const token = await getToken(messaging as Messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });
          console.log('FCM Token:', token);
          // Optionally, send the token to your server
          await axios.post('/api/notification', {
            token,
            title: 'New Order Received',
            body: 'A new order has just been placed.',
          });
        } catch (error) {
          console.error('Error getting FCM token:', error);
        }
      } else {
        console.log('Notification permission denied.');
      }
    };

    requestPermission();
} else {
    console.log('Messaging not initialized.');
}
  }, []);

  return null; // No UI is needed for this component
};

export default FirebaseMessaging;
