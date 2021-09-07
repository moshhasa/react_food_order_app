import React, {useReducer} from 'react'
import CartContext from './cart-context'

const defaultCardState = {
    items : [],
    totalAmount: 0,
}
const cartReducer = (state, action) => {
   
    if (action.type === 'ADD_TO_CART')
    {
        const updatedItems = state.items.concat(action.payload);
        const updatedTotalAmount = state.totalAmount + (action.payload.price * action.payload.amount)

        return {
            items: updatedItems,
            totalAmount : updatedTotalAmount
        }
    }

    return defaultCardState;
}


const CartProvider = ({children}) => {

    const [cartState, dispatchCartAtion] = useReducer(cartReducer, defaultCardState)
    
    const addItemToCartHandler = item => {
        dispatchCartAtion({ type : 'ADD_TO_CART', payload: item});
    }

    const removeCartItemHandler = itemId => {
        dispatchCartAtion({ type : 'REMOVE_ITEM_FROM_CART', itemId: itemId});
    }

    const cartContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemToCartHandler,
        removeItem: removeCartItemHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
