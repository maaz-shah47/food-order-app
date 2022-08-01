import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD'){
    const updatedItems = state.items.concat(action.item)
    const updatedAmount = state.totalAmount + action.item.price + action.item.amount

    return {
      items: updatedItems,
      totalAmount: updatedAmount
    }
  }
  return defaultState
}
const CartProvider = props => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultState)

  const addItemToCartHandler = (item) => {
    dispatchCart({type: 'ADD', item})
  }
  const removeItemToCartHandler = (id) => {}

  const cartContext = {
    items: cartState.items,
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler
  }
  return(
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
