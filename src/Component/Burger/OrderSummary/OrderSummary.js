import React, { Component } from "react";
import Aux from "../../../Hoc/Hoc";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentWillUpdate() {}
  render() {
    const order = Object.keys(this.props.ingredients).map(keyIg => {
      return (
        <li key={keyIg}>
          <span style={{ textTransform: "capitalize" }}>
            {keyIg}: {this.props.ingredients[keyIg]}
          </span>
        </li>
      );
    });

    return (
      <Aux>
        <div>
          <h1>your order</h1>
          <p>this is what you order</p>
          <ul>{order}</ul>
          <p>
            <strong>Your Total Salary is {this.props.price.toFixed(2)}</strong>
          </p>
          <Button btnType="Success" clicked={this.props.orderContinue}>
            Continue
          </Button>
          <Button btnType="Danger" clicked={this.props.orderCancel}>
            Cancel
          </Button>
        </div>
      </Aux>
    );
  }
}
export default OrderSummary;
