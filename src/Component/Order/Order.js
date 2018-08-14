import React from "react";
import classes from "./Order.css";

const Order = props => {
  const ingredient = [];
  for (let ingredients in props.ingredients) {
    ingredient.push({
      name: ingredients,
      amount: props.ingredient[ingredients]
    });
  }

  return (
    <div className={classes.Order}>
      <p>The order is salad </p>
      <p>
        The price is{" "}
        <strong>{Number.parseFloat(props.price).toFixed(2)} </strong>
      </p>
    </div>
  );
};
export default Order;
