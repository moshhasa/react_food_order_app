import React from 'react'
import CartItem from './CartItem'
import styles from './CartItems.module.css'

const CartItems = ({items, onRemove, onAdd}) => {
    return (
        <ul className={styles["cart-items"]}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={onRemove.bind(null, item.id)}
            onAdd={onAdd.bind(null, item)}
          />
        ))}
      </ul>
    )
}

export default CartItems
