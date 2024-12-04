import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './auth-context';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from local storage when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      const savedCart = localStorage.getItem(`cart_${isAuthenticated.user._id}`);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, [isAuthenticated]);

  // Save cart data to local storage whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(`cart_${isAuthenticated.user._id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);
      if (existingItem) {
        return prevItems.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const incrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};