import React, { Component } from "react";
import Button from "../../../Component/UI/Button/Button";
import classes from "./ContactData.css";
import { connect } from "react-redux";
import * as actionType from "../../../store/actions/index";
import Input from "../../../Component/UI/Input/Input";
import Spinner from "../../../Component/Spinner/Spinner";
import withErrorHandler from "../../../Hoc/ErrorHandler";
import axios from "../../../axios-order";
var validator = require("validator");
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          require: true
        },
        valid: false,
        touch: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: " Email"
        },
        value: "",
        validation: {
          require: true
        },
        valid: false,
        touch: false
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: " Street"
        },
        value: "",
        validation: {
          require: true
        },
        valid: false,
        touch: false
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: " Postal Code"
        },
        value: "",
        validation: {
          require: true,
          maxLen: 5,
          minLen: 5
        },
        valid: false,
        touch: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          require: true
        },
        valid: false,
        touch: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", display: "Fastest" },
            { value: "cheaps", display: "Cheaps" }
          ]
        },
        validation: {},
        value: "fastest",
        touch: false,
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };
  orderFormHandler = e => {
    e.preventDefault();

    let formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    let order = {
      ingredients: this.props.ingredients,
      priceOfBurger: this.props.total_price,
      ordered: formData
    };

    this.props.onOrderSubmit(order, this.props.tokenAuth);
  };

  checkIfInputValid(value, rules, idInputForm) {
    if (!rules) {
      return true;
    }
    let isValid = true;
    if (rules.require) {
      isValid = value.trim() !== "" && isValid;
    }
    if (idInputForm === "email") {
      isValid = validator.isEmail(value) && isValid;
    }

    if (rules.minLen) {
      isValid = value.length > rules.minLen && isValid;
    }
    return isValid;
  }

  inputChangeHandler = (event, idInputForm) => {
    let updateStateFrom = { ...this.state.orderForm };
    let updateElement = { ...updateStateFrom[idInputForm] };
    updateElement.value = event.target.value;
    updateElement.touch = true;
    updateElement.valid = this.checkIfInputValid(
      updateElement.value,
      updateElement.validation,
      idInputForm
    );

    updateStateFrom[idInputForm] = updateElement;
    let validForm = true;
    for (let formValid in updateStateFrom) {
      validForm = updateStateFrom[formValid].valid && validForm;
    }
    this.setState({ orderForm: updateStateFrom, formIsValid: validForm });
  };

  render() {
    let form = null;
    let fromOrder = [];
    if (!this.state.loading) {
      for (let key in this.state.orderForm) {
        fromOrder.push({ id: key, config: this.state.orderForm[key] });
      }

      form = fromOrder.map(formElement => {
        return (
          <Input
            key={formElement.id}
            id={formElement.id}
            value={formElement.config.value}
            elementType={formElement.config.elementType}
            valid={formElement.config.valid}
            shouldValid={formElement.config.validation}
            elementConfig={formElement.config.elementConfig}
            touch={formElement.config.touch}
            changed={event => this.inputChangeHandler(event, formElement.id)}
          />
        );
      });
    }

    return (
      <div>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div className={classes.contactData}>
            <form onSubmit={this.orderFormHandler}>
              <h4>Enter Your info</h4>
              {form}
              <Button
                btnType="Success"
                className={classes.BtnBorder}
                disabled={!this.state.formIsValid}
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
const mapStateToProps = state => {
  return {
    ingredients: state.ing.ingredients,
    total_price: state.ing.total_price,
    loading: state.orders.loading,
    tokenAuth: state.auth.token
  };
};

const mapStateDispatchToProps = dispatch => {
  return {
    onOrderSubmit: (data, token) =>
      dispatch(actionType.purchaseBurgerStart(data, token))
  };
};
export default connect(
  mapStateToProps,
  mapStateDispatchToProps
)(withErrorHandler(ContactData, axios));
