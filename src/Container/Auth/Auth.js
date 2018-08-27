import React, { Component } from "react";
import classes from "./Auth.css";
import { connect } from "react-redux";
import Spinner from "../../Component/Spinner/Spinner";
import Input from "../../Component/UI/Input/Input";
import Button from "../../Component/UI/Button/Button";
import * as actionType from "../../store/actions/index";
var validator = require("validator");

class Auth extends Component {
  state = {
    authForm: {
      email: {
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
          minLen: 3
        },
        valid: false,
        touch: false
      }
    },
    formIsValid: true,
    isSignIn: true
  };
  submitAuthHandler = event => {
    event.preventDefault();
    this.props.authUserCredential(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignIn
    );
    const resetValue = { ...this.state.authForm };
    if (this.props.error) {
      for (let key in resetValue) {
        resetValue[key].value = "";
      }
    }
    this.setState({ authForm: resetValue });
  };

  checkIfInputValid = (value, rules, idInputForm) => {
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
  };
  singInHandler = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { isSignIn: !prevState.isSignIn };
    });
  };
  inputChangeHandler = (event, idInputForm) => {
    let updateStateFrom = { ...this.state.authForm };
    let updateElement = { ...updateStateFrom[idInputForm] };
    updateElement.value = event.target.value;
    updateElement.touch = true;
    updateElement.valid = this.checkIfInputValid(
      updateElement.value,
      updateElement.validation, ////validation
      idInputForm
    );

    updateStateFrom[idInputForm] = updateElement;
    let validForm = true;
    for (let formValid in updateStateFrom) {
      validForm = updateStateFrom[formValid].valid && validForm;
    }
    this.setState({ authForm: updateStateFrom, formIsValid: validForm });
  };

  render() {
    let formData = [];
    let error = null;
    if (this.props.error != null) {
      error = <p style={{ color: "red" }}>{this.props.error.message}</p>;
    }
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
      <div>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div className={classes.contactData}>
            {error}
            <h3>Authentication by Google</h3>
            <form onSubmit={this.submitAuthHandler}>
              {inputForm}
              <Button
                btnType="Success"
                className={classes.BtnBorder}
                disabled={!this.state.formIsValid}
              >
                Submit
              </Button>
              <Button btnType="Danger" clicked={this.singInHandler}>
                SWITCH TO {this.state.isSignIn ? "SIGN IN" : "SIGN UP"}
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
    loading: state.auth.loading,
    error: state.auth.error
  };
};
const mapStateDispatchToProps = dispatch => {
  return {
    authUserCredential: (email, password, isSignIn) =>
      dispatch(actionType.authUser(email, password, isSignIn))
  };
};

export default connect(
  mapStateToProps,
  mapStateDispatchToProps
)(Auth);
