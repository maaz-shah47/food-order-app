import React, { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './mealItemForm.module.css'

const MealItemForm = (props) => {
  const [isFormValid, setIsFormValid] = useState(true)
  const mealAmountRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()
    const enteredAmount = mealAmountRef.current.value
    const enteredAmountNumber = +enteredAmount
    console.log(enteredAmountNumber)

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
      setIsFormValid(false)
      return
    }

    props.onAddToCart(enteredAmountNumber)
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input label="Amount"
        ref={mealAmountRef}
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
      }} />
      <button>+ add</button>
      {!isFormValid && <p>Invalid</p>}
    </form>
  )
}

export default MealItemForm
