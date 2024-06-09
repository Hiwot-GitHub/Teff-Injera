'use client';

import prisma from '@/prisma/client';
import MenuItemForm from './components/MenuItemForm';
import { useSession } from 'next-auth/react';
import ViewOrder from './components/View-orders';
import axios from 'axios';
import { Order } from '@prisma/client';
import { useState, useEffect } from 'react'


const Adminpage = () => {
  const { data: session } = useSession();
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
  

   
  return (
    <>
    { isAdmin && ( <>
               <ViewOrder orders={orders} />
               <MenuItemForm />
              </>)
  }
  { !isAdmin && <p>You are not authorized </p>}
    </>
  )
}
export default Adminpage;