import styles from './CartItem.module.css';

const CartItem = ({onAdd, onRemove, item}) => {
  const itemPrice = `£${item.price.toFixed(2)}`;

  return (
    <li  className={styles['cart-item']}>
      <div>
        <h2>{item.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{itemPrice}</span>
          <span className={styles.amount}>x {item.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
