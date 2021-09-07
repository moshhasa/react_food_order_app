import React, { useRef, useState } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = ({id, onAddToCart}) => {

    const amountIniputRef = useRef();
    const [validAmount, setValidAmount] = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();
    
        const enteredAmount = amountIniputRef.current.value;
        if(enteredAmount.trim().length === 0 || +enteredAmount < 1)
        {
            setValidAmount(false);
            return
        }
        

        onAddToCart(+enteredAmount)
    }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountIniputRef}
        label="Amount"
        input={{
          id: `amount_${id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Button title="+ Add" type="submit"/>
      {!validAmount && <p>Please enter a valid amont</p>}
    </form>
  );
};

export default MealItemForm;
