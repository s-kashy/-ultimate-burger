import React, { Component } from "react";
import Order from "../../../Component/Order/Order";
import classes from "./Orders.css";
import { connect } from "react-redux";
import withErrHandler from "../../../Hoc/ErrorHandler";
import axios from "../../../axios-order";
import * as actions from "../../../store/actions/index";
// import * as firebase from "firebase";

class Orders extends Component {
  componentDidMount() {
    this.props.getAllOrders(this.props.token, this.props.userId);

    //there are two ways of getting the array of values chosse the axios why
    // const refdata = firebase
    //   .database()
    //   .ref()
    //   .child("orders");
    // refdata.on("value", snap => {
    //   console.log(snap.val());
    // });
    // this.setState({ loading: true });
    // axios
    //   .get("orders.json")
    //   .then(res => {
    //     let fetchData = [];
    //     for (let key in res.data) {
    //       fetchData.push({ ...res.data[key], id: key });
    //     }
    //     this.setState({ loading: false, orders: fetchData });
    //   })
    //   .catch(err => {
    //     console.log("err", err);
    //   });
  }

  render() {
    let ordersFirebase = <h1>No orders</h1>;
    if (
      (this.props.orders !== "undefined" || this.props.orders.length !== 0) &&
      !this.props.loading
    ) {
      ordersFirebase = this.props.orders.map(order => {
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
const mapStateProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllOrders: (token, userId) =>
      dispatch(actions.fetchOrderInit(token, userId))
  };
};
export default connect(
  mapStateProps,
  mapDispatchToProps
)(withErrHandler(Orders, axios));
