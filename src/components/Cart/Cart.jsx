import { Fragment, useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

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

  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true)

    await fetch('https://react-food-order-app-98245-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
      })
    setIsSubmiting(false)
    setDidSubmit(true)
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

  const cartModalContent =
          <Fragment>
            {cartItems}
            <div className={classes.total}>
              <span>Total Amount</span>
              <span>{totalAmount}</span>
            </div>
            {showCheckoutForm && <Checkout onConfirm={submitOrderHandler} onClose={props.modalClose}/>}
            {!showCheckoutForm && modalAction}
          </Fragment>

  const isSubmitingModalContent = <p>Sending Order data...</p>
  const didSubmitModalContent = <p>Successfully sent the order...</p>

  return (
    <Modal onClose={props.modalClose}>
      {!isSubmiting && !didSubmit && cartModalContent}
      {isSubmiting && isSubmitingModalContent}
      {!isSubmiting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
