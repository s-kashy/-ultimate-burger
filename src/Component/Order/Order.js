import React from "react";
import classes from "./Order.css";
import withErrorHandler from "../../Hoc/ErrorHandler";
import axios from "../../axios-order";
const Order = props => {
  const ingredient = [];
  let ingredientOutPut = null;
  for (let ingredients in props.ingredients) {
    ingredient.push({
      name: ingredients,
      amount: props.ingredients[ingredients]
    });
    ingredientOutPut = ingredient.map(ig => {
      return (
        <span
          key={ig.name}
          style={{
            textTransform: "capitalize",
            border: "1px solid black",
            margin: "2px",
            padding: "5px",
            display: "inline-block"
          }}
        >
          {ig.name} ({ig.amount})
        </span>
      );
    });
  }

  return (
    <div className={classes.Order}>
      <div>
        <strong>Ingredients</strong> {ingredientOutPut}
      </div>
      <p>
        The price is
        <strong> {Number.parseFloat(props.price).toFixed(2)}$ </strong>
      </p>
    </div>
  );
};
export default withErrorHandler(Order, axios);
