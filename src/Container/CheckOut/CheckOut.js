import React, { Component } from "react";
import { connect } from "react-redux";
import CheckoutSummary from "../../Component/CheckOutSummery/CheckOutSummery";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";

class CheckOut extends Component {
  // componentWillMount() {
  //   let query = new URLSearchParams(this.props.location.search);
  //   console.log("query", query.entries());
  //   let price = 0;
  //   let queryParams = {};
  //   for (let key of query.entries()) {
  //     if (key[0] === "price") {
  //       price = key[1];
  //     } else {
  //       queryParams[key[0]] = +key[1];
  //     }
  //   }

  //   this.setState({ ingredients: queryParams, priceOfBurger: price });
  // }

  // checkOutCancelHandler = () => {
  //   this.props.history.goBack();
  // };
  checkOutContinueHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchasedBurger ? (
        <Redirect to="/" />
      ) : null;
      console.log("purchase state", this.props.purchasedBurger);
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            continue={this.checkOutContinueHandler}
            cancel={this.checkOutCancelHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateProps = state => {
  return {
    ingredients: state.ing.ingredients,
    priceOfBurger: state.ing.total_price,
    purchasedBurger: state.orders.purchased
  };
};
export default connect(mapStateProps)(CheckOut);
