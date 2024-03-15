'use client'
import { MenuItem } from "@prisma/client";
import { ReactNode, createContext,useState, useContext } from "react";


interface CartContextType {
    cart: MenuItem[];
    addToCart: (menuItem: MenuItem) => void;
    removeFromCart: (menuItemId: number) => void;
  }

  const initialContextValue: CartContextType = {
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {}
  };

  const CartContext = createContext<CartContextType>(initialContextValue);


export const CartProvider = ({children}: {children:ReactNode}) => {
    const [cart, setCart] = useState<MenuItem[]>([]);


    const addToCart = (menuItem: MenuItem) => {
        setCart([...cart, menuItem]);
      };
    
      const removeFromCart = (menuItemId: number) => {
        setCart(cart.filter(item => item.id !== menuItemId));
      };
    
      return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
          {children}
        </CartContext.Provider>
      );
  
}

export default CartContext

