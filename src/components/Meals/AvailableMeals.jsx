import React, { useEffect, useState } from 'react'
import Card from '../UI/Card';
import Spinner from 'react-bootstrap/Spinner';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css'


const AvailableMeals = () => {
  const [ allMeals, setAllMeals] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-food-order-app-98245-default-rtdb.firebaseio.com/meals.json')
      const data = await response.json()

      const loadedMeals = []

      for (const key in data) {
        loadedMeals.push({
          ...data[key],
          id: key
        })
      }
      setAllMeals(loadedMeals)
      setIsLoading(false)
    }
    fetchMeals()
  }, [])

  if(isLoading) {
    return <Spinner animation="border" variant="primary" />
  }

  const meals = allMeals.map(meal => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals}
        </ul>
      </Card>
    </section>
  )
}
export default AvailableMeals
