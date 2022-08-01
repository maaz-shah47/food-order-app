import React from 'react'
import Input from '../../UI/Input'
import classes from './mealItemForm.module.css'

const MealItemForm = (props) => {
  console.log('amount_'+props.id)
  return (
    <form className={classes.form}>
      <Input label="Amount" input={{
        id: 'amount_' + props.id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
      }} />
      <button>+ add</button>
    </form>
  )
}

export default MealItemForm
