import React from "react";
import styles from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Header = ({onShowCart}) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Awesome Meals</h1>
        <HeaderCartButton onClick={onShowCart}/>
      </header>

      <div className={styles['main-image']}>
        <img src={mealsImg} alt="" />
      </div>
    </>
  );
};

export default Header;
