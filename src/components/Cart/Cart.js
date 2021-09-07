import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = ({ onHide }) => {
  const context = useContext(CartContext);
  const totalAmount = `£${context.totalAmount.toFixed(2)}`;
  const showOrderButton = context.items.length > 0;

  const addCartItemHandler = (item) => {
    context.addItem(item);
  };

  const removeCartItemHandler = (itemId) => {
    context.removeItem(itemId);
  };
  return (
    <Modal onHide={onHide}>
      <ul className={styles["cart-items"]}>
        {context.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeCartItemHandler.bind(null, item.id)}
            onAdd={addCartItemHandler.bind(null, item)}
          />
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={onHide}>
          Close
        </button>
        {showOrderButton && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
