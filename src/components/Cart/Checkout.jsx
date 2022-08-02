import { useRef } from 'react';

import classes from './checkout.module.css';


const isEmpty = value => value === undefined || value === null || value === '';
const isNotFiverChar = value => value.length !== 5;

const Checkout = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const postalRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const nameValue = nameRef.current.value;
    const streetValue = streetRef.current.value;
    const cityValue = cityRef.current.value;
    const postalValue = postalRef.current.value;

    const nameIsValid = !isEmpty(nameValue)
    const streetIsValid = !isEmpty(streetValue)
    const cityIsValid = !isEmpty(cityValue)
    const postalIsValid = !isEmpty(postalValue) && !isNotFiverChar(postalValue)

    const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid

    if(formIsValid) {
      props.onConfirm({
        name: nameValue,
        street: streetValue,
        city: cityValue,
        postal: postalValue
      })
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef} />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
