// cart context
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    // calculate total price
    setTotalPrice(0);
    cart.map((item) => {
      if (item.data.discount) {
        setTotalPrice((prev) => prev + item.data.counter * item.data.discount);
      } else {
        setTotalPrice((prev) => prev + item.data.counter * item.data.price);
      }
    });
    // save cart in local storage
  }, [cart]);
  // check if cart is in local storage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setCart(cart);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
