'use client'
import { MenuItem } from "@prisma/client";
import { ReactNode, createContext,useState, useContext } from "react";

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
interface CartContextType {
    cart: CartItem[];
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
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addToCart = (menuItem: MenuItem) => {
      const existingCartItemIndex = cart.findIndex(item => item.menuItem.id === menuItem.id);
      if (existingCartItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingCartItemIndex].quantity++;
        setCart(updatedCart);
      } else {
        setCart(prevCart => [...prevCart, { menuItem, quantity: 1 }]);
      };
    }
    
      const removeFromCart = (menuItemId: number) => {
        const updatedCart = cart.map(item => {
          if (item.menuItem.id === menuItemId) {
            if (item.quantity > 1) {
              // Reduce the quantity by one
              return { ...item, quantity: item.quantity - 1 };
            } else {
              // Remove the item from the cart if its quantity is 1
              return null;
            }
          } else {
            return item;
          }
        }).filter(Boolean); // Filter out any null values
      
        setCart(updatedCart);
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

