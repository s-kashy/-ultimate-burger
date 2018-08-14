import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  let burgerTransform = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((prevVal, curVal) => {
      return prevVal.concat(curVal);
    }, []);
  if (burgerTransform.length === 0) {
    burgerTransform = <p>Please add ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {burgerTransform}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default Burger;
