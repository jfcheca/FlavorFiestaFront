import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateItemQuantity = (itemId, cantidad) => {
    setCartItems((prevItems) => 
      prevItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, cantidad } : cartItem
      )
    );
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, updateItemQuantity, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
