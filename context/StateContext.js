import React from "react";
import { useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";

const StateContext = React.createContext();

export const StateProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  const addOnCart = (product, qty) => {
    const checkProductOnCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice((prevPrice) => prevPrice + product.price * qty);
    setTotalQuantity((prevQty) => prevQty + qty);

    if (checkProductOnCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + qty,
          };
        }
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = qty;
      setCartItems([...cartItems, product]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  let foundProduct;
  let index;

  const removeFromCart = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    let newCartItems = cartItems.filter((item) => item._id != product._id);
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);

    if (value == "inc") {
      setCartItems(
        cartItems.map((item) => {
          if (item._id == id) {
            item.quantity = item.quantity + 1;
          }
          return item;
        })
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value == "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems(
          cartItems.map((item) => {
            if (item._id == id) {
              item.quantity = item.quantity - 1;
            }
            return item;
          })
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
      }
    }
  };

  const incQty = () => {
    setQty((current) => {
      return current + 1;
    });
  };

  const decQty = () => {
    setQty((current) => {
      if (current - 1 < 1) return 1;
      else {
        return current - 1;
      }
    });
  };

  return (
    <StateContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        incQty,
        decQty,
        addOnCart,
        toggleCartItemQuantity,
        removeFromCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantity,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
