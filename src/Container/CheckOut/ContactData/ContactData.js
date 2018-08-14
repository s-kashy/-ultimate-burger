import React, { Component } from "react";
import Button from "../../../Component/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../Component/Spinner/Spinner";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false,
    priceOfBurger: 0,
    ingredients: null
  };
  orderFormHandler = e => {
    e.preventDefault();
    let order = {
      ingredients: this.props.ingredients,
      priceOfBurger: this.props.price
    };
    this.setState({ loading: true });
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(classes.ContactData);

    return (
      <div>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div className={classes.contactData}>
            <form>
              <h4>Enter Your info</h4>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className={classes.Input}
              />
              <input
                type="text"
                name="email"
                placeholder="Your Email"
                className={classes.Input}
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                className={classes.Input}
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                className={classes.Input}
              />
              <Button
                clicked={this.orderFormHandler}
                btnType="Success"
                className={classes.Input}
              >
                Order
              </Button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
export default ContactData;
