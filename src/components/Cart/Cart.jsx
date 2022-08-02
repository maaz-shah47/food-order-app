import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1})
  };

  const orderButtonHandler = () => {
    setShowCheckoutForm(true)
  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = <div className={classes.actions}>
                        <button className={classes['button--alt']} onClick={props.modalClose}>
                          Close
                        </button>
                        {hasItems && <button className={classes.button} onClick={orderButtonHandler}>Order</button>}
                      </div>
  return (
    <Modal onClose={props.modalClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckoutForm && <Checkout onClose={props.modalClose}/>}
      {!showCheckoutForm && modalAction}
    </Modal>
  );
};

export default Cart;
