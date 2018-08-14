import React, { Component } from "react";

import CheckoutSummary from "../../Component/CheckOutSummery/CheckOutSummery";
import Spinner from "../../Component/Spinner/Spinner";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
class CheckOut extends Component {
  state = {
    ingredients: null,
    priceOfBurger: 0
  };
  componentWillMount() {
    let query = new URLSearchParams(this.props.location.search);
    console.log("query", query.entries());
    let price = 0;
    let queryParams = {};
    for (let key of query.entries()) {
      if (key[0] === "price") {
        price = key[1];
      } else {
        queryParams[key[0]] = +key[1];
      }
    }

    this.setState({ ingredients: queryParams, priceOfBurger: price });
  }
  checkOutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkOutContinueHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        {this.state.ingredients ? (
          <div>
            <CheckoutSummary
              ingredients={this.state.ingredients}
              continue={this.checkOutContinueHandler}
              cancel={this.checkOutCancelHandler}
            />

            <Route
              path={this.props.match.path + "/contact-data"}
              render={props => (
                <ContactData
                  ingredients={this.state.ingredients}
                  price={this.state.priceOfBurger}
                  {...props}
                />
              )}
            />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
export default CheckOut;
