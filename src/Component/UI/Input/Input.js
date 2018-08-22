import React from "react";
import classes from "./Input.css";

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (!props.valid && props.shouldValid && props.touch) {
    inputClasses.push(classes.Invaild);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => {
            return (
              <option value={option.value} key={option.value}>
                {option.display}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          className={classes.inputClasses}
          value={props.value}
        />
      );
      break;
  }
  let validateError = null;

  if (!props.valid && props.touch) {
    validateError = <p>there is a error with {props.id}</p>;
  }
  return (
    <div className={classes.Inputs}>
      <label className={classes.Label}>{props.name}</label>
      {inputElement}
      {validateError}
    </div>
  );
};
export default Input;
