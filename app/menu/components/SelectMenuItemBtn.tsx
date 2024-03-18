'use client'

import CartContext from '@/app/CartContext';
import Spinner from '@/app/components/Spinner';
import { MenuItem } from '@prisma/client';
import { Box, Button, Text } from '@radix-ui/themes';
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { PiBowlFoodThin } from "react-icons/pi";


interface FirstAddToCartProps {
  isOpen: boolean;
  closeFirstModal : () => void; // Add closeModal function prop
  item: MenuItem;
}

const FirstAddToCartModal: React.FC<FirstAddToCartProps> = ({isOpen, closeFirstModal, item}) => {
  const { openModal, addToCart } = useContext(CartContext);
  const [submitting, setSubmitting] = useState(false);

  const handleAddToCart = async() => {
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
    
    {showModal && <FirstAddToCartModal isOpen={showModal} item={item} closeFirstModal={closeFirstModal}/>} 
    {isModalOpen && <AddToCart />}
  
    </>
  )
}

export  default SelectMenuItemBtn

const AddToCart = () => {
const { cart, isModalOpen,closeModal} = useContext(CartContext);

return (
  <Box>
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{overlay:{background: 'rgba(0,0,0,0.5)'}}} className="w-[50%] h-[100%] bg-white shadow-2xl ml-[50%]">
      {cart.map(item => (
        <Box>
        <h1 className='p-4 text-4xl border-b '>{item.name}</h1>
        <Text>{item.description}</Text>
        <Text>{item.price.toString()}</Text>
        </Box>
      ))}
      
    </Modal>
  </Box>
)
}



