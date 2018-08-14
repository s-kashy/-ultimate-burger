import React from "react";
import classes from "./Order.css";

const Order = props => {
  return (
    <div className={classes.Order}>
      <p>The order is salad </p>
      <p>The price is 8.0$ </p>
    </div>
  );
};
export default Order;
