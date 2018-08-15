import React, { Component } from "react";
import Button from "../../../Component/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Input from "../../../Component/UI/Input/Input";
import Spinner from "../../../Component/Spinner/Spinner";
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
        valid: false
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
        valid: false
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
        valid: false
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
        valid: false
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
        valid: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", display: "Fastest" },
            { value: "cheaps", display: "Cheaps" }
          ]
        },
        value: ""
      }
    },
    loading: false,
    priceOfBurger: 0,
    ingredients: null
  };
  orderFormHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    let formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    console.log(formData);

    let order = {
      ingredients: this.props.ingredients,
      priceOfBurger: this.props.price,
      ordered: formData
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(err => {});
  };

  checkIfInputValid(value, rules) {
    let isValid = true;
    if (rules.require) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.maxLen) {
      isValid = value.length > 5 && isValid;
    }
    if (rules.minLen) {
      isValid = value.length <= 5 && isValid;
    }
    return isValid;
  }

  inputChangeHandler = (event, idInputForm) => {
    let updateStateFrom = { ...this.state.orderForm };
    let updateElement = { ...updateStateFrom[idInputForm] };
    updateElement.value = event.target.value;
    updateElement.valid = this.checkIfInputValid(
      updateElement.value,
      updateElement.validation
    );
    console.log(updateElement);
    updateStateFrom[idInputForm] = updateElement;
    this.setState({ orderForm: updateStateFrom });
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
            value={formElement.config.value}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            changed={event => this.inputChangeHandler(event, formElement.id)}
          />
        );
      });
    }

    return (
      <div>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div className={classes.contactData}>
            <form onSubmit={this.orderFormHandler}>
              <h4>Enter Your info</h4>
              {form}
              <Button btnType="Success" className={classes.BtnBorder}>
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
