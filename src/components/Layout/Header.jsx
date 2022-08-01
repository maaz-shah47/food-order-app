import React, {Fragment} from 'react'
import mealsImg from '../../assets/meals.jpg'

import classes from './header.module.css'
import HeaderCartButton from './HeaderCartButton';

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImg} alt='Meals' />
      </div>
    </Fragment>
  )
}

export default Header
