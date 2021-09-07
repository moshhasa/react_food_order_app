import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCardState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  const itemToReturn = { ...defaultCardState };
  let existingItemIndex, existingCartItem, updatedItems;

  switch (action.type) {
    case "ADD_TO_CART":
      itemToReturn.totalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      existingCartItem = state.items[existingItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      itemToReturn.items = updatedItems;
      break;
    case "REMOVE_ITEM_FROM_CART":
      existingItemIndex = state.items.findIndex(
        (item) => item.id === action.itemId
      );
      existingCartItem = state.items[existingItemIndex];

      itemToReturn.totalAmount = state.totalAmount - existingCartItem.price;
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.itemId);
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      }

      itemToReturn.items = updatedItems;
      break;
    default:
        
  }

  return itemToReturn;
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAtion] = useReducer(
    cartReducer,
    defaultCardState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAtion({ type: "ADD_TO_CART", payload: item });
  };

  const removeCartItemHandler = (itemId) => {
    dispatchCartAtion({ type: "REMOVE_ITEM_FROM_CART", itemId: itemId });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeCartItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
