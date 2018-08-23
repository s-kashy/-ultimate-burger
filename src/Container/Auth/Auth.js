import React, { Component } from "react";

import Input from "../../Component/UI/Input";
import Button from "../../Component/UI/Button";

class Auth extends Component {
  state = {
    authForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          require: true,
          isEmail: true
        },
        valid: false,
        touch: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password"
        },
        value: "",
        validation: {
          require: true,
          minLen: 7
        },
        valid: false,
        touch: false
      }
    }
  };
  submitAuthHandler = event => {};

  inputChangeHandler = (event, id) => {};

  render() {
    let formData = [];

    for (let key in this.state.authForm) {
      formData.push({ id: key, config: this.state.authForm[key] });
    }
    let inputForm = formData.map(formElement => {
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
    return (
      <form onSubmit={this.submitAuthHandler}>
        {inputForm}
        <Button
          btnType="Success"
          className={classes.BtnBorder}
          disabled={!this.state.formIsValid}
        >
          Order
        </Button>
      </form>
    );
  }
}
export default Auth;
