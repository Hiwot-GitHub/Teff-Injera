'use client'
import React, { useContext } from 'react'
import CartContext from '@/app/CartContext';
import { PiBowlFoodThin } from "react-icons/pi";
import { FaBowlFood } from "react-icons/fa6";
import { Box } from '@radix-ui/themes';
import { ShowCart } from '../menu/components/SelectMenuItemBtn';

const CartIcon = () => {
  const  { isModalOpen, cart, openModal, closeModal} = useContext(CartContext);

  const handleIconClick = () => {
    if (isModalOpen)
      closeModal();
    else
      openModal();
  }
  return (
    <>
    <Box width='2' height='4'>
    { !isModalOpen && cart.length > 0 && (<Box className='mt-[20%] flex fixed bottom-36 right-12 w-5 h-5 text-white text-[14px] font-bold bg-red-500 rounded-full justify-center align-middle z-50 '>
      {cart.length}
    </Box>
    )}
         { !isModalOpen && cart.length > 0 && (<button onClick={handleIconClick} className=' mt-[20%] z-50 fixed right-16 bottom-24 bg-white w-16 h-16 rounded-full shadow-2xl hover:bg-SubtleGray transition-colors'>
            <FaBowlFood size={30} className='ml-4'/> 
           </button>  
         )}
    </Box>
     {isModalOpen && <ShowCart />}
     </>
  )
}

export default CartIcon