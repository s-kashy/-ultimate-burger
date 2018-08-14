import React from "react";
import classes from "./Logo.css";
import img from "../../asset/Images/burger-logo.png";

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={img} alt="Burger-Log" />
    </div>
  );
};
export default Logo;
