'use client'
import { MenuItem } from "@prisma/client";
import { ReactNode, createContext,useState, useContext, useEffect } from "react";

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
interface CartContextType {
    cart: CartItem[];
    clearCart: () => void;
    addToCart: (menuItem: MenuItem) => void;
    removeFromCart: (menuItemId: number) => void;
    removeItemFromCart: (menuItemId: number) => void;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    total: number;
  }

  const initialContextValue: CartContextType = {
    cart: [],
    clearCart: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    removeItemFromCart: () => {},
    isModalOpen: false,
    openModal: () => {},
    closeModal: () => {},
    total: 0,
  };

  const CartContext = createContext<CartContextType>(initialContextValue);


export const CartProvider = ({children}: {children:ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [total, setTotal] = useState<number>(0);

    
  useEffect(() => {
    // Calculate total when cart changes
    const totalPrice = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
    setTotal(totalPrice);
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  }

    const addToCart = (menuItem: MenuItem) => {
      const existingCartItemIndex = cart.findIndex(item => item.menuItem.id === menuItem.id);
      if (existingCartItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingCartItemIndex].quantity++;
        setCart(updatedCart);
      } else {
        setCart(prevCart => [...prevCart, { menuItem, quantity: 1 }]);
      };
      updateTotal();
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
        const filteredCart = updatedCart.filter(Boolean) as CartItem[];
        setCart(filteredCart);
        updateTotal();
      };

      const removeItemFromCart = (menuItemId: number) => {
        setCart(cart.filter(item => item.menuItem.id !== menuItemId));
        updateTotal();
      };

      const updateTotal = () => {
          const totalPrice = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
          setTotal(totalPrice); 
      };

      const openModal = () => {
        setIsModalOpen(true);
      }

      const closeModal = () => {
        setIsModalOpen(false);
      }
    
      return (
        <CartContext.Provider value={{ cart, clearCart, addToCart, removeFromCart,removeItemFromCart,total, isModalOpen, openModal, closeModal }}>
          {children}
        </CartContext.Provider>
      );
  
}

export default CartContext

