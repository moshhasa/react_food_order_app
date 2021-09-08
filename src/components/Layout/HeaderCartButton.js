import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = ({ onClick }) => {
  const [bump, setBump] = useState(false);
  const context = useContext(CartContext);
  const numberOfCartItems = context.items.reduce(
    (current, item) => current + item.amount,
    0
  );

  const btnClasses = `${styles.button} ${bump && styles.bump}`;

  useEffect(() => {
    if (context.items.length === 0) return;

    setBump(true);
    const timer = setTimeout(() => {
      setBump(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [context.items]);

  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
