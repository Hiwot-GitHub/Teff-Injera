'use client'

import CartContext from '@/app/CartContext';
import Spinner from '@/app/components/Spinner';
import { MenuItem } from '@prisma/client';
import { Box, Button, Heading, Text, ScrollArea, Separator, Flex, Blockquote } from '@radix-ui/themes';
import { Body } from '@radix-ui/themes/src/components/table.jsx';
import Link  from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Modal from 'react-modal';
import { IoChevronDownSharp } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { useRouter } from 'next/navigation';




interface FirstAddToCartProps {
  isOpen: boolean;
  closeFirstModal : () => void; // Add closeModal function prop
  item: MenuItem;
}

const AddToCartModal: React.FC<FirstAddToCartProps> = ({isOpen, closeFirstModal, item}) => {
  const { openModal, addToCart } = useContext(CartContext);
  const [submitting, setSubmitting] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

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
    <Modal isOpen={isOpen} onRequestClose={closeFirstModal} style={{overlay:{background: 'rgba(0,0,0,0.5)'}}} className="w-[80%] sm:w-[50%] h-[100%] bg-white shadow-2xl ml-[50%]">
      
      <div className='flex-col md:text-2xl sm:text-xl py-2 bg-cover bg-center  h-[20%]' style={{backgroundImage: `url(${item.image_url})`}}>
        <div className='mt-[50%] sm:mt-[30%] md:mt-[20%]  px-6 flex-col'>
        <div className='m-3 p-4'>
           <h1>{item.name}<span className='text-AlphaGrass px-3'>|</span>{item.amharicname}</h1>
           </div>
      <div className='bg-Grass h-auto rounded-sm text-BoldGras p-4 m-3 '>
        <div className='flex justify-between text-xl mb-2'>Description <button onClick={() => setShowDescription(!showDescription)} className='hover:bg-AlphaGrass transition-colors'>{showDescription? <IoIosArrowUp />: <IoChevronDownSharp />}</button></div>
        {showDescription && <div className='text-lg'>{item.description}</div>}
      </div>
     <div className='flex justify-between m-3 p-3 max-sm:flex-col'>
      <div className='py-4 text-lg font-bold'>{item.price.toString()}Rwf</div>
      <button onClick={handleAddToCart} disabled={submitting} className='bg-Grass hover:bg-AlphaGrass  w-32 h-8 rounded-full text-BoldGras max-sm:w-40'>
        Add
        {submitting && <Spinner />}
      </button>
      </div>
      </div>
      </div>
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
    <Button variant='soft' size='3' radius='full' onClick={handleClick} disabled={submitting}>Select
      { submitting && <Spinner />}
    </Button>
    
    {showModal && <AddToCartModal isOpen={showModal} item={item} closeFirstModal={closeFirstModal}/>} 
    {isModalOpen && <ShowCart />}
  
    </>
  )
}

export  default SelectMenuItemBtn

const ShowCart = () => {
const { cart, isModalOpen,closeModal, addToCart, removeFromCart,total, removeItemFromCart} = useContext(CartContext);
const [isLoading, setIsLoading] = useState(false);
const [checkoutBtnClicked, setCheckoutBtnClicked] = useState(false);
const router = useRouter();


const handleRemoveFromCart = (menuItemId: number) => {
  setIsLoading(true);
  removeFromCart(menuItemId);
  setIsLoading(false);
 
};

const handleAddToCart = (menuItem: MenuItem) => {
  setIsLoading(true);
  addToCart(menuItem);
  setIsLoading(false);
  
};

const handleCheckout = () => {
  setCheckoutBtnClicked(true);
 

  setTimeout(() => {
    closeModal();
    router.push('/checkout');
    setCheckoutBtnClicked(false);
  },1000);

}


return (
  <Box>
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{overlay:{background: 'rgba(0,0,0,0.05)'}}} className="w-[60%] sm:w-[40%] h-[100%] bg-white shadow-2xl ml-[60%] pl-4">
      <Heading as='h1' style={{fontSize: '2rem'}} className='border-b text-BlackRussian font-thin h-16 text-center'>Your order</Heading>
      <div style={{ maxHeight: '235px', overflowY: 'auto' }}>
      {cart.map(item => (
        <Box key={item.menuItem?.id} className='border-b  py-2'>
        <Button onClick={() => removeItemFromCart(item.menuItem.id)} className='flex items-center justify-center'>
        <IoIosCloseCircleOutline size={20} className='text-black' />
        <IoIosCloseCircleOutline size={20} className='text-transparent hover:text-blue-100  hover:bg-black  hover:rounded-full absolute' />
        </Button>
        <Heading style={{fontSize: '16px'}}  className='pt-0 pb-4 text-3xl font-bold text-BlackRussian'>{item.menuItem?.name}</Heading>
        <div className='flex'>
        <button onClick={() => handleRemoveFromCart(item.menuItem.id)} className='w-8 h-8 bg-white hover:bg-slate-300 rounded-l-full border-l-2 border-y-2'>
        {isLoading && <Spinner />}
                {"-"}
        </button>
        <div className='w-8 h-8 bg-white  px-2 align-middle border-y-2'>{item.quantity}</div>
        <button onClick={() => handleAddToCart(item.menuItem)} className='w-8 h-8 bg-white violet-50  hover:bg-slate-300 rounded-r-full border-r-2 border-y-2'>
        {isLoading && <Spinner />}
                {"+"}
        </button>
        <Text size="8" className='px-4'>{"x "+ item.menuItem?.price.toString()}</Text></div>
        </Box>
      ))}
    </div>
    <div className='w-[40%] fixed bottom-12 border-t'>
    <div className='flex items-center justify-center pb-2'>Subtotal: {total}</div>
    <div className='w-[90%] h-8 bg-red-500 hover:bg-red-700 transition-colors rounded-full flex justify-center px-2 '>
     <Button onClick={handleCheckout}> <Link href='/checkout' className='text-white text-bold  '>Check out </Link>
     {checkoutBtnClicked && <Spinner /> }</Button>
    </div>
    </div>
    </Modal>
  </Box>
)
}
export { ShowCart }



