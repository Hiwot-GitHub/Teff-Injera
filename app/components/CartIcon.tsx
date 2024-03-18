'use client'
import React, { useContext } from 'react'
import CartContext from '@/app/CartContext';
import { PiBowlFoodThin } from "react-icons/pi";
import { Box } from '@radix-ui/themes';

const CartIcon = () => {
  const  { isModalOpen, cart} = useContext(CartContext);
  return (
    <Box width='2' height='4'>
        <button className=' mt-[20%] z-50 fixed right-16 bottom-24'>
        { !isModalOpen && cart.length > 0 && <PiBowlFoodThin size={64}/> }
        </button>  
    </Box>
  )
}

export default CartIcon