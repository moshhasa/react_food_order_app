import React, { useReducer } from "react";
import { useLocalStorage } from "../hook/use-localstorage";
import CartContext from "./cart-context";
import CartReducer, { defaultCartValue } from "./Cart-reducer";



const CartProvider = ({ children }) => {
  const {value : defaultCart} = useLocalStorage('cart', defaultCartValue)
  const [cartState, dispatchCartAtion] = useReducer(CartReducer, defaultCart);

  const addItemToCartHandler = (item) => {
    dispatchCartAtion({ type: "ADD_TO_CART", payload: item });
  };

  const removeCartItemHandler = (itemId) => {
    dispatchCartAtion({ type: "REMOVE_ITEM_FROM_CART", itemId: itemId });
  };

  const clearItemsHandler = () => dispatchCartAtion({ type: "CLEAR_CART" });
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeCartItemHandler,
    clearItems: clearItemsHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
