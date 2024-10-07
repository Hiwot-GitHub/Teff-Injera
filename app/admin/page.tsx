'use client';

import prisma from '@/prisma/client';
import MenuItemForm from './components/MenuItemForm';
import { useSession, signOut, signIn } from 'next-auth/react';
import ViewOrder from './components/View-orders';
import axios from 'axios';
import { Order } from '@prisma/client';
import { useState, useEffect } from 'react'
import { Button } from '@radix-ui/themes';
import { getToken } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';


const Adminpage = () => {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
   const [orders, setOrders] = useState<Order[]>([]);

   useEffect(() => {
    const checkUserRole = async () => {
      try {
        if (session?.user?.role !== 'USER') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error checking user role:', error);
      }
    };

    checkUserRole();
  }, [session]);
   

  useEffect(() => {
    const getOrders = async () => {
      try{
        const response = await axios.get<Order[]>('/api/order');
        const jsonResponse: Order[] = response.data;

         // Parse the createdAt & updatedAt fields into Date objects
         const parsedOrders = jsonResponse.map(order => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        }));

        setOrders(parsedOrders);

        
      } catch(error) {
        console.log(error);
        };
    };
    getOrders();

  },[])

    // Send Notification to the server
    const sendNotification = async (token: string, title: string, body: string) => {
      try {
        const response = await axios.post('/api/notification', {
          token,
          title,
          body,
        });
        console.log('Notification sent:', response.data);
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    };


   // Request notification permission and get the FCM token
   useEffect(() => {
   if (typeof window !== 'undefined' && isAdmin) {
    const requestPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        try {
          const token = await getToken(messaging, { vapidKey:  process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });
          console.log("FCM Token:", token);
          // Optionally send this token to your server to use it for push notifications
          sendNotification(token, 'New Order Received', 'A new order has just been placed.');
        } catch (error) {
          console.error("Error getting token:", error);
        }
      } else {
        console.log("Notification permission denied.");
      }
    };

  
      requestPermission(); // Only request permission for admins
  }
    
  }, [isAdmin]);

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (status === 'authenticated') {
      signOut();
    } else {
      signIn();
    }
  };
  

  return (
    <>
    {session && isAdmin && ( <>
               <ViewOrder orders={orders} />
               <MenuItemForm />
              </>)
  }
      {session && !isAdmin && <p>You are not authorized</p>}
      {!session && <p>Please log in to access this page</p>} 
      <Button onClick={handleLogout} >
               {status === 'authenticated' ? 'Logout' : 'Login'}
               </Button>
    </>
  )
}
export default Adminpage;