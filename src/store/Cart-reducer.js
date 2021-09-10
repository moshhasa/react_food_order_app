import { clearStorage, getStorageValue , setStorageValue} from "../helper/LocalStorageHelper";

export const defaultCartValue = {
    items: [], totalAmount: 0 
}

const CartReducer = (state, action) => {
  const updatedCartState = {
    ...getStorageValue("cart", defaultCartValue),
  };
  let existingItemIndex, existingCartItem, updatedItems, totalAmount;

  switch (action.type) {
    case "ADD_TO_CART":
      totalAmount =
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

      break;

    case "REMOVE_ITEM_FROM_CART":
      existingItemIndex = state.items.findIndex(
        (item) => item.id === action.itemId
      );
      existingCartItem = state.items[existingItemIndex];

      totalAmount = state.totalAmount - existingCartItem.price;
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

      break;

    case "CLEAR_CART":
        clearStorage();
        return defaultCartValue;
    default:
  }

  updatedCartState.items = updatedItems ? updatedItems : [];
  updatedCartState.totalAmount = totalAmount ? totalAmount : 0;
  setStorageValue("cart", updatedCartState);
  return updatedCartState;
};

export default CartReducer;
