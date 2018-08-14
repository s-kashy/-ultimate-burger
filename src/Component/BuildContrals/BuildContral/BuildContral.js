import React from "react";
import classes from "./BuildContral.css";

const BuildContral = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.BuildControl}>
        {props.label}

        <button className={classes.More} onClick={() => props.add(props.type)}>
          More
        </button>
        <button
          className={classes.Less}
          disabled={props.disable}
          onClick={() => props.delete(props.type)}
        >
          Less
        </button>
      </div>
    </div>
  );
};
export default BuildContral;
