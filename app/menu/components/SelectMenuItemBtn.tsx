'use client'

import CartContext from '@/app/CartContext';
import Spinner from '@/app/components/Spinner';
import { MenuItem } from '@prisma/client';
import { Box, Button, Heading, Text } from '@radix-ui/themes';
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';


interface FirstAddToCartProps {
  isOpen: boolean;
  closeFirstModal : () => void; // Add closeModal function prop
  item: MenuItem;
}

const AddToCartModal: React.FC<FirstAddToCartProps> = ({isOpen, closeFirstModal, item}) => {
  const { openModal, addToCart } = useContext(CartContext);
  const [submitting, setSubmitting] = useState(false);

  const handleAddToCart = () => {
    setSubmitting(true);
    addToCart(item);

    setTimeout(() => {
      setSubmitting(false);
      openModal();
      closeFirstModal();
    }, 2000);

  }

  return(
    <>
    <Modal isOpen={isOpen} onRequestClose={closeFirstModal} style={{overlay:{background: 'rgba(0,0,0,0.5)'}}} className="w-[50%] h-[100%] bg-white shadow-2xl ml-[50%]">
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>{item.price.toString()}</p>
      <button onClick={handleAddToCart} disabled={submitting}>
        Add
        {submitting && <Spinner />}
      </button>
    </Modal>
   
    /</>
  )
}


interface MenuItemProps {
    item: MenuItem;
  }

const SelectMenuItemBtn: React.FC<MenuItemProps>= ({ item }) => {
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { isModalOpen } = useContext(CartContext);
  
    const closeFirstModal = () => {
      setShowModal(false);
    };

    const handleClick = () => {
      setSubmitting(true);
      setShowModal(true);

      setTimeout(() => {
        setSubmitting(false);
      },2000);
    }

      
  return (
    <>
    <Button onClick={handleClick} disabled={submitting}>Select
      { submitting && <Spinner />}
    </Button>
    
    {showModal && <AddToCartModal isOpen={showModal} item={item} closeFirstModal={closeFirstModal}/>} 
    {isModalOpen && <ShowCart />}
  
    </>
  )
}

export  default SelectMenuItemBtn

const ShowCart = () => {
const { cart, isModalOpen,closeModal, addToCart, removeFromCart} = useContext(CartContext);


return (
  <Box>
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{overlay:{background: 'rgba(0,0,0,0.5)'}}} className="w-[40%] h-[100%] bg-white shadow-2xl ml-[60%] pl-4">
      <Heading as='h1' style={{fontSize: '2rem'}} className='border-b text-BlackRussian font-thin h-16 text-center'>Your order</Heading>
      {cart.map(item => (
        <Box key={item.menuItem?.id} className='border-b  py-2'>
        <Heading style={{fontSize: '16px'}}  className='py-4 text-2xl font-bold text-BlackRussian'>{item.menuItem?.name}</Heading>
        <div className='flex'>
        <button onClick={() => removeFromCart(item.menuItem.id)} className='w-8 h-8 bg-white hover:bg-slate-300 rounded-l-full border-l-2 border-y-2'>-</button>
        <div className='w-8 h-8 bg-white  px-2 align-middle border-y-2'>{item.quantity}</div>
        <button onClick={() => addToCart(item.menuItem)} className='w-8 h-8 bg-white violet-50  hover:bg-slate-300 rounded-r-full border-r-2 border-y-2'>+</button>
        <Text size="8" className='px-4'>{"x "+ item.menuItem?.price.toString()}</Text></div>
        </Box>
      ))}
      
    </Modal>
  </Box>
)
}
export { ShowCart }



