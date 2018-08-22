import React, { Component } from "react";
import Order from "../../../Component/Order/Order";
import classes from "./Orders.css";
// import * as firebase from "firebase";

import axios from "../../../axios-order";
class Orders extends Component {
  state = {
    orders: [],
    loading: false,
    id: null
  };
  componentDidMount() {
    //there are two ways of getting the array of values chosse the axios why
    // const refdata = firebase
    //   .database()
    //   .ref()
    //   .child("orders");
    // refdata.on("value", snap => {
    //   console.log(snap.val());
    // });

    this.setState({ loading: true });
    axios
      .get("orders.json")
      .then(res => {
        let fetchData = [];
        for (let key in res.data) {
          fetchData.push({ ...res.data[key], id: key });
        }

        this.setState({ loading: false, orders: fetchData });
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  render() {
    let ordersFirebase = <h1>No orders</h1>;
    if (
      (this.state.orders !== "undefined" || this.state.orders.length !== 0) &&
      !this.state.loading
    ) {
      ordersFirebase = this.state.orders.map(order => {
        return (
          <Order
            key={order.id}
            price={order.priceOfBurger}
            ingredients={order.ingredients}
          />
        );
      });
    }

    return <div className={classes.Orders}>{ordersFirebase}</div>;
  }
}

export default Orders;
