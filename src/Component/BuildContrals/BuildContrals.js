import React from "react";
import classes from "./BuildContrals.css";
import BuildContral from "./BuildContral/BuildContral";

const contral = [
  { label: "salad", type: "salad" },
  { label: "bacon", type: "bacon" },
  { label: "cheese", type: "cheese" },
  { label: "meat", type: "meat" }
];

const BuildContrals = props => {
  return (
    <div className={classes.BuildContrals}>
      <p>
        The price of the burger <strong>{props.price.toFixed(2)}</strong>
      </p>
      {contral.map(ctrl => {
        return (
          <BuildContral
            key={ctrl.label}
            label={ctrl.label}
            add={props.add}
            type={ctrl.type}
            delete={props.delete}
            disable={props.disable[ctrl.type]}
          />
        );
      })}
      <button
        ordered={this.purchaseHandler}
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.order}
      >
        {props.auth ? "Order Now" : "Sign-Up"}
      </button>
    </div>
  );
};
export default BuildContrals;
