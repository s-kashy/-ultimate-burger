import React, { Component } from "react";
import Order from "../../../Component/Order/Order";
import classes from "./Orders.css";
class Orders extends Component {
  render() {
    return (
      <div className={classes.Orders}>
        <Order />
        <Order />
      </div>
    );
  }
}
export default Orders;
