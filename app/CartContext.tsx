'use client'
import { MenuItem } from "@prisma/client";
import { ReactNode, createContext,useState, useContext } from "react";


interface CartContextType {
    cart: MenuItem[];
    addToCart: (menuItem: MenuItem) => void;
    removeFromCart: (menuItemId: number) => void;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  }

  const initialContextValue: CartContextType = {
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    isModalOpen: false,
    openModal: () => {},
    closeModal: () => {}
  };

  const CartContext = createContext<CartContextType>(initialContextValue);


export const CartProvider = ({children}: {children:ReactNode}) => {
    const [cart, setCart] = useState<MenuItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addToCart = (menuItem: MenuItem) => {
        setCart([...cart, menuItem]);
      };
    
      const removeFromCart = (menuItemId: number) => {
        setCart(cart.filter(item => item.id !== menuItemId));
      };

      const openModal = () => {
        setIsModalOpen(true);
      }

      const closeModal = () => {
        setIsModalOpen(false);
      }
    
      return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isModalOpen, openModal, closeModal }}>
          {children}
        </CartContext.Provider>
      );
  
}

export default CartContext

