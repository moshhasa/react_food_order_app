import React, { useContext, useState } from "react";
import useHttp from "../../hook/use-http";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartItems from "./CartItems";
import Checkout from "./Checkout";

const Cart = ({ onHide }) => {
  const { isLoading, error, sendRequest: submitCheckout } = useHttp();
  const [showCheckout, setShowCheckout] = useState(false);
  const [submittionSuccess, setSubmittionSuccess] = useState(false);
  const context = useContext(CartContext);
  const totalAmount = `£${context.totalAmount.toFixed(2)}`;
  const showOrderButton = context.items.length > 0;

  const addCartItemHandler = (item) => {
    context.addItem({ ...item, amount: 1 });
  };

  const removeCartItemHandler = (itemId) => {
    context.removeItem(itemId);
  };

  const submmissionSuccessHandler = () => {
     setSubmittionSuccess(true)
     context.clearItems();
  }

  const checkoutHandler = (userData) => {
    submitCheckout(
      {
        url: "http://localhost:8085/checkout",
        method: "POST",
        body: { user: userData, orderedItems: context.items },
        headers: {
          "Content-Type": "application/json",
        },
      }, submmissionSuccessHandler);
  };

  const orderHandeler = () => setShowCheckout(true);

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={onHide}>
        Close
      </button>

      {showOrderButton && (
        <button className={styles.button} onClick={orderHandeler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      <CartItems
        items={context.items}
        onRemove={removeCartItemHandler}
        onAdd={addCartItemHandler}
      />
      {error && <p>Failed to submit order... Please try again</p>}
      <div className={styles.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      
      {showCheckout && <Checkout onCancel={onHide} onCheckOut={checkoutHandler} />}
      {!showCheckout && modalActions}
    </>
  );

  const cartModalSubmittingContent = <p>Submittin order...</p>

  return <Modal onHide={onHide}>
    {!isLoading && !submittionSuccess && cartModalContent}
    {isLoading && cartModalSubmittingContent}
    {!isLoading && submittionSuccess && <p>Order Submitted!!...</p>}
    </Modal>;
};

export default Cart;
