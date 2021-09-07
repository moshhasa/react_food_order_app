import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = ({ meal }) => {
  const mealPrice = `£${meal.price.toFixed(2)}`;
  const context = useContext(CartContext);

  const addToCartHandler = (amount) => {
    context.addItem({
      id: meal.id,
      amount: amount,
      price: meal.price,
      name: meal.name,
    });
  };

  return (
    <div className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>{mealPrice}</div>
      </div>

      <div>
        <MealItemForm id={meal.id} onAddToCart={addToCartHandler} />
      </div>
    </div>
  );
};

export default MealItem;
