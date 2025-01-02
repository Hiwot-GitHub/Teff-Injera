'use client';

import prisma from '@/prisma/client';
import { useSession, signOut, signIn } from 'next-auth/react';
import ViewOrder from './components/View-orders';
import axios from 'axios';
import { Order } from '@prisma/client';
import { useState, useEffect } from 'react'
import { Button } from '@radix-ui/themes';
import FirebaseMessaging from './components/FirebaseMessaging';
import Sidebar from './components/Sidebar';
import { CiMenuFries } from "react-icons/ci";


const Adminpage = () => {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab ] = useState('orders');
  const [isSidebarOpen, setIsSidebarOpen ] = useState(false);

   useEffect(() => {
    const checkUserRole = async () => {
      try {
        if (session?.user?.role && session.user.role !== 'USER') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false)
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
    {session && isAdmin && ( <div className='flex'>
              
               <div className='hidden lg:block'>
               <Sidebar activeTab={activeTab} onTabClick={(tab) => setActiveTab(tab)}/>
               </div>
               
               isSidebarOpen && (
                <div className='fixed inset-0 z-50 bg-green-50  lg:hidden'>
                <div className="h-[2rem] w-full  bg-opacity-50 cursor-pointer" 
                   onClick={() => setIsSidebarOpen(false)}></div>

                <div className="h-[calc(100%-2rem)] w-full ">
                  <Sidebar activeTab={activeTab} onTabClick={(tab) => setActiveTab(tab)} />     
                </div>
                </div>
               )

               <div className='lg:hidden'>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <CiMenuFries/>
                </button>

               </div>

               <div className='ml-64 bg-green-100'>
               <ViewOrder orders={orders} />
               </div>
               <FirebaseMessaging />
              </div>)
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