import React from "react";
import {useInput} from "../../hook/use-input";
import styles from "./Checkout.module.css";

const Checkout = ({ onCancel, onCheckOut }) => {
  
  const {
    value: firstName,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameValueChangeHandler,
    valueBlurHander: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: lastName,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameValueChangeHandler,
    valueBlurHander: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailValueChangeHandler,
    valueBlurHander: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.trim().length > 0 && value.includes("@"));

  const validForm = firstNameIsValid && lastNameIsValid && emailIsValid;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validForm) {
      return;
    }

    onCheckOut({firstName, lastName, email})
    resetFirstName();
    resetLastName();
    resetEmail();

   
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={`${styles.control} ${firstNameHasError && styles.invalid}`}  >
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={firstNameValueChangeHandler}
          onBlur={firstNameBlurHandler}
        />
        {firstNameHasError && (
          <p className={styles["error-text"]}>First Name cannot be empty</p>
        )}
      </div>
      <div
        className={`${styles.control} ${lastNameHasError && styles.invalid}`}
      >
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={lastNameValueChangeHandler}
          onBlur={lastNameBlurHandler}
        />
        {lastNameHasError && (
          <p className={styles["error-text"]}>Last Name cannot be empty</p>
        )}
      </div>
      <div className={`${styles.control} ${emailHasError && styles.invalid}`}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={emailValueChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className={styles["error-text"]}>Enter a valid email</p>
        )}
      </div>
      <div className={styles.actions}>
      <button type="button" onClick={onCancel}>
        
        Close
      </button>
      <button disabled={!validForm} className={styles.submit}>
        Order now
      </button>
    </div>
      
    </form>
  );
};

export default Checkout;
