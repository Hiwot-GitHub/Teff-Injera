'use client'

import CartContext from '@/app/CartContext';
import Spinner from '@/app/components/Spinner';
import { MenuItem } from '@prisma/client'
import { Button } from '@radix-ui/themes'
import React, { useContext, useEffect, useState } from 'react'


interface MenuItemProps {
    item: MenuItem;
  }
const AddToCartBtn: React.FC<MenuItemProps>= ({ item }) => {
    const { cart, addToCart} = useContext(CartContext);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Log the updated cart state whenever it changes
        console.log(cart);
    }, [cart]);
    
    const handleClick = () => {
        setSubmitting(true);
        addToCart(item);
        
        setTimeout(() => {
            setSubmitting(false);
        }, 2000);
        
    }
      
  return (
    <Button onClick={handleClick} disabled={submitting}>Select
      { submitting && <Spinner />}
    </Button>
    
  )
}

export default AddToCartBtn